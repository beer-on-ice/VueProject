import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
//  导出所有歌手数据
export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({},commonParams,{
        platform: 'yqq',
        hostUin: 0,
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        //一页查几条数据
        pagesize: 100,
        pagenum: 1,
        needNewCode: 0,
        g_tk: 1664029744
    })
    return jsonp(url,data,options)
}


export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({},commonParams,{
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singerId
    })
    return jsonp(url,data,options)
}
