<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))
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
      :to="switchLocalePath(code)"
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
