import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const EventListenerMode = { capture: true }

export default class ResizeHandle extends PureComponent {

  static propTypes = {
    onResize: PropTypes.func.isRequired,
    onResizeStart: PropTypes.func,
    onResizeStop: PropTypes.func,
    right: PropTypes.bool,
  }

  handleMouseDown = e => {
    this.props.onResizeStart && this.props.onResizeStart()
    this.captureMouseEvents(e)
    e.preventDefault()
    e.stopPropagation()
  }

  mousemoveListener = e => {
    e.preventDefault()
    this.props.onResize({
      x: e.clientX,
      y: e.clientY,
    })
  }

  mouseupListener = e => {
    this.props.onResizeStop && this.props.onResizeStop()
    document.removeEventListener ('mouseup', this.mouseupListener, EventListenerMode)
    document.removeEventListener ('mousemove', this.mousemoveListener, EventListenerMode)
    e.stopPropagation()
  }

  captureMouseEvents = e => {
    document.addEventListener ('mouseup', this.mouseupListener, EventListenerMode)
    document.addEventListener ('mousemove', this.mousemoveListener, EventListenerMode)
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const css = cx({
      'resize-handle': true,
      'resize-handle--right': Boolean(this.props.right),
    })

    return (
      <div
        ref="handle"
        className={css}
        onMouseDownCapture={this.handleMouseDown}
        onMouseUpCapture={this.handleMouseUp} />
    )
  }
}
