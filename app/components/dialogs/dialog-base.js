import React, { Component } from 'react' // eslint-disable-line

export default class DialogBase extends Component {
  centerDialog() {
    const dialog = this.refs.dialogWin
    dialog.style.top = `${((window.innerHeight / 2) - (dialog.offsetHeight / 2)) - 60}px`
    dialog.style.left = `${((window.innerWidth / 2) - (dialog.offsetWidth / 2))}px`
  }
}
