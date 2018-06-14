const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
// 根据package.json 中的scripts->build / dev判断
const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname,'src/main.js'),// 输入：项目主文件（入口文件）
    output: { // 输出
        filename:'bundle.[hash:8].js', // 输出的文件名
        path: path.join(__dirname,'dist') // 输出路径
    },
    module: {// 配置加载资源
        rules:[// 规则
            {
                test: /\.jsx$/,
                loader:'babel-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         // 顺序不能颠倒
            //         'style-loader', // 将css写入html中style标签
            //         'css-loader' // 处理css文件中的url()等
            //     ]
            // },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,// 文件小于1024字节，转换成base64编码，写入文件里面
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    // webpack插件配置
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev? '"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev) {
    config.module.rules.push(
        {
            test:/\.styl/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        }
    )
    config.devtool = '#cheap-module-eval-source-map'

    // 开发环境配置
    config.devServer = {
        port: '8080', // 启动端口
        host: '127.0.0.1',//可以通过内网的ip进行防问,也可以通过localhost访问
        overlay: { // webpack编译出现错误，则显示到网页上
            errors: true
        },
        //open: true // 自动打开浏览器
        hot: true // 热重载
    }

    // 不刷新热重载
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    
} else {
    config.entry = { // 将所用到的类库单独打包
        app: path.join(__dirname,'src/main.js'),
        vendor:['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test:/\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
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
        }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        // // 将类库文件单独打包出来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // webpack相关的代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config