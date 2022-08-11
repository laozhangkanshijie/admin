// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    open: true, // 打开浏览器
    onBeforeSetupMiddleware: require('./mock/mock-server.js'),
    proxy: {
      // 当地址中包含 process.env.VUE_APP_BASE_API 的时候， 触发此代理
      [process.env.VUE_APP_BASE_API]: {
        // target: 'https://api.imooc-admin.lgdsunday.club',
        // target: 'https://book.youbaobao.xyz:18082',
        target: 'http://localhost:4000',
        changeOrigin: true
        // pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' }
      }
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

// module.exports = defineConfig({
//   transpileDependencies: true
// })
