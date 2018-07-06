const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
// 根据package.json 中的scripts->build / dev判断
const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: '8080', // 启动端口
  host: '127.0.0.1', // 可以通过内网的ip进行防问,也可以通过localhost访问
  overlay: { // webpack编译出现错误，则显示到网页上
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html' // 解决mode: history问题
  },
  // open: true // 自动打开浏览器
  hot: true // 热重载
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, './template.html')
  })
]
let config
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })

} else {
  config = merge(baseConfig, {
    entry: { // 将所用到的类库单独打包
      app: path.join(__dirname, '../client/main.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 将类库文件单独打包出来
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // webpack相关的代码单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
