<script setup lang="ts">
import { projects } from '~/app/data/projects'

const { t } = useI18n()
const config = useRuntimeConfig()

const pageTitle = computed(() => t('meta.title'))
const pageDescription = computed(() => t('meta.description'))

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogSiteName: () => t('seo.siteName'),
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription
})

const jsonLd = computed(() => {
  const siteUrl = config.public.siteUrl as string

  const person = {
    '@type': 'Person',
    name: t('header.name'),
    jobTitle: t('seo.personJobTitle'),
    url: siteUrl,
    email: 'mailto:support@games-for-everyone.ru',
    sameAs: ['https://www.rustore.ru/catalog/developer/uzwiet']
  }

  const itemList = {
    '@type': 'ItemList',
    name: t('products.title'),
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: t(`projects.${project.id}.name`),
        description: t(`projects.${project.id}.description`),
        url: project.links[0]?.url,
        applicationCategory: project.type === 'web' ? 'WebApplication' : 'MobileApplication',
        ...(project.type === 'android' ? { operatingSystem: 'Android' } : {})
      }
    }))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, itemList]
  }
})

useHead({
  script: [
    {
      key: 'ld-json',
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(jsonLd.value))
    }
  ]
})

</script>

<template>
  <div>
    <HeroSection />
    <CapabilitiesSection />
    <LazyCasesSection hydrate-on-visible />
    <LazyTrustSection hydrate-on-visible />
    <LazyProcessSection hydrate-on-visible />
    <LazyOwnProductsSection hydrate-on-visible />
    <LazyStackSection hydrate-on-visible />
    <LazyFaqSection hydrate-on-visible />
    <LazyContactSection hydrate-on-visible />
  </div>
</template>
