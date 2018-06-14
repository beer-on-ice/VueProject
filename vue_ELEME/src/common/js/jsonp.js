import originJsonp from 'jsonp'

//JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了

// data拼接到url上
export default function jsonp(url,data,option) {
    url+= (url.indexOf('?') < 0? '?' : '&') + param(data)

    return new Promise((resolve,reject) => {
        originJsonp(url,option,(err,data) => {
            if (!err) {
              resolve(data)
            } else {
              reject(err)
            }
        })
    })
}
//encodeURIComponent 作用：可把字符串作为URI 组件进行编码。
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
