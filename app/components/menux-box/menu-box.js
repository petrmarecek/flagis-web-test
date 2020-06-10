import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { compose, withHandlers, lifecycle } from 'recompose'

const MenuBox = ({ className, children }) => (
  <div className={className} id='menuBox'>
    {children}
  </div>
)

MenuBox.propTypes = {
  className: PropTypes.string,
  animation: PropTypes.string,
  children: PropTypes.any,
  menuIcon: PropTypes.any,
  clickOutsideMenu: PropTypes.func,
  onHandleClick: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClick: props => event => {
      const elem = document.getElementById('menuBox')
      const menuIcon = findDOMNode(props.menuIcon)

      if (!elem.contains(event.target) && !menuIcon.contains(event.target) ) {
        props.clickOutsideMenu()
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      // Add listener for close menu
      document.getElementById('user-container').addEventListener('click', this.props.onHandleClick, false)
    },
    componentWillUnmount() {
      // Remove listener for close menu
      document.getElementById('user-container').removeEventListener('click', this.props.onHandleClick, false)
    }
  })
)(MenuBox)
