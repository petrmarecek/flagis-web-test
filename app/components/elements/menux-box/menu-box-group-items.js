import React from 'react'
import PropTypes from 'prop-types'
import { MenuBoxGroup } from './styles'

const MenuBoxGroupItems = ({ children }) => (
  <MenuBoxGroup>
    {children}
  </MenuBoxGroup>
)

MenuBoxGroupItems.propTypes = {
  children: PropTypes.any,
}

export default MenuBoxGroupItems
