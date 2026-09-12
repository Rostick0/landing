<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a'
    href?: string
    target?: string
    rel?: string
    type?: 'button' | 'submit'
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    block?: boolean
  }>(),
  {
    as: 'button',
    href: undefined,
    target: undefined,
    rel: undefined,
    type: 'button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    block: false
  }
)

const variantClasses: Record<Variant, string> = {
  primary: 'bg-spark-400 text-ink-900 hover:bg-spark-300 shadow-glow hover:shadow-glow-lg',
  secondary: 'bg-transparent text-ink-100 border border-ink-400/70 hover:border-spark-400/70 hover:text-white',
  ghost: 'bg-transparent text-ink-200 hover:text-white hover:bg-ink-700/60'
}

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base'
}

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :target="as === 'a' ? target : undefined"
    :rel="as === 'a' ? rel : undefined"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled ? 'true' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClasses[variant], sizeClasses[size], block ? 'w-full' : '']"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
      <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4Z" />
    </svg>
    <slot />
  </component>
</template>
