const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? '/' : './',
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      .set('utils', resolve('src/utils'))
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use(['pug-plain-loader'])
      .loader('pug-plain-loader')
      .end()
  }
}

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
