export default {
  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = err => reject(err)
      reader.readAsArrayBuffer(file)
    })
  },

  setFileExtensionToLowerCase(file) {
    const fileExtension = file.name.split('.').pop()
    const validExtension = fileExtension.toLowerCase()
    const fileNameWithValidExtension = file.name.replace(
      fileExtension,
      validExtension
    )

    // eslint-disable-next-line no-undef
    return new File([file], fileNameWithValidExtension)
  },
}
