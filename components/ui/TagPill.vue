<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    variant?: 'default' | 'accent'
  }>(),
  {
    variant: 'default'
  }
)
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 font-mono text-xs leading-none"
    :class="variant === 'accent' ? 'bg-spark-400/15 text-spark-200' : 'bg-ink-700/70 text-ink-200'"
  >
    {{ label }}
  </span>
</template>
