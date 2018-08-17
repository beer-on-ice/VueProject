import originJSONP from 'jsonp'

export default function jsonp (url, data, option) {
  // 拼接请求路径
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) resolve(data)
      else reject(err)
    })
  })
}
// encodeURIComponent 作用：可把字符串作为URI 组件进行编码。
function param (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : '' // 去掉第一个‘&’符号
}
