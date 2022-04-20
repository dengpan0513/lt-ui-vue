const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function pathResolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude
      .add(pathResolve('icons'))
      .end()
  }
})
