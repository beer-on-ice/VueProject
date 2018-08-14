// 抓取豆瓣电影列表数据
const puppeteer = require('puppeteer')
const url = 'http://daily.zhihu.com/'
// 暂停
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2' //  满足什么条件认为页面跳转完成,只有2个网络连接时触发（至少500毫秒后）
  })
  await sleep(2000)

  const result = await page.evaluate(() => {
    let $ = window.$
    let items = $('.wrap .link-button')
    let info = []
    if (items.length > 0) {
      items.each((index, item) => {
        let it = $(item)
        let src = it.children('img')[0].src
        let dailyId = it.attr('href')
        let title = it[0].innerText.replace('\n', '').replace('\n', '')
        dailyId = dailyId.substring(7)
        info.push({
          id: dailyId,
          title: title,
          thumbnail: src
        })
      })
    }
    return info
  })
  browser.close()
  process.send({result})
  process.exit(0)
})()
