<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))

// switchLocalePath переносит текущий #hash (например, #top/#contact) в ссылку,
// из-за чего смена языка неожиданно проматывает страницу к этому якорю.
// Ссылка на другой язык должна вести на тот же путь без якоря.
function localizedPath(code: string) {
  return switchLocalePath(code).split('#')[0]
}
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-ink-500/60 p-1"
    role="group"
    :aria-label="t('langSwitcher.ariaLabel')"
  >
    <NuxtLink
      v-for="code in availableLocales"
      :key="code"
      :to="localizedPath(code)"
      class="rounded-full px-3 py-1 font-mono text-xs transition-colors duration-200"
      :class="
        locale === code
          ? 'bg-spark-400 text-ink-900'
          : 'text-ink-300 hover:text-white'
      "
      :aria-current="locale === code ? 'true' : undefined"
    >
      {{ t(`langSwitcher.${code}`) }}
    </NuxtLink>
  </div>
</template>
