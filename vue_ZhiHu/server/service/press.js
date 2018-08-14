const Press = require('../database/press')

exports.getAllPresses = async () => {
  const presses = await Press.find({})
  return presses
}
