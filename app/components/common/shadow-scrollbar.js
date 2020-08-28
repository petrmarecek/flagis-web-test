import React, { memo, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'

export default class ShadowScrollbar extends PureComponent {
  static propTypes = {
    // data
    style: PropTypes.object,
    position: PropTypes.number,
    scrollSpaceHeight: PropTypes.number,
    scrollStep: PropTypes.number,
    verticalStyle: PropTypes.object,
    children: PropTypes.any,
    isToggleTaskList: PropTypes.bool,
    isScrollBottom: PropTypes.bool,
    isDraggable: PropTypes.bool,

    // functions
    setPosition: PropTypes.func,
    addScrollRef: PropTypes.func,
    setMouseCoordinates: PropTypes.func,
    handleDrag: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleScrollStop: PropTypes.func,
    handleSetInterval: PropTypes.func,
    handleClearInterval: PropTypes.func,
  }

  static defaultProps = {
    isDraggable: false,
    scrollSpaceHeight: 0,
    scrollStep: 0,
  }

  state = {
    intervalFunc: null,
    clientX: null,
    clientY: null,
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

  setMouseCoordinates = values => {
    if (!this.props.isDraggable) {
      return
    }

    const { clientX, clientY } = values
    this.setState({ clientX, clientY })
  }

  handleDrag = () => {
    if (!this.props.isDraggable) {
      return
    }

    // Position of tasks list
    const { scrollRef } = this.refs
    const { left, top, right, bottom } = findDOMNode(
      scrollRef
    ).getBoundingClientRect()

    // Current position of mouse
    const { clientX, clientY } = this.state
    const { scrollSpaceHeight, scrollStep } = this.props
    const bottomLineOfTop = top + scrollSpaceHeight
    const topLineOfBottom = bottom - scrollSpaceHeight
    const conditionX = clientX >= left && clientX <= right
    const conditionTopY = clientY >= top && clientY <= top + scrollSpaceHeight
    const conditionBottomY =
      clientY >= bottom - scrollSpaceHeight && clientY <= bottom

    // Scroll to top
    if (conditionX && conditionTopY) {
      const step = Math.floor((bottomLineOfTop - clientY) / scrollStep)
      scrollRef.view.scrollTop -= step
    }

    // Scroll to bottom
    if (conditionX && conditionBottomY) {
      const step = Math.floor((clientY - topLineOfBottom) / scrollStep)
      scrollRef.view.scrollTop += step
    }
  }

  handleSetInterval = () => {
    if (!this.props.isDraggable) {
      return
    }

    this.setState({ intervalFunc: window.setInterval(this.handleDrag, 10) })
  }

  handleClearInterval = () => {
    if (!this.props.isDraggable) {
      return
    }

    const { intervalFunc } = this.state
    window.clearInterval(intervalFunc)
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
            onDragStart={this.handleSetInterval}
            onDragOver={this.setMouseCoordinates}
            onDragEnd={this.handleClearInterval}
            onUpdate={this.handleUpdate}
            onScrollStop={this.handleScrollStop}
            children={this.props.children}
          />
        ) : (
          <Scrollbars
            ref="scrollRef"
            onDragStart={this.handleSetInterval}
            onDragOver={this.setMouseCoordinates}
            onDragEnd={this.handleClearInterval}
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
