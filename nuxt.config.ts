// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // plugins: [{ src: "~plugins/vuedraggable.js", ssr: false }],
  components: {
    "dirs": [
      {
        "path": "~/components/global",
        "global": true
      },
      "~/components"
    ]
  },
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
