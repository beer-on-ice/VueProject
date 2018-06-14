const localEvent = function (item) {
    this.get = function () {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj))
    }
    this.clear = function () {
        localStorage.removeItem(item)
    }
}
export const localFollow = new localEvent('follow')
export const localBgSrc = new localEvent('bgSrc')
export const localCollect = new localEvent('collect')

