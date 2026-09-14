<script setup lang="ts">
const { t } = useI18n()

const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const

const steps = computed(() =>
  stepKeys.map((key, index) => ({
    key,
    number: index + 1,
    title: t(`process.${key}.title`),
    description: t(`process.${key}.description`)
  }))
)
</script>

<template>
  <section id="process" class="section-padding" aria-labelledby="process-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="process-heading"
        :title="t('process.title')"
        :subtitle="t('process.subtitle')"
      />

      <ol class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="step in steps"
          :key="step.key"
          class="surface-card relative rounded-2xl p-7"
        >
          <span class="font-mono text-sm text-spark-300">{{ String(step.number).padStart(2, '0') }}</span>
          <h3 class="mt-3 text-lg text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
