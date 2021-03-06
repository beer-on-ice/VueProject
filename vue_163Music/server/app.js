const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const proxy = require('http-proxy-middleware')
const path = require('path')
const app = new Koa()
const port = 3001

app.use(static(path.join(__dirname, '../dist')))

app.use(async (ctx, next) => {
  ctx.respond = false
  if (ctx.url.startsWith('/api')) {
    return proxy({
      target: 'http://192.168.2.109:3000', // 服务器地址
      changeOrigin: true,
      secure: false,
      ws: true,
      pathRewrite: {
        '^/api': ''
      }
    })(ctx.req, ctx.res, next)
  }
  return next()
})

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log('server start at port: ' + port)
})
