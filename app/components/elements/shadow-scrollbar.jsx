import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from 'dom-css'
import { Scrollbars } from 'react-custom-scrollbars'

export default class ShadowScrollbar extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);
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

  handleUpdate = (values) => {
    const { shadowTop, shadowBottom } = this.refs
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    css(shadowTop, { opacity: shadowTopOpacity })
    css(shadowBottom, { opacity: shadowBottomOpacity })
  }

  getScrollbars() {
    const { verticalStyle, ...props } = this.props
    return verticalStyle
      ? (
        <Scrollbars
          ref="scrollbars"
          renderThumbVertical={scrollProps => <div {...scrollProps} style={verticalStyle}/>}
          onUpdate={this.handleUpdate}
          {...props}/>
      )
      : (
        <Scrollbars
          ref="scrollbars"
          onUpdate={this.handleUpdate}
          {...props}/>
      )
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
      boxShadow: style.boxShadowTop
    }
    const shadowBottomStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      height: style.shadowHeight,
      boxShadow: style.boxShadowBottom
    }

    return (
      <div style={containerStyle}>
        {scrollbars}
        <div
          ref="shadowTop"
          style={shadowTopStyle}/>
        <div
          ref="shadowBottom"
          style={shadowBottomStyle}/>
      </div>
    )
  }
}