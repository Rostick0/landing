<script setup lang="ts">
const { t } = useI18n()

const stats = computed(() => [
  { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
  { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
  { value: t('hero.stat3Value'), label: t('hero.stat3Label') }
])
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-20 sm:pt-28">
    <div class="container-page relative">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-spark-300 motion-safe:animate-fade-up">
        {{ t('hero.eyebrow') }}
      </p>

      <h1
        class="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl motion-safe:animate-fade-up"
        style="animation-delay: 60ms"
      >
        {{ t('hero.title') }}
      </h1>

      <p
        class="mt-6 max-w-2xl text-base text-ink-200 sm:text-lg motion-safe:animate-fade-up"
        style="animation-delay: 120ms"
      >
        {{ t('hero.subtitle') }}
      </p>

      <div
        class="mt-9 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up"
        style="animation-delay: 180ms"
      >
        <BaseButton as="a" href="#contact" variant="primary" size="lg">
          {{ t('hero.ctaPrimary') }}
        </BaseButton>
        <BaseButton as="a" href="#work" variant="secondary" size="lg">
          {{ t('hero.ctaSecondary') }}
        </BaseButton>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-6 border-t border-ink-700/70 pt-8 sm:grid-cols-3 sm:gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="border-ink-700/70 sm:border-l sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
        >
          <p class="text-2xl font-semibold text-white sm:text-3xl">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-ink-300">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
