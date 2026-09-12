<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    eyebrow?: string
    headingId?: string
    align?: 'left' | 'center'
  }>(),
  {
    subtitle: undefined,
    eyebrow: undefined,
    headingId: undefined,
    align: 'left'
  }
)
</script>

<template>
  <div class="max-w-2xl" :class="align === 'center' ? 'mx-auto text-center' : ''">
    <p v-if="eyebrow" class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-spark-300">
      {{ eyebrow }}
    </p>
    <h2 :id="headingId" class="text-3xl sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base text-ink-200 sm:text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>
