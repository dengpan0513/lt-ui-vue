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
      .add(pathResolve('icons/svgs'))
      .end()

    config.module
      .rule('svg-icon')
      .test(/\.svg$/)
      .include
      .add(pathResolve('icons/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.resolve.alias
      .set('~', pathResolve('components'))
      .end()
  }
})
