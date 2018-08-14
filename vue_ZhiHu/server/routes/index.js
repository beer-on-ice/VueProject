const { getAllPresses } = require('../service/press')
const {controller, get, post} = require('../lib/decorator')

@controller('/press')
export class pressList {
  @get('/')
  async getPresses (ctx, next) {
    const presses = await getAllPresses()
    ctx.body = presses
  }
}
