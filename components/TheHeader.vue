<script setup lang="ts">
const { t } = useI18n()

const mobileOpen = ref(false)

const navItems = computed(() => [
  { href: '#work', label: t('nav.work') },
  { href: '#stack', label: t('nav.stack') },
  { href: '#process', label: t('nav.process') },
  { href: '#services', label: t('nav.services') },
  { href: '#contact', label: t('nav.contact') }
])

function closeMobile() {
  mobileOpen.value = false
}

onKeyStroke('Escape', () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink-700/80 bg-ink-900/80 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <a href="#top" class="flex flex-col leading-tight">
        <span class="text-sm font-semibold text-white">{{ t('header.name') }}</span>
        <span class="text-xs text-ink-300">{{ t('header.role') }}</span>
      </a>

      <nav class="hidden items-center gap-6 md:flex" :aria-label="t('nav.work')">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm text-ink-200 hover:text-white"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <LangSwitcher />
        <BaseButton as="a" href="#contact" size="md" variant="primary">
          {{ t('hero.ctaPrimary') }}
        </BaseButton>
      </div>

      <div class="flex items-center gap-2 md:hidden">
        <LangSwitcher />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-500/60 text-ink-100"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileOpen ? t('nav.menuClose') : t('nav.menuOpen')"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-show="mobileOpen"
      id="mobile-nav"
      class="border-t border-ink-700/80 bg-ink-900/95 md:hidden"
    >
      <nav class="container-page flex flex-col gap-1 py-4">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-ink-700/60 hover:text-white"
          @click="closeMobile"
        >
          {{ item.label }}
        </a>
        <BaseButton
          as="a"
          href="#contact"
          size="md"
          variant="primary"
          block
          class="mt-2"
          @click="closeMobile"
        >
          {{ t('hero.ctaPrimary') }}
        </BaseButton>
      </nav>
    </div>
  </header>
</template>
