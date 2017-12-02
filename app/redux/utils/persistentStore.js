export default {

  setItem(key, obj) {
    const objStr = JSON.stringify(obj)
    window.localStorage.setItem(key, objStr)
  },

  getItem(key) {
    const obj = window.localStorage.getItem(key)
    if (!obj) {
      return null;
    }

    return JSON.parse(obj)
  },

  clear() {
    window.localStorage.clear()
  }
}
