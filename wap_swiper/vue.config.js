const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  outputDir: 'dist', // 构建输出目录
  runtimeCompiler: true, // 运行时版本是否需要编译
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use(['pug-plain-loader'])
      .loader('pug-plain-loader')
      .end()
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.61:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
