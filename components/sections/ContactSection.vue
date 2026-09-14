<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

interface FormState {
  name: string
  email: string
  message: string
  company: string
}

const form = reactive<FormState>({ name: '', email: '', message: '', company: '' })

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>
const errors = reactive<FieldErrors>({})

type Status = 'idle' | 'loading' | 'success' | 'error'
const status = ref<Status>('idle')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined

  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name) errors.name = t('contact.form.errors.nameRequired')

  if (!email) errors.email = t('contact.form.errors.emailRequired')
  else if (!emailPattern.test(email)) errors.email = t('contact.form.errors.emailInvalid')

  if (!message) errors.message = t('contact.form.errors.messageRequired')
  else if (message.length < 10) errors.message = t('contact.form.errors.messageMinLength')

  return !errors.name && !errors.email && !errors.message
}

async function onSubmit() {
  // Ловушка для ботов: если скрытое поле заполнено — тихо считаем отправку успешной.
  if (form.company) {
    status.value = 'success'
    return
  }

  if (!validate()) return

  status.value = 'loading'
  try {
    await $fetch(config.public.contactEndpoint, {
      method: 'POST',
      body: { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}

const directLinks = computed(() => [
  {
    label: t('contact.direct.emailLabel'),
    value: 'support@games-for-everyone.ru',
    href: 'mailto:support@games-for-everyone.ru'
  },
  {
    // TODO: подставить реальный юзернейм Telegram
    label: t('contact.direct.telegramLabel'),
    value: '@MySuper5',
    href: 'https://t.me/MySuper5'
  },
  {
    label: t('contact.direct.linkedinLabel'),
    value: 'linkedin.com/in/rostislav-volkov-a00379382',
    href: 'https://www.linkedin.com/in/rostislav-volkov-a00379382/'
  },
  {
    label: t('contact.direct.kworkLabel'),
    value: 'kwork.ru/user/rostik057',
    href: 'https://kwork.ru/user/rostik057'
  }
])
</script>

<template>
  <section id="contact" class="section-padding" aria-labelledby="contact-heading">
    <div class="container-page">
      <SectionTitle
        heading-id="contact-heading"
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
      />

      <div class="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form novalidate class="surface-card rounded-2xl p-6 sm:p-8" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <label for="contact-name" class="text-sm text-ink-200">{{ t('contact.form.nameLabel') }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="mt-1.5 w-full rounded-lg border border-ink-500/60 bg-ink-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-400 focus-visible:border-spark-400"
                :placeholder="t('contact.form.namePlaceholder')"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
              />
              <p v-if="errors.name" id="contact-name-error" class="mt-1.5 text-xs text-red-400" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <div class="sm:col-span-1">
              <label for="contact-email" class="text-sm text-ink-200">{{ t('contact.form.emailLabel') }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="mt-1.5 w-full rounded-lg border border-ink-500/60 bg-ink-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-400 focus-visible:border-spark-400"
                :placeholder="t('contact.form.emailPlaceholder')"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
              />
              <p v-if="errors.email" id="contact-email-error" class="mt-1.5 text-xs text-red-400" role="alert">
                {{ errors.email }}
              </p>
            </div>

            <div class="sm:col-span-2">
              <label for="contact-message" class="text-sm text-ink-200">{{ t('contact.form.messageLabel') }}</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                class="mt-1.5 w-full resize-y rounded-lg border border-ink-500/60 bg-ink-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-400 focus-visible:border-spark-400"
                :placeholder="t('contact.form.messagePlaceholder')"
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              />
              <p v-if="errors.message" id="contact-message-error" class="mt-1.5 text-xs text-red-400" role="alert">
                {{ errors.message }}
              </p>
            </div>

            <div class="sm:col-span-2" aria-hidden="true">
              <label for="contact-company" class="sr-only">{{ t('contact.form.honeypotLabel') }}</label>
              <input
                id="contact-company"
                v-model="form.company"
                type="text"
                tabindex="-1"
                autocomplete="off"
                class="absolute h-0 w-0 opacity-0"
              />
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BaseButton type="submit" variant="primary" size="lg" :loading="status === 'loading'">
              {{ status === 'loading' ? t('contact.form.submitting') : t('contact.form.submit') }}
            </BaseButton>

            <p v-if="status === 'success'" role="status" class="text-sm text-spark-300">
              {{ t('contact.form.successBody') }}
            </p>
            <p v-else-if="status === 'error'" role="alert" class="text-sm text-red-400">
              {{ t('contact.form.errorBody') }}
            </p>
          </div>
        </form>

        <div>
          <h3 class="text-sm font-semibold text-ink-400">
            {{ t('contact.direct.title') }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in directLinks" :key="link.label">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="surface-card flex flex-col rounded-xl px-4 py-3 text-sm"
              >
                <span class="text-ink-400">{{ link.label }}</span>
                <span class="text-white">{{ link.value }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
