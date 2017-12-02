
export default {

  getOffset(elem) {

    if (!elem ) {
      return null
    }

    const rect = elem.getBoundingClientRect()

    // Make sure element is not hidden (display: none) or disconnected
    if (rect.width || rect.height || elem.getClientRects().length) {
      const docElem = document.documentElement;
      return {
        top: rect.top + window.pageYOffset - docElem.clientTop,
        left: rect.left + window.pageXOffset - docElem.clientLeft
      }
    }

    return null
  }

}