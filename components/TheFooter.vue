<script setup lang="ts">
const { t } = useI18n()

const year = new Date().getFullYear()

const navItems = computed(() => [
  { href: '#services', label: t('nav.services') },
  { href: '#work', label: t('nav.work') },
  { href: '#about', label: t('nav.about') },
  { href: '#contact', label: t('nav.contact') }
])

const directLinks = computed(() => [
  {
    label: t('contact.direct.emailLabel'),
    value: 'support@games-for-everyone.ru',
    href: 'mailto:support@games-for-everyone.ru'
  },
  {
    // TODO: подставить реальный юзернейм Telegram
    label: t('contact.direct.telegramLabel'),
    value: '@MySuper5',
    href: 'https://t.me/MySuper5'
  },
  {
    label: t('contact.direct.linkedinLabel'),
    value: 'linkedin.com/in/rostislav-volkov-a00379382',
    href: 'https://www.linkedin.com/in/rostislav-volkov-a00379382/'
  },
  {
    label: t('contact.direct.kworkLabel'),
    value: 'kwork.ru/user/rostik057',
    href: 'https://kwork.ru/user/rostik057'
  }
])
</script>

<template>
  <footer class="border-t border-ink-700/80 bg-ink-950">
    <div class="container-page grid gap-10 py-14 sm:grid-cols-3">
      <div>
        <p class="text-sm font-semibold text-white">{{ t('header.name') }}</p>
        <p class="mt-2 text-sm text-ink-300">{{ t('footer.tagline') }}</p>
        <a
          href="#top"
          class="mt-6 inline-flex items-center gap-1.5 text-sm text-spark-300 hover:text-spark-200"
        >
          {{ t('footer.backToTop') }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <nav :aria-label="t('footer.navTitle')">
        <p class="text-sm font-semibold text-ink-400">
          {{ t('footer.navTitle') }}
        </p>
        <ul class="mt-4 space-y-3">
          <li v-for="item in navItems" :key="item.href">
            <a :href="item.href" class="text-sm text-ink-300 hover:text-white">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div>
        <p class="text-sm font-semibold text-ink-400">
          {{ t('footer.contactTitle') }}
        </p>
        <ul class="mt-4 space-y-3">
          <li v-for="link in directLinks" :key="link.label">
            <a
              :href="link.href"
              class="text-sm text-ink-300 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="text-ink-500">{{ link.label }}:</span>
              {{ link.value }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ink-800">
      <p class="container-page py-6 text-xs text-ink-500">
        {{ t('footer.rights', { year }) }}
      </p>
    </div>
  </footer>
</template>
