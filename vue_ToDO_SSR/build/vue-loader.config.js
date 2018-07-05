module.exports = (isDev) => {
    return {
        preserveWhitespace: true, //保留空白节点
        extractCSS: !isDev, // .vue文件css单独打包
        cssModules: {
            localIdentName: isDev?'[path]-[name]-[hash:base64:5]': '[hash:base64:5]' ,
            camelCase: true
        },
        // hotReload: false, // 根据环境变量生成
        loaders:{},
        preLoader: {},
        postLoader:{}
    }
}
