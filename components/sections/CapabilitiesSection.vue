<script setup lang="ts">
import type { CapabilityIcon } from '~/components/ui/CapabilityCard.vue'

const { t } = useI18n()

const itemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const
const icons: Record<(typeof itemKeys)[number], CapabilityIcon> = {
  item1: 'site',
  item2: 'service',
  item3: 'mobile',
  item4: 'dashboard',
  item5: 'api',
  item6: 'mvp'
}

const items = computed(() =>
  itemKeys.map((key) => ({
    key,
    icon: icons[key],
    title: t(`capabilities.${key}.title`),
    description: t(`capabilities.${key}.description`)
  }))
)
</script>

<template>
  <section id="services" class="section-padding" aria-labelledby="capabilities-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="capabilities-heading"
        :title="t('capabilities.title')"
        :subtitle="t('capabilities.subtitle')"
      />

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CapabilityCard
          v-for="item in items"
          :key="item.key"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>
  </section>
</template>
