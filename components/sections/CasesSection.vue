<script setup lang="ts">
import { projects } from '~/app/data/projects'

const { t, tm: rawTm, rt } = useI18n()

// Dynamic (non-literal) key paths make vue-i18n's generic `tm()` overload
// blow up TS's type instantiation depth, so we call through a plain signature.
const tm = rawTm as (key: string) => unknown[]

const webProject = projects.find((p) => p.id === 'my-financier-web')!
const appProject = projects.find((p) => p.id === 'my-financier-app')!

const stack = computed(() => Array.from(new Set([...webProject.stack, ...appProject.stack])))
const features = computed(() => tm('cases.flagship.features').map((item) => rt(item as string)))

const galleryShots = computed(() => [
  ...webProject.screenshots.slice(1),
  ...appProject.screenshots.slice(1)
])
</script>

<template>
  <section id="work" class="section-padding" aria-labelledby="cases-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="cases-heading"
        :title="t('cases.title')"
        :subtitle="t('cases.subtitle')"
      />

      <article class="mt-14 overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-800/40 p-6 sm:p-10">
        <div class="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h3 class="text-2xl text-white sm:text-3xl">{{ t('cases.flagship.name') }}</h3>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-200 sm:text-base">
              {{ t('cases.flagship.summary') }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <TagPill :label="t('cases.flagship.webBadge')" variant="accent" />
              <TagPill :label="t('cases.flagship.appBadge')" variant="accent" />
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <BaseButton as="a" href="https://my-financier.ru/" target="_blank" rel="noopener noreferrer" variant="secondary">
              {{ t('cases.flagship.webCta') }}
              <span class="sr-only">({{ t('common.newTab') }})</span>
            </BaseButton>
            <BaseButton
              as="a"
              href="https://www.rustore.ru/catalog/app/com.myfinansist.my_finansist"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              {{ t('cases.flagship.appCta') }}
              <span class="sr-only">({{ t('common.newTab') }})</span>
            </BaseButton>
          </div>
        </div>

        <div class="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <BrowserMockup
            :src="webProject.screenshots[0]"
            :alt="t('hero.mockup.webAlt')"
            url="my-financier.ru"
          />
          <div class="flex justify-center lg:justify-start">
            <PhoneMockup :src="appProject.screenshots[0]" :alt="t('hero.mockup.appAlt')" :tilt="false" />
          </div>
        </div>

        <div class="mt-6 flex gap-3 overflow-x-auto pb-1" :aria-label="t('products.screenshotAlt', { name: t('cases.flagship.name') })">
          <NuxtImg
            v-for="shot in galleryShots"
            :key="shot"
            :src="shot"
            :alt="t('products.screenshotAlt', { name: t('cases.flagship.name') })"
            loading="lazy"
            class="h-28 w-auto flex-shrink-0 rounded-lg border border-ink-600/60 object-cover"
          />
        </div>

        <div class="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h4 class="font-mono text-xs font-semibold uppercase tracking-wide text-spark-300">
              {{ t('cases.flagship.taskLabel') }}
            </h4>
            <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ t('cases.flagship.task') }}</p>

            <h4 class="mt-7 font-mono text-xs font-semibold uppercase tracking-wide text-spark-300">
              {{ t('cases.flagship.solutionLabel') }}
            </h4>
            <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ t('cases.flagship.solution') }}</p>
          </div>

          <div>
            <h4 class="font-mono text-xs font-semibold uppercase tracking-wide text-spark-300">
              {{ t('cases.flagship.featuresLabel') }}
            </h4>
            <ul class="mt-2 space-y-2 text-sm text-ink-200">
              <li v-for="item in features" :key="item" class="flex gap-2.5">
                <span class="mt-2.5 h-px w-3 flex-shrink-0 bg-ink-500" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>

            <h4 class="mt-7 font-mono text-xs font-semibold uppercase tracking-wide text-spark-300">
              {{ t('cases.flagship.resultLabel') }}
            </h4>
            <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ t('cases.flagship.result') }}</p>
          </div>
        </div>

        <div class="mt-10 border-t border-ink-700/70 pt-6">
          <h4 class="font-mono text-xs font-semibold uppercase tracking-wide text-ink-400">
            {{ t('cases.flagship.stackLabel') }}
          </h4>
          <div class="mt-3 flex flex-wrap gap-2">
            <TagPill v-for="tech in stack" :key="tech" :label="tech" />
          </div>
        </div>
      </article>

      <p class="mt-8 text-center text-sm text-ink-300">
        <a href="#products" class="inline-flex items-center gap-1.5 text-spark-300 hover:text-spark-200">
          {{ t('cases.flagship.moreProducts') }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </p>
    </div>
  </section>
</template>
