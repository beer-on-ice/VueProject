
// ?id=1234&name=abcd
export default function urlParse() {
    // window.location.search截取当前url中“?”后面的字符串
    // 截取掉?,并以&分开，存入数组
    let url = window.location.search
    let urlArr = url.substr(1).split('&');
    let obj = {};
    if(urlArr) {
        urlArr.forEach((item)=> {
            //以等号截取，存入数组
            let arr = item.split('=') // arr[0]=[id,1234],arr[1]=[name,abcd]
            let key = decodeURIComponent(arr[0]) // 对url解码
            let val = decodeURIComponent(arr[1])
            obj[key] = val
        })

        return obj  //  {id: "1234", name: "abcd"}
    }
}
