const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/test_task_currency/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/app.scss';`,
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       prependData: `@import '@/assets/scss/app.scss';`,
  //     },
  //   },
  // },
});
