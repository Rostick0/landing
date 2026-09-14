<script setup lang="ts">
import { projects, type ProjectType } from '~/app/data/projects'

const { t } = useI18n()

type FilterKey = 'all' | ProjectType

const filterKeys: FilterKey[] = ['all', 'web', 'android']
const activeFilter = ref<FilterKey>('all')

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((project) => project.type === activeFilter.value)
)
</script>

<template>
  <section id="products" class="section-padding" aria-labelledby="products-heading">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          heading-id="products-heading"
          :title="t('products.title')"
          :subtitle="t('products.subtitle')"
        />

        <div
          class="inline-flex w-fit items-center gap-1 rounded-full bg-ink-800/70 p-1"
          role="group"
          :aria-label="t('products.filterAriaLabel')"
        >
          <button
            v-for="key in filterKeys"
            :key="key"
            type="button"
            class="rounded-full px-4 py-1.5 text-sm transition-colors duration-200"
            :class="
              activeFilter === key
                ? 'bg-spark-400 text-ink-900'
                : 'text-ink-300 hover:text-white'
            "
            :aria-pressed="activeFilter === key"
            @click="activeFilter = key"
          >
            {{ t(`products.filters.${key}`) }}
          </button>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>
