<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    headingId?: string
    align?: 'left' | 'center'
  }>(),
  {
    subtitle: undefined,
    headingId: undefined,
    align: 'left'
  }
)
</script>

<template>
  <div class="max-w-2xl" :class="align === 'center' ? 'mx-auto text-center' : ''">
    <h2 :id="headingId" class="text-3xl sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-5 text-base leading-relaxed text-ink-200 sm:text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>
