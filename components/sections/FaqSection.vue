<script setup lang="ts">
const { t } = useI18n()

const itemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const

const items = computed(() =>
  itemKeys.map((key) => ({
    key,
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`)
  }))
)
</script>

<template>
  <section id="faq" class="section-padding" aria-labelledby="faq-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="faq-heading"
        :title="t('faq.title')"
        :subtitle="t('faq.subtitle')"
      />

      <div class="mt-12 grid max-w-3xl grid-cols-1 gap-3">
        <FaqItem v-for="item in items" :key="item.key" :question="item.question" :answer="item.answer" />
      </div>
    </div>
  </section>
</template>
