const Koa = require('koa')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const router = require('koa-router')()

const index = require('./routes/index.js')

;(async () => {
  await connect()
  await initSchemas()

  // require('./tasks/trailer-list')
  // require('./tasks/news-content')

  const app = new Koa()

  router.use('/press', index.routes(), index.allowedMethods())

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(3000, () => {
    console.log('Server Start at Port 3000')
  })
})()
