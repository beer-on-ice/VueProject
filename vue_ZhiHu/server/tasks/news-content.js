const rp = require('request-promise-native')
const baseUrl = 'https://news-at.zhihu.com/api/4/news/'
const mongoose = require('mongoose')
const Press = mongoose.model('Press')

async function fetchDetail (item) {
  const url = `${baseUrl}${item.id}`
  const res = await rp(url)
  let body
  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }
  return body
}

;(async () => {
  let presses = await Press.find({})
  for (let i = 0; i < presses.length; i++) {
    let press = presses[i]
    let pressInfo = await fetchDetail(press)
    if (pressInfo) {
      press.content = pressInfo.body
    }
    await press.save()
  }
})()
