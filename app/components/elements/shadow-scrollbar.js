import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'

export default class ShadowScrollbar extends PureComponent {

  constructor(props, ...rest) {
    super(props, ...rest)
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    }
  }

  static propTypes = {
    style: PropTypes.object,
    verticalStyle: PropTypes.object,
  }

  getScrollbars() {
    const { verticalStyle, ...props } = this.props
    return verticalStyle
      ? (
        <Scrollbars
          ref="scrollbars"
          renderThumbVertical={scrollProps => <div {...scrollProps} style={verticalStyle} />}
          onDragEnter={this.handleDrag}
          onUpdate={this.handleUpdate}
          {...props}/>
      )
      : (
        <Scrollbars
          ref="scrollbars"
          onDragEnter={this.handleDrag}
          onUpdate={this.handleUpdate}
          {...props}/>
      )
  }

  handleUpdate = values => {
    const { shadowTop, shadowBottom } = this.refs
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    shadowTop.style.opacity = shadowTopOpacity
    shadowBottom.style.opacity = shadowBottomOpacity
  }

  handleDrag = values => {
    const { scrollbars } = this.refs
    // Position of tasks list
    const { left, top, right, bottom } = findDOMNode(scrollbars).getBoundingClientRect()
    // Current position of mouse
    const { clientX, clientY } = values
    const conditionX = clientX >= left && clientX <= right
    const conditionTopY = clientY >= top && clientY <= (top + 30)
    const conditionBottomY = clientY >= (bottom - 30) && clientY <= bottom

    // Scroll to top
    if (conditionX && conditionTopY) {
      scrollbars.view.scrollTop -= 10
    }

    // Scroll to bottom
    if (conditionX && conditionBottomY) {
      scrollbars.view.scrollTop += 10
    }
  }

  render() {
    const { style } = this.props
    const scrollbars = this.getScrollbars()
    const containerStyle = {
      ...style,
      position: 'relative'
    }
    const shadowTopStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      height: style.shadowHeight,
      boxShadow: style.boxShadowTop,
    }
    const shadowBottomStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      height: style.shadowHeight,
      boxShadow: style.boxShadowBottom,
    }

    return (
      <div style={containerStyle}>
        {scrollbars}
        <div
          ref="shadowTop"
          style={shadowTopStyle} />
        <div
          ref="shadowBottom"
          style={shadowBottomStyle} />
      </div>
    )
  }
}
