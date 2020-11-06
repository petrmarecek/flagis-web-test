const { userAgent } = navigator
const device = {
  TABLET: 'tablet',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
}

const getDeviceType = () => {
  // iPad use desktop safari version from iPadOS 13
  const isIPadDesktopBrowser =
    userAgent.match(/(macintosh)/i) && 'ontouchend' in document
  const tabletPattern = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
  if (userAgent.match(tabletPattern) || isIPadDesktopBrowser) {
    return device.TABLET
  }

  const mobilePatter = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i
  if (userAgent.match(mobilePatter)) {
    return device.MOBILE
  }

  return device.DESKTOP
}

// devices
const isTablet = getDeviceType() === device.TABLET
const isMobile = getDeviceType() === device.MOBILE
const isDesktop = getDeviceType() === device.DESKTOP
const isAndroid = userAgent.match(/Android/i)
const isIPhone = userAgent.match(/iPhone/i)

// browsers
const isSafari = userAgent.match(/Safari/i) && window.safari
const isChrome = userAgent.match(/Chrome/i)
const isFirefox = userAgent.match(/Firefox/i)

export {
  // devices
  isTablet,
  isMobile,
  isDesktop,
  isIPhone,
  isAndroid,
  // browsers
  isSafari,
  isChrome,
  isFirefox,
}
