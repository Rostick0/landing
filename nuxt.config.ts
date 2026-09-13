// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: { enabled: true },
  compatibilityDate: '2025-01-01',

  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    '~/components'
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Заранее резолвим DNS/TCP/TLS до mc.yandex.ru, пока счётчик грузится
        // асинхронно, — сам скрипт при этом не блокирует рендер страницы.
        { rel: 'preconnect', href: 'https://mc.yandex.ru', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://mc.yandex.ru' }
      ],
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=112552720', 'ym');

          ym(112552720, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`,
          type: 'text/javascript'
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/112552720" style="position:absolute; left:-9999px;" alt="" /></div>'
        }
      ]
    }
  },

  css: [],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts'
  },

  image: {
    // Статический экспорт отдаётся напрямую через nginx без Node-рантайма,
    // поэтому серверная трансформация IPX отключена — NuxtImg отдаёт файлы как есть.
    provider: 'none'
  },

  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false
    },
    locales: [
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'ru'
    },
    baseUrl: 'https://rostislavvolkov.dev'
  },

  runtimeConfig: {
    public: {
      // Сайт статический (nitro preset: static, отдаётся nginx без Node),
      // поэтому это не серверный роут Nuxt, а отдельный PHP-обработчик
      // из server-php/contact/ — задеплойте его на том же сервере по этому
      // пути (см. server-php/contact/index.php) или переопределите значение
      // через NUXT_PUBLIC_CONTACT_ENDPOINT при сборке, если он на другом домене.
      contactEndpoint: '/api/contact/',
      siteUrl: 'https://rostislavvolkov.dev'
    }
  },

  typescript: {
    strict: true
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en']
    }
  }
})
