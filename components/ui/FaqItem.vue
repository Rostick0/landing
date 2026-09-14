<script setup lang="ts">
defineProps<{
  question: string
  answer: string
}>()

const open = ref(false)
</script>

<template>
  <div class="surface-card rounded-2xl">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="text-base text-white">{{ question }}</span>
      <svg
        class="h-4 w-4 flex-shrink-0 text-spark-300 transition-transform duration-300"
        :class="open ? 'rotate-45' : ''"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :style="{ gridTemplateRows: open ? '1fr' : '0fr' }"
    >
      <div class="overflow-hidden">
        <p class="px-6 pb-5 text-sm leading-relaxed text-ink-200">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>
