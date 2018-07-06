import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icons/icon'
import { compose, withHandlers } from 'recompose'
import { MenuBoxItemIcon, MenuBoxItemTitle } from './styles'

const MenuBoxItem = ({ icon, iconScale, title, active, onHandleClick }) => (
  <div>
      {icon &&
      <MenuBoxItemIcon active={active}>
        <Icon
          icon={icon}
          width={16}
          height={16}
          scale={iconScale}
          onClick={onHandleClick} />
      </MenuBoxItemIcon>}
    {title &&
    <MenuBoxItemTitle
      active={active}
      onClick={onHandleClick}>
        {title}
      </MenuBoxItemTitle>}
  </div>
)

MenuBoxItem.propTypes = {
  icon: PropTypes.object,
  iconScale: PropTypes.number,
  title: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onHandleClick: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClick: props => () => {
      if (props.active) {
        return
      }

      if (props.type) {
        props.onChange(props.type)
        return
      }

      props.onChange()
    }
  })
)(MenuBoxItem)
