// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/scss/_variables.scss" as *; @use "@/assets/scss/_global.scss" as *;',
        },
      },
    },
  },
  app: {
    baseURL: "./",
  },
  srcDir: "src/renderer",
  ssr: false,
  modules: ["@pinia/nuxt"],
  router: { options: { hashMode: true } },
});
