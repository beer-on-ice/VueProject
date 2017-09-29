//用jsonp抓取数据
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'


export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

//Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    const data = Object.assign({},commonParams,{
        platform:'h5',
        needNewCode:1
    })
    return jsonp(url,data,options)
}

export function search(query,page,zhida,perpage) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

    const data = Object.assign({}, commonParams, {
      w: query,
      p: page,
      perpage,
      n:perpage,
      catZhida: zhida ? 1 : 0,
      zhidaqu: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      remoteplace: 'txt.mqq.all',
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })
    return jsonp(url, data, options)
}
