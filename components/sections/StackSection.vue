<script setup lang="ts">
const { t, tm: rawTm, rt } = useI18n()

// Dynamic (non-literal) key paths make vue-i18n's generic `tm()` overload
// blow up TS's type instantiation depth, so we call through a plain signature.
const tm = rawTm as (key: string) => unknown[]

const groupKeys = ['backend', 'frontend', 'mobile', 'infra'] as const

const groups = computed(() =>
  groupKeys.map((key) => ({
    key,
    title: t(`stack.groups.${key}.title`),
    items: tm(`stack.groups.${key}.items`).map((item) => rt(item as string))
  }))
)
</script>

<template>
  <section id="stack" class="section-padding" aria-labelledby="stack-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="stack-heading"
        :title="t('stack.title')"
        :subtitle="t('stack.subtitle')"
      />

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="group in groups"
          :key="group.key"
          class="surface-card rounded-2xl p-7"
        >
          <h3 class="text-sm font-semibold text-ink-300">
            {{ group.title }}
          </h3>
          <div class="mt-4 flex flex-wrap gap-2">
            <TagPill v-for="item in group.items" :key="item" :label="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
