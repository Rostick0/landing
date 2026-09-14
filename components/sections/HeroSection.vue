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
    <div class="bg-orb -left-40 -top-24 h-80 w-80 bg-spark-500" aria-hidden="true" />
    <div class="bg-orb -right-32 top-40 h-72 w-72 bg-spark-400/70" aria-hidden="true" />

    <div class="container-page relative">
      <div class="lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 xl:gap-20">
        <div>
          <p
            class="inline-flex items-center rounded-full border border-ink-500/60 px-3.5 py-1.5 font-mono text-xs text-spark-300 motion-safe:animate-fade-up"
          >
            {{ t('hero.eyebrow') }}
          </p>

          <h1
            class="mt-6 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl motion-safe:animate-fade-up"
            style="animation-delay: 60ms"
          >
            {{ t('hero.title') }}
          </h1>

          <p
            class="mt-7 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg motion-safe:animate-fade-up"
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
        </div>

        <div
          class="relative mx-auto mt-16 flex w-full max-w-[420px] justify-center pt-20 motion-safe:animate-fade-up lg:mt-0 lg:w-[420px] lg:justify-end lg:pt-0"
          style="animation-delay: 260ms"
        >
          <div class="w-full max-w-[320px] lg:max-w-none">
            <BrowserMockup
              src="/images/projects/my-financier-web/screenshot-1.png"
              :alt="t('hero.mockup.webAlt')"
              url="my-financier.ru"
              eager
            />
          </div>
          <div class="absolute -bottom-10 -right-3 w-[150px] lg:-right-6 lg:w-[170px]">
            <PhoneMockup
              src="/images/projects/my-financier-app/screenshot-1.png"
              :alt="t('hero.mockup.appAlt')"
              eager
            />
          </div>
        </div>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-6 border-t border-ink-700/70 pt-8 sm:grid-cols-3 sm:gap-4 lg:mt-16">
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
