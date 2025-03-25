import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
    },
  },
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    'nuxt-schema-org',
    '@nuxt/image',
    'nuxt-phosphor-icons',
    [
      'nuxt-svgo',
      {
        defaultImport: 'component',
      },
    ],
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  site: {
    url: process.env.BASE_URL,
    name: '',
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-XXXXXXXXXX',
  },
  schemaOrg: {},
});
