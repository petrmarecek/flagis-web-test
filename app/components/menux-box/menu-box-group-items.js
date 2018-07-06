import React from 'react'
import PropTypes from 'prop-types'

const MenuBoxGroupItems = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

MenuBoxGroupItems.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default MenuBoxGroupItems
