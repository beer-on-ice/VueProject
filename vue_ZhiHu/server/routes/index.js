const router = require('koa-router')()
const { getAllPresses } = require('../service/press')

router.get('/', async (ctx, next) => {
  const presses = await getAllPresses()
  ctx.body = presses
})

module.exports = router
