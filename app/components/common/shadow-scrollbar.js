import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import debounce from 'lodash/debounce'

export default class ShadowScrollbar extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    position: PropTypes.number,
    verticalStyle: PropTypes.object,
    children: PropTypes.any,
    isToggleTaskList: PropTypes.bool,
    isScrollBottom: PropTypes.bool,
    setPosition: PropTypes.func,
    addScrollRef: PropTypes.func,
    handleDrag: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleScrollStop: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    const { position, isToggleTaskList } = this.props
    const { scrollRef } = this.refs

    if (prevProps.position > 0 && position === 0) {
      scrollRef.view.scrollTop = position
    }

    if (prevProps.isToggleTaskList !== isToggleTaskList) {
      scrollRef.view.scrollTop = 0
    }
  }

  componentDidMount() {
    const { scrollRef } = this.refs

    window.setTimeout(() => {
      if (this.props.addScrollRef) {
        this.props.addScrollRef(scrollRef)
      }

      if (this.props.position) {
        scrollRef.view.scrollTop = this.props.position
      }

      if (this.props.isScrollBottom) {
        scrollRef.scrollToBottom()
      }
    }, 1)
  }

  handleUpdate = values => {
    const { shadowTopRef, shadowBottomRef } = this.refs
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    shadowTopRef.style.opacity = shadowTopOpacity
    shadowBottomRef.style.opacity = shadowBottomOpacity
  }

  handleScrollStop = () => {
    const { scrollRef } = this.refs
    // save scrollbar position to redux store
    if (this.props.setPosition) {
      this.props.setPosition(scrollRef.view.scrollTop)
    }
  }

  handleDrag = values => {
    // Position of tasks list
    const { scrollRef } = this.refs
    const { left, top, right, bottom } = findDOMNode(
      scrollRef
    ).getBoundingClientRect()

    // Current position of mouse
    const { clientX, clientY } = values
    const conditionX = clientX >= left && clientX <= right
    const conditionTopY = clientY >= top && clientY <= top + 100
    const conditionBottomY = clientY >= bottom - 100 && clientY <= bottom

    // Scroll to top
    if (conditionX && conditionTopY) {
      scrollRef.view.scrollTop -= 10
    }

    // Scroll to bottom
    if (conditionX && conditionBottomY) {
      scrollRef.view.scrollTop += 10
    }
  }

  render() {
    const containerStyle = {
      position: 'relative',
      ...this.props.style,
    }

    const shadowTopStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      height: this.props.style.shadowHeight,
      boxShadow: this.props.style.boxShadowTop,
      zIndex: 1,
    }

    const shadowBottomStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      height: this.props.style.shadowHeight,
      boxShadow: this.props.style.boxShadowBottom,
      zIndex: 1,
    }

    return (
      <div style={containerStyle}>
        {this.props.verticalStyle ? (
          <Scrollbars
            ref="scrollRef"
            renderThumbVertical={scrollProps => (
              <div {...scrollProps} style={this.props.verticalStyle} />
            )}
            onDragOver={this.handleDrag}
            onUpdate={this.handleUpdate}
            onScrollStop={this.handleScrollStop}
            children={this.props.children}
          />
        ) : (
          <Scrollbars
            ref="scrollRef"
            onDragOver={this.handleDrag}
            onUpdate={this.handleUpdate}
            onScrollStop={this.handleScrollStop}
            children={this.props.children}
          />
        )}
        <div ref="shadowTopRef" style={shadowTopStyle} />
        <div ref="shadowBottomRef" style={shadowBottomStyle} />
      </div>
    )
  }
}
