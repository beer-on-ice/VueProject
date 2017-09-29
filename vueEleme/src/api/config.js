// 通用参数(相同不变的参数)
export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

// options是一个对象，prefix属性表示callback返回的名字，即传参时候的val值，默认是"__jp",param属性表示的是传参时候的key值。
export const options = {
  param: 'jsonpCallback',
  prefix: 'discListInfo'
}

export const ERR_OK = 0
