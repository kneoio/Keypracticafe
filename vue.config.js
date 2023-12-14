const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 8090
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/'
})
