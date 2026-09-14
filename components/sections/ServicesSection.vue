<script setup lang="ts">
const { t } = useI18n()

const itemKeys = ['item1', 'item2', 'item3', 'item4', 'item5'] as const

const items = computed(() =>
  itemKeys.map((key) => ({
    key,
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`)
  }))
)
</script>

<template>
  <section id="services" class="section-padding" aria-labelledby="services-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="services-heading"
        :title="t('services.title')"
        :subtitle="t('services.subtitle')"
      />

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.key"
          class="surface-card rounded-2xl p-7"
        >
          <h3 class="text-lg text-white">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
