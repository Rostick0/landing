<script setup lang="ts"></script>

<template>
  <div class="relative mx-auto w-[230px] shrink-0 rotate-3 transition-transform duration-500 hover:rotate-0 sm:w-[260px]" aria-hidden="true">
    <!-- Device frame -->
    <div class="relative rounded-[2.6rem] border border-ink-500/60 bg-gradient-to-b from-ink-600 to-ink-800 p-[10px] shadow-card">
      <!-- Side buttons -->
      <span class="absolute -left-[6px] top-24 h-8 w-[5px] rounded-l-full bg-ink-300/90 shadow-[-1px_1px_2px_rgba(0,0,0,0.45)] sm:top-28" />
      <span class="absolute -left-[6px] top-36 h-12 w-[5px] rounded-l-full bg-ink-300/90 shadow-[-1px_1px_2px_rgba(0,0,0,0.45)] sm:top-40" />
      <span class="absolute -right-[6px] top-28 h-14 w-[5px] rounded-r-full bg-ink-300/90 shadow-[1px_1px_2px_rgba(0,0,0,0.45)] sm:top-32" />

      <!-- Screen -->
      <div class="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-ink-900">
        <!-- Notch -->
        <div class="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" />

        <!-- Status bar -->
        <div class="flex items-center justify-between px-5 pt-3 font-mono text-[9px] text-ink-200">
          <span>9:41</span>
          <span class="flex items-center gap-1">
            <span class="h-1.5 w-3 rounded-sm border border-ink-200/70" />
            <span class="h-1.5 w-1.5 rounded-full bg-ink-200/70" />
          </span>
        </div>

        <!-- Editor window -->
        <div class="mx-3 mt-3 overflow-hidden rounded-lg border border-ink-600/60 bg-ink-800/80">
          <div class="flex items-center gap-1.5 border-b border-ink-600/60 px-3 py-2">
            <span class="h-1.5 w-1.5 rounded-full bg-red-400/70" />
            <span class="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            <span class="ml-2 truncate font-mono text-[8px] text-ink-300">App.tsx</span>
          </div>
          <div class="space-y-1 px-3 py-2 font-mono text-[8px] leading-relaxed">
            <p><span class="text-spark-300">import</span> <span class="text-white">App</span> <span class="text-spark-300">from</span> <span class="text-emerald-300">'./App'</span></p>
            <p><span class="text-spark-300">export default function</span> <span class="text-amber-200">Main</span>() {</p>
            <p class="pl-3"><span class="text-spark-300">return</span> <span class="text-ink-200">&lt;<span class="text-spark-300">App</span> /&gt;</span></p>
            <p>}</p>
          </div>
        </div>

        <!-- Build log / terminal -->
        <div class="mx-3 mt-2.5 rounded-lg border border-ink-600/60 bg-ink-950/80 px-3 py-2 font-mono text-[8px] text-ink-200">
          <p class="text-ink-300">$ npm run build</p>
          <p class="mt-1 text-spark-300 motion-safe:animate-fade-up" style="animation-delay: 200ms">✓ Compiling sources</p>
          <p class="mt-1 text-spark-300 motion-safe:animate-fade-up" style="animation-delay: 500ms">✓ Optimizing assets</p>
          <p class="mt-1 text-spark-300 motion-safe:animate-fade-up" style="animation-delay: 800ms">✓ Signing package</p>
          <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink-700">
            <div class="build-progress h-full rounded-full bg-gradient-to-r from-spark-400 to-spark-200" />
          </div>
          <p class="mt-1.5 flex items-center gap-1 text-white">
            <span>Publishing to production</span>
            <span class="cursor-blink">_</span>
          </p>
        </div>

        <!-- Home indicator -->
        <div class="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-ink-500/70" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.build-progress {
  width: 15%;
  animation: build-progress 3.6s ease-in-out infinite;
}

.cursor-blink {
  animation: cursor-blink 1s step-end infinite;
}

@keyframes build-progress {
  0% {
    width: 15%;
  }
  70% {
    width: 92%;
  }
  100% {
    width: 92%;
  }
}

@keyframes cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .build-progress {
    width: 92%;
    animation: none;
  }

  .cursor-blink {
    animation: none;
  }
}
</style>
