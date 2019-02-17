import WebStorageCache from 'web-storage-cache'

const wsCache = new WebStorageCache()
export function setLocalStorage (key, value) {
  return wsCache.set(key, value)
}

export function getLocalStorage (key) {
  return wsCache.get(key)
}

export function removeLocalStorage (key) {
  return wsCache.delete(key)
}

export function clearLocalStorage () {
  return wsCache.clear()
}

export function setBookObj (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObj (fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

export function getFontFamily (fileName) {
  return getBookObj(fileName, 'fontFamily')
}

export function saveFontFamily (fileName, font) {
  return setBookObj(fileName, 'fontFamily', font)
}

export function getFontSize (fileName) {
  return getBookObj(fileName, 'fontSize')
}

export function saveFontSize (fileName, font) {
  return setBookObj(fileName, 'fontSize', font)
}

export function getTheme (fileName) {
  return getBookObj(fileName, 'theme')
}

export function saveTheme (fileName, theme) {
  return setBookObj(fileName, 'theme', theme)
}

export function getLocation (fileName) {
  return getBookObj(fileName, 'location')
}

export function saveLocation (fileName, location) {
  return setBookObj(fileName, 'location', location)
}

export function getLocale () {
  return getLocalStorage('locale')
}

export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}
