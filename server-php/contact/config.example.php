<?php
// Скопируйте этот файл в config.php (рядом, в этой же папке) и подставьте
// свои данные. config.php не должен попадать в git — он уже в .gitignore.

return [
    // --- SMTP-сервер ---
    'smtp_host' => 'smtp.example.com',
    'smtp_port' => 587,          // 587 — STARTTLS, 465 — implicit SSL/TLS
    'smtp_secure' => 'tls',      // 'tls' | 'ssl' | 'none'
    'smtp_user' => 'login@example.com',
    'smtp_pass' => 'app-password',

    // --- Куда и от чьего имени слать ---
    'mail_to' => 'support@games-for-everyone.ru',
    // Обычно должен совпадать с smtp_user — иначе многие серверы
    // помечают письмо как спам или отклоняют его (несовпадение с SPF/DKIM).
    'mail_from' => 'login@example.com',
    'mail_from_name' => 'Сайт MyLand',

    // --- CORS: с каких доменов разрешено отправлять форму ---
    'allowed_origins' => [
        'https://portfolio.games-for-everyone.ru/',
    ],

    // --- Анти-спам ---
    'rate_limit_max_per_hour' => 5,
    'rate_limit_min_interval_seconds' => 20,
];
