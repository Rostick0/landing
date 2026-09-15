<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    tilt?: boolean
    eager?: boolean
  }>(),
  {
    tilt: true,
    eager: false
  }
)
</script>

<template>
  <div
    class="relative mx-auto w-[220px] shrink-0 transition-transform duration-500 sm:w-[250px]"
    :class="tilt ? '-rotate-3 hover:rotate-0' : ''"
  >
    <div class="relative rounded-[2.6rem] border border-ink-500/60 bg-gradient-to-b from-ink-600 to-ink-800 p-[10px] shadow-card">
      <span class="absolute -left-[6px] top-24 h-8 w-[5px] rounded-l-full bg-ink-300/90 shadow-[-1px_1px_2px_rgba(0,0,0,0.45)] sm:top-28" />
      <span class="absolute -left-[6px] top-36 h-12 w-[5px] rounded-l-full bg-ink-300/90 shadow-[-1px_1px_2px_rgba(0,0,0,0.45)] sm:top-40" />
      <span class="absolute -right-[6px] top-28 h-14 w-[5px] rounded-r-full bg-ink-300/90 shadow-[1px_1px_2px_rgba(0,0,0,0.45)] sm:top-32" />

      <div class="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-ink-900">
        <!-- width, not sizes: NuxtImg's `sizes` prop uses its own breakpoint:size
        DSL, not plain CSS lengths — a plain width reliably requests a 1x/2x
        density srcset capped at the mockup's max rendered size (250px). -->
        <NuxtImg
          :src="src"
          :alt="alt"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : undefined"
          class="absolute inset-0 h-full w-full object-cover object-top"
          width="260"
        />
        <div class="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" />
        <div class="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
    </div>
  </div>
</template>
