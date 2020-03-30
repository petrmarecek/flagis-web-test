import * as _ from 'lodash'
const Blob = window.Blob
const File = window.File

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
    const { name, type, lastModified, lastModifiedDate } = file
    const fileExtension = name.split('.').pop()
    const validExtension = fileExtension.toLowerCase()
    const fileNameWithValidExtension = name.replace(
      fileExtension,
      validExtension
    )

    try {
      return new File([file], fileNameWithValidExtension, { type })
    } catch (error) {
      // for browsers without File constructor
      const blob = new Blob([file], { type })
      blob['name'] = fileNameWithValidExtension
      blob['lastModifiedDate'] = lastModifiedDate

      file = _.assign(blob, {
        lastModified,
        type,
      })

      return file
    }
  },
}
