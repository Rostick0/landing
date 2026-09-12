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
    class="inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs leading-none"
    :class="
      variant === 'accent'
        ? 'border-spark-400/40 bg-spark-400/10 text-spark-200'
        : 'border-ink-500/60 bg-ink-700/40 text-ink-200'
    "
  >
    {{ label }}
  </span>
</template>
