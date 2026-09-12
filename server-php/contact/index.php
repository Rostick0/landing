<?php

declare(strict_types=1);

/**
 * Обработчик формы обратной связи: honeypot + rate limit + отправка письма
 * через произвольный SMTP-сервер напрямую сокетами, без Composer/библиотек.
 *
 * Установка:
 * 1. Скопируйте config.example.php в config.php (в этой же папке) и впишите
 *    свои SMTP-данные.
 * 2. Разместите папку contact/ на сервере так, чтобы nginx + php-fpm отдавали
 *    index.php по адресу, указанному в NUXT_PUBLIC_CONTACT_ENDPOINT
 *    (например /api/contact/).
 * 3. Требуется PHP 7.4+ с расширением openssl.
 */

$configPath = __DIR__ . '../config.php';
if (!is_file($configPath)) {
    error_log('[contact] config.php не найден — скопируйте config.example.php и заполните его');
    http_response_code(500);
    send_json(['success' => false, 'error' => 'server_misconfigured']);
}

/** @var array<string,mixed> $config */
$config = require $configPath;

send_cors_headers((array) ($config['allowed_origins'] ?? []));

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    send_json(['success' => false, 'error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

$data = [];
if ($raw !== false && $raw !== '' && stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
} else {
    $data = $_POST;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$company = trim((string) ($data['company'] ?? '')); // honeypot-поле

$clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');

// Бот заполнил скрытое поле — молча отвечаем "успех", письмо не отправляем.
if ($company !== '') {
    error_log("[contact] honeypot сработал, ip={$clientIp}");
    send_json(['success' => true]);
}

$rateLimitOk = check_rate_limit(
    $clientIp,
    (int) ($config['rate_limit_max_per_hour'] ?? 5),
    (int) ($config['rate_limit_min_interval_seconds'] ?? 20)
);
if (!$rateLimitOk) {
    http_response_code(429);
    send_json(['success' => false, 'error' => 'rate_limited']);
}

$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
    $errors[] = 'invalid_name';
}
if ($email === '' || strlen($email) > 200 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'invalid_email';
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    $errors[] = 'invalid_message';
}
if ($errors !== []) {
    http_response_code(400);
    send_json(['success' => false, 'error' => 'validation_failed', 'fields' => $errors]);
}

$name = strip_header_injection($name);
$email = strip_header_injection($email);

try {
    smtp_send_mail($config, $name, $email, $message, $clientIp);
} catch (Throwable $e) {
    error_log('[contact] ошибка SMTP: ' . $e->getMessage());
    http_response_code(502);
    send_json(['success' => false, 'error' => 'send_failed']);
}

send_json(['success' => true]);

// ============================== Вспомогательные функции ==============================

function send_json(array $payload): void
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function send_cors_headers(array $allowedOrigins): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
}

function strip_header_injection(string $value): string
{
    return trim((string) preg_replace('/[\r\n]+/', ' ', $value));
}

function check_rate_limit(string $ip, int $maxPerHour, int $minIntervalSeconds): bool
{
    $dir = sys_get_temp_dir() . '/myland-contact-rate-limit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        // Не можем проверить лимит из-за проблем с диском — не блокируем отправку.
        return true;
    }

    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $timestamps = $raw ? (json_decode($raw, true) ?: []) : [];
    if (!is_array($timestamps)) {
        $timestamps = [];
    }

    $now = time();
    $timestamps = array_values(array_filter($timestamps, static fn ($t) => $now - (int) $t < 3600));

    $allowed = true;
    if ($timestamps !== [] && ($now - (int) end($timestamps)) < $minIntervalSeconds) {
        $allowed = false;
    }
    if (count($timestamps) >= $maxPerHour) {
        $allowed = false;
    }

    if ($allowed) {
        $timestamps[] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

function smtp_send_mail(array $config, string $name, string $email, string $message, string $clientIp): void
{
    $host = (string) $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $secure = (string) ($config['smtp_secure'] ?? 'tls');
    $user = (string) $config['smtp_user'];
    $pass = (string) $config['smtp_pass'];
    $to = (string) $config['mail_to'];
    $from = (string) ($config['mail_from'] ?? $user);
    $fromName = (string) ($config['mail_from_name'] ?? 'Сайт');

    $transport = $secure === 'ssl' ? 'ssl://' . $host : $host;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
        ],
    ]);

    $socket = @stream_socket_client(
        $transport . ':' . $port,
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT,
        $context
    );
    if ($socket === false) {
        throw new RuntimeException("Не удалось подключиться к SMTP: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 15);

    try {
        smtp_expect($socket, '220');
        smtp_command($socket, 'EHLO ' . php_uname('n'), '250');

        if ($secure === 'tls') {
            smtp_command($socket, 'STARTTLS', '220');
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Не удалось установить TLS-соединение (STARTTLS)');
            }
            smtp_command($socket, 'EHLO ' . php_uname('n'), '250');
        }

        smtp_command($socket, 'AUTH LOGIN', '334');
        smtp_command($socket, base64_encode($user), '334');
        smtp_command($socket, base64_encode($pass), '235');

        smtp_command($socket, 'MAIL FROM:<' . $from . '>', '250');
        smtp_command($socket, 'RCPT TO:<' . $to . '>', '250');
        smtp_command($socket, 'DATA', '354');

        $headers = implode("\r\n", [
            'From: ' . mime_header_encode($fromName) . ' <' . $from . '>',
            'Reply-To: ' . $email,
            'To: <' . $to . '>',
            'Subject: ' . mime_header_encode('Новое сообщение с сайта от ' . $name),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ]);

        $body = build_message_body($name, $email, $message, $clientIp);
        $bodyCrlf = str_replace("\n", "\r\n", str_replace("\r\n", "\n", $body));
        $bodyDotStuffed = (string) preg_replace('/^\./m', '..', $bodyCrlf);

        fwrite($socket, $headers . "\r\n\r\n" . $bodyDotStuffed . "\r\n.\r\n");
        smtp_expect($socket, '250');

        smtp_command($socket, 'QUIT', '221');
    } finally {
        fclose($socket);
    }
}

/**
 * @return resource
 */
function smtp_command($socket, string $command, string $expectedCode): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $expectedCode);
}

function smtp_expect($socket, string $expectedCode): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    $meta = stream_get_meta_data($socket);
    if (!empty($meta['timed_out'])) {
        throw new RuntimeException('Таймаут ожидания ответа SMTP-сервера');
    }
    if ($response === '' || substr($response, 0, 3) !== $expectedCode) {
        throw new RuntimeException('Неожиданный ответ SMTP: ' . trim($response));
    }

    return $response;
}

function mime_header_encode(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function build_message_body(string $name, string $email, string $message, string $clientIp): string
{
    return "Имя: {$name}\n"
        . "Email: {$email}\n"
        . "IP: {$clientIp}\n"
        . 'Дата: ' . date('Y-m-d H:i:s') . "\n"
        . "\n---\n\n"
        . $message;
}
