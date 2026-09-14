<script setup lang="ts">
export type CapabilityIcon = 'site' | 'service' | 'mobile' | 'dashboard' | 'api' | 'mvp'

defineProps<{
  icon: CapabilityIcon
  title: string
  description: string
}>()
</script>

<template>
  <div class="surface-card group flex flex-col gap-4 rounded-2xl p-7">
    <span
      class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-spark-400/10 text-spark-300 transition-colors duration-300 group-hover:bg-spark-400/15"
      aria-hidden="true"
    >
      <svg v-if="icon === 'site'" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.6" />
        <path d="M3 9h18" stroke="currentColor" stroke-width="1.6" />
        <path d="M7 6.75h.01M10 6.75h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <svg v-else-if="icon === 'service'" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M4 19V9.5L12 4l8 5.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        <path d="M9.5 11h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <svg v-else-if="icon === 'mobile'" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="18" rx="2.2" stroke="currentColor" stroke-width="1.6" />
        <path d="M11 18h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <svg v-else-if="icon === 'dashboard'" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.6" />
        <path d="M12 12 15.2 8.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
      <svg v-else-if="icon === 'api'" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="9" width="6" height="6" rx="1.4" stroke="currentColor" stroke-width="1.6" />
        <rect x="15" y="9" width="6" height="6" rx="1.4" stroke="currentColor" stroke-width="1.6" />
        <path d="M9 12h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="m13 3-8.5 10.2h5.6L9.5 21l8.9-10.9h-5.7L13 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      </svg>
    </span>

    <div>
      <h3 class="text-lg text-white">{{ title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-ink-200">{{ description }}</p>
    </div>
  </div>
</template>
