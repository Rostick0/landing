<script setup lang="ts">
const { t } = useI18n()

const itemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const

const items = computed(() =>
  itemKeys.map((key, index) => ({
    key,
    number: index + 1,
    title: t(`trust.${key}.title`),
    description: t(`trust.${key}.description`)
  }))
)
</script>

<template>
  <section id="about" class="section-padding" aria-labelledby="trust-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="trust-heading"
        :title="t('trust.title')"
        :subtitle="t('trust.subtitle')"
      />

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in items" :key="item.key" class="surface-card rounded-2xl p-7">
          <span class="font-mono text-sm text-spark-300">{{ String(item.number).padStart(2, '0') }}</span>
          <h3 class="mt-3 text-lg text-white">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
