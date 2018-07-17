import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

/* eslint-disable react/no-danger */

export default class ContentEditable extends Component {

  constructor() {
    super()
    this.height = 0
  }

  static propTypes = {
    html: PropTypes.string,
    onChange: PropTypes.func,
    enforcePlainText: PropTypes.bool,
    onHeightChange: PropTypes.func,
    className: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML
  }

  componentDidUpdate() {
    if (this.props.html !== ReactDOM.findDOMNode(this).innerHTML) {
      ReactDOM.findDOMNode(this).innerHTML = this.props.html
    }
  }

  componentDidMount() {

    // Inform parent that height of content-editable has changed
    this.height = this.getHeight()

    // Subscribe on content changes and raise height changed event when needed
    this.refs.content.addEventListener("input", () => {

      const newHeight = this.refs.content.offsetHeight
      const oldHeight = this.height
      this.height = newHeight

      if (oldHeight !== newHeight) {
        this.raiseHeightChanged(newHeight)
      }
    }, false)
  }

  getHeight() {
    return this.refs.content.offsetHeight
  }

  raiseHeightChanged() {
    if (this.props.onHeightChange) {
      this.props.onHeightChange(this.height)
    }
  }

  stripHtmlTags(html) {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  makePlainText(html) {
    const htmlWithoutTags = this.stripHtmlTags(html)
    return htmlWithoutTags.replace(/[#*\n]/gi, '')
  }

  emitChange = evt => {
    let html = ReactDOM.findDOMNode(this).innerHTML
    if (this.props.onChange && html !== this.lastHtml) {

      if (this.props.enforcePlainText) {
        html = this.makePlainText(html)
      }

      evt.target = {value: html}
      this.props.onChange(evt)
    }
    this.lastHtml = html
  }

  render() {

    return (
      <div
        ref="content"
        className={this.props.className}
        onBlur={this.emitChange}
        contentEditable="true"
        dangerouslySetInnerHTML={{__html: this.props.html}}/>
    )
  }
}
