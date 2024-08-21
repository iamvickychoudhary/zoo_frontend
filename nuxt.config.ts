// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    BaseUrl:process.env.BASEURL,
    SessionPassword:process.env.SESSION_PASSWORD 
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@bootstrap-vue-next/nuxt',],
  css: ['bootstrap/dist/css/bootstrap.min.css'],
})
