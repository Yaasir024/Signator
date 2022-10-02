// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  plugins: [],
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  meta: {
    link: [
      {
        rel: "stylesheet",
        href: "/css/base.css",
      },
      {
        rel: "stylesheet",
        href: "/css/social.css",
      },
    ],
  },
});
