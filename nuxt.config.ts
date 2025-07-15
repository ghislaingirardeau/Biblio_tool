// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: ['~/assets/css/main.css'],
  components: [
    // ~/components/special-components/Btn.vue => <SpecialBtn />
    { path: '~/components/add-book-components', prefix: 'AddBook' },
    { path: '~/components/list-book-components', prefix: 'ListBook' },
    { path: '~/components/add-quote-components', prefix: 'QuoteBook' },
    { path: '~/components/list-quote-components', prefix: 'ListQuote' },

    '~/components',
  ],
});
