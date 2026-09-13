<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="relative isolate min-h-screen bg-ink-900">
    <BackgroundOrbs />
    <a
      href="#main-content"
      class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-spark-400 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-ink-900"
    >
      {{ t('common.skipToContent') }}
    </a>
    <TheHeader />
    <main id="main-content">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
