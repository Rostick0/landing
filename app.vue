<script setup lang="ts">
const head = useLocaleHead({ dir: true, lang: true, seo: true })

useHead({
  htmlAttrs: {
    lang: computed(() => head.value.htmlAttrs.lang),
    dir: computed(() => head.value.htmlAttrs.dir as 'ltr' | 'rtl' | 'auto' | undefined)
  },
  link: computed(() => head.value.link),
  meta: computed(() => head.value.meta)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
