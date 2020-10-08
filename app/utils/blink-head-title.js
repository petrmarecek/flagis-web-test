import { titles } from 'utils/titles-enums'

const blinkHeadTitle = title => {
  const oldTitle = document.title
  let timeoutId

  const blink = () => {
    document.title = document.title === title ? titles.NEW_NOTIFICATION : title
  }

  const clear = () => {
    window.clearInterval(timeoutId)
    document.title = oldTitle
    window.onmousemove = null
    timeoutId = null
  }

  if (!timeoutId) {
    timeoutId = window.setInterval(blink, 800)
    window.onmousemove = clear
  }
}

export { blinkHeadTitle }
