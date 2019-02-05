import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { findDOMNode } from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'

const ShadowScrollbar = props => {
  const {
    style,
    verticalStyle,
    children,
    getScrollRef,
    getShadowTopRef,
    getShadowBottomRef,
    handleDrag,
    handleUpdate,
  } = props

  const containerStyle = {
    position: 'relative',
    ...style,
  }

  const shadowTopStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    height: style.shadowHeight,
    boxShadow: style.boxShadowTop,
    zIndex: 100,
  }

  const shadowBottomStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    height: style.shadowHeight,
    boxShadow: style.boxShadowBottom,
    zIndex: 100,
  }

  const scrollbars = verticalStyle ? (
    <Scrollbars
      ref={getScrollRef}
      renderThumbVertical={scrollProps => (
        <div {...scrollProps} style={verticalStyle} />
      )}
      onDragEnter={handleDrag}
      onUpdate={handleUpdate}
      children={children}
    />
  ) : (
    <Scrollbars
      ref={getScrollRef}
      onDragEnter={handleDrag}
      onUpdate={handleUpdate}
      children={children}
    />
  )

  return (
    <div style={containerStyle}>
      {scrollbars}
      <div ref={getShadowTopRef} style={shadowTopStyle} />
      <div ref={getShadowBottomRef} style={shadowBottomStyle} />
    </div>
  )
}

ShadowScrollbar.propTypes = {
  style: PropTypes.object,
  verticalStyle: PropTypes.object,
  children: PropTypes.any,
  addScrollRef: PropTypes.func,
  getScrollRef: PropTypes.func,
  getShadowTopRef: PropTypes.func,
  getShadowBottomRef: PropTypes.func,
  handleDrag: PropTypes.func,
  handleUpdate: PropTypes.func,
}

export default withStateHandlers(
  () => ({
    scrollRef: null,
    shadowTopRef: null,
    shadowBottomRef: null,
  }),
  {
    getShadowTopRef: () => ref => ({ shadowTopRef: ref }),
    getShadowBottomRef: () => ref => ({ shadowBottomRef: ref }),
    getScrollRef: (state, props) => ref => {
      if (props.addScrollRef) {
        props.addScrollRef(ref)
      }

      return { scrollRef: ref }
    },
    handleUpdate: ({ shadowTopRef, shadowBottomRef }) => values => {
      const { scrollTop, scrollHeight, clientHeight } = values
      const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
      const bottomScrollTop = scrollHeight - clientHeight
      const shadowBottomOpacity =
        (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
      shadowTopRef.style.opacity = shadowTopOpacity
      shadowBottomRef.style.opacity = shadowBottomOpacity
    },
    handleDrag: ({ scrollRef }) => values => {
      // Position of tasks list
      const { left, top, right, bottom } = findDOMNode(
        scrollRef
      ).getBoundingClientRect()
      // Current position of mouse
      const { clientX, clientY } = values
      const conditionX = clientX >= left && clientX <= right
      const conditionTopY = clientY >= top && clientY <= top + 50
      const conditionBottomY = clientY >= bottom - 50 && clientY <= bottom

      // Scroll to top
      if (conditionX && conditionTopY) {
        scrollRef.view.scrollTop -= 10
      }

      // Scroll to bottom
      if (conditionX && conditionBottomY) {
        scrollRef.view.scrollTop += 10
      }
    },
  }
)(ShadowScrollbar)
