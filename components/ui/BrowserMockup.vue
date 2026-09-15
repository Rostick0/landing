<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    url?: string
    eager?: boolean
  }>(),
  {
    url: 'my-financier.ru',
    eager: false
  }
)
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-ink-500/60 bg-ink-800 shadow-card">
    <div class="flex items-center gap-3 border-b border-ink-600/60 bg-ink-750 px-4 py-2.5">
      <span class="flex gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </span>
      <span class="mx-auto flex max-w-[70%] items-center truncate rounded-full bg-ink-900/70 px-3 py-1 font-mono text-[11px] text-ink-300">
        {{ url }}
      </span>
    </div>
    <!-- width, not sizes: NuxtImg's `sizes` prop uses its own breakpoint:size
    DSL, not CSS media-query syntax — a plain width here reliably requests a
    1x/2x density srcset capped at the mockup's max rendered size. -->
    <NuxtImg
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      class="block h-auto w-full"
      width="640"
    />
  </div>
</template>
