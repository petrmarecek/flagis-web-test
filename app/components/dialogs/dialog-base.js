import React, { PureComponent } from 'react' // eslint-disable-line

export default class DialogBase extends PureComponent {
  centerDialog() {
    const dialog = this.refs.dialogWin
    dialog.style.top = `${((window.innerHeight / 2) - (dialog.offsetHeight / 2)) - 60}px`
    dialog.style.left = `${((window.innerWidth / 2) - (dialog.offsetWidth / 2))}px`
  }

  getScrollDialog(items) {
    const lengthItems = items.length - 1
    const dialogHeight = (lengthItems * 26) + 161
    const windowHeight = window.innerHeight - 240
    return dialogHeight >= windowHeight
  }
}
