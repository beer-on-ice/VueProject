const Press = require('../database/schema/press')

export const getAllPresses = async () => {
  const presses = await Press.find({})
  return presses
}
