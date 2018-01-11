import React from 'react'
import PropTypes from 'prop-types'

const MenuBoxGroupItems = props => {
  return (
    <div className="menu-box-group">
      {props.children}
    </div>
  )
}

MenuBoxGroupItems.propTypes = {
  children: PropTypes.any,
}

export default MenuBoxGroupItems
