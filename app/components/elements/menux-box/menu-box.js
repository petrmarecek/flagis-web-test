import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import velocity from 'velocity-animate'

export default class MenuBox extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    animation: PropTypes.string,
    children: PropTypes.any,
    elemMenu: PropTypes.object,
    elemFilters: PropTypes.object,
    clickOutsideMenu: PropTypes.func,
    menuIcon: PropTypes.any,
  }

  componentDidMount() {
    velocity(this.refs.elem, this.props.animation, { duration: 400 })

    // Add listener for close menu
    document.getElementById('user-container').addEventListener("click", this.handleClick, false)
  }

  componentWillUnmount() {
    // Remove listener for close menu
    document.getElementById('user-container').removeEventListener("click", this.handleClick, false)
  }

  handleClick = event => {
    const elem = findDOMNode(this.refs.elem)
    const menuIcon = findDOMNode(this.props.menuIcon)

    if (!elem.contains(event.target) && !menuIcon.contains(event.target) ) {
      this.props.clickOutsideMenu()
    }
  }

  render() {
    const { className, children } = this.props

    return (
      <div
        ref="elem"
        className={className}>
        {children}
      </div>
    )
  }
}
