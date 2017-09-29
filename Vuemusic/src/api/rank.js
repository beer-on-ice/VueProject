//用jsonp抓取数据
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

//Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    const data = Object.assign({},commonParams,{
        uin:997477295,
        platform:'h5',
        needNewCode:1
    })
    return jsonp(url,data,options)
}

export function getMusicList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

//Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    const data = Object.assign({},commonParams,{
        topid,
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5'
    })
    return jsonp(url,data,options)
}
