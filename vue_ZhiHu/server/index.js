
// const Koa = require('koa')
import Koa from 'koa'
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  await connect()
  await initSchemas()

  // require('./tasks/trailer-list')
  // require('./tasks/news-content')

  const app = new Koa()

  await useMiddlewares(app)

  app.listen(3000, () => {
    console.log('Server Start at Port 3000')
  })
})()
