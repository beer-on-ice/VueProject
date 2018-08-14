module.exports = {
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
