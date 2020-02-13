
export default {

  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = err => reject(err)
      reader.readAsArrayBuffer(file)
    })
  }

}
