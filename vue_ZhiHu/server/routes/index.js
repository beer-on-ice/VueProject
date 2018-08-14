const { getAllPresses } = require('../service/press')
const {controller, get, post} = require('../lib/decorator')

@controller('/press')
export class pressList {
  @get('/')
  async getPresses (ctx, next) {
    const presses = await getAllPresses()
    ctx.body = presses
  }
  @get('/s')
  async getTest (ctx, next) {
    ctx.body = 123
  }
  @post('/s')
  async getTests (ctx, next) {
    ctx.body = 456
  }
}
