<script setup lang="ts">
import type { Project } from '~/app/data/projects'

const props = defineProps<{
  project: Project
}>()

const { t, te, tm: rawTm, rt } = useI18n()

// Dynamic (non-literal) key paths make vue-i18n's generic `tm()` overload
// blow up TS's type instantiation depth, so we call through a plain signature.
const tm = rawTm as (key: string) => unknown[]

const base = computed(() => `projects.${props.project.id}`)
const name = computed(() => t(`${base.value}.name`))
const description = computed(() => t(`${base.value}.description`))
const hasNote = computed(() => te(`${base.value}.note`))
const note = computed(() => (hasNote.value ? t(`${base.value}.note`) : ''))
const highlights = computed(() => tm(`${base.value}.highlights`).map((item) => rt(item as string)))
</script>

<template>
  <article
    class="surface-card group flex h-full flex-col overflow-hidden rounded-2xl shadow-card transition-transform duration-300 hover:-translate-y-1"
  >
    <div class="flex items-center gap-4 border-b border-ink-600/60 p-6">
      <NuxtImg
        :src="project.icon"
        :alt="name"
        width="48"
        height="48"
        loading="lazy"
        class="h-12 w-12 flex-shrink-0 rounded-xl"
      />
      <div class="min-w-0">
        <h3 class="truncate text-lg text-white">{{ name }}</h3>
        <TagPill
          :label="t(`work.badge.${project.type}`)"
          variant="accent"
          class="mt-1"
        />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-5 p-6">
      <div
        class="flex snap-x gap-3 overflow-x-auto pb-1"
        :aria-label="t('work.screenshotAlt', { name })"
      >
        <NuxtImg
          v-for="(shot, index) in project.screenshots"
          :key="shot"
          :src="shot"
          :alt="t('work.screenshotAlt', { name })"
          loading="lazy"
          class="h-32 w-auto flex-shrink-0 snap-start rounded-lg border border-ink-600/60 object-cover"
          :class="project.type === 'android' ? 'aspect-[9/16]' : 'aspect-[16/10]'"
          :width="project.type === 'android' ? 72 : 220"
          :height="128"
          :data-index="index"
        />
      </div>

      <p class="text-sm leading-relaxed text-ink-200">{{ description }}</p>

      <p v-if="hasNote" class="rounded-lg bg-spark-400/5 px-3 py-2 text-xs text-spark-200">
        {{ note }}
      </p>

      <ul class="space-y-2 text-sm text-ink-200">
        <li v-for="item in highlights" :key="item" class="flex gap-2.5">
          <span class="mt-2.5 h-px w-3 flex-shrink-0 bg-ink-500" aria-hidden="true" />
          <span>{{ item }}</span>
        </li>
      </ul>

      <div class="flex flex-wrap gap-2" :aria-label="t('work.stackAriaLabel', { name })">
        <TagPill v-for="tech in project.stack" :key="tech" :label="tech" />
      </div>

      <div class="mt-auto flex flex-wrap gap-2 pt-1" :aria-label="t('work.linksAriaLabel', { name })">
        <BaseButton
          v-for="link in project.links"
          :key="link.url"
          as="a"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="md"
        >
          {{ link.label }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="sr-only">({{ t('common.newTab') }})</span>
        </BaseButton>
      </div>
    </div>
  </article>
</template>
