const { defineConfig } = require('@vue/cli-service')

const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/components')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 2222,
      host: 'localhost'
    },
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})
