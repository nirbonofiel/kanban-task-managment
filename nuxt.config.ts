import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-17',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  colorMode: {
    classSuffix: '', // This is important!
    fallback: 'light',
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  }
})