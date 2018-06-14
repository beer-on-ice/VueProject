//存储
export function saveToLocal(id,key,value) {
    let seller = window.localStorage._seller_ // 新定义一个key值_seller_，存放要保存的数据对象
    if(!seller) {
        seller = {}
        seller[id] = {}
    } else {
        seller = JSON.parse(seller) // String格式--> json格式
        if(!seller[id]) {
            seller[id] = {}
        }
    }
    seller[id][key] = value
    window.localStorage._seller_ = JSON.stringify(seller); // 将json格式转成String格式，存放到window.localStorage._seller_中
}
//读取
export function loadFromLocal(id, key, defaults) {
    let seller =  window.localStorage._seller_
    if(!seller) {
        return defaults // 一开始是为空，所以返回默认数据
    }
    seller = JSON.parse(seller)[id] //如果有seller,取这个id的商家的数据
    if(!seller) {   //如没有此商家，返回默认数据
        return defaults
    }
    let ret = seller[key] //如没有这个key，返回默认数据，如果有，返回商家数据
    return ret || defaults
}
