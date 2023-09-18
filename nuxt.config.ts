// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      //config for scss and scss global variables
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/scss/_variables.scss" as *; @use "@/assets/scss/_global.scss" as *;',
        },
      },
    },
    resolve: {
      //config for router. Without it, page routing will not work correctly.
      dedupe: ['vue-router']
    }
  },
  app: {
    baseURL: "./",
  },
  srcDir: "src/renderer",
  //must disable ssl for electron app.
  ssr: false,
  modules: ["@pinia/nuxt"],
  //config for router. Without it, page routing will not work correctly.
  router: { options: { hashMode: true } },
});
