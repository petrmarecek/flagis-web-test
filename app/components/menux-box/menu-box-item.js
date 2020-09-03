import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icons/icon'
import { compose, withHandlers } from 'recompose'

const MenuBoxItem = ({ className, icon, iconScale, title, onHandleClick }) => (
  <div className={className} onClick={onHandleClick}>
    {icon && <Icon icon={icon} width={16} height={16} scale={iconScale} />}
    {title && <span>{title}</span>}
  </div>
)

MenuBoxItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  iconScale: PropTypes.number,
  title: PropTypes.string,
  active: PropTypes.bool,
  canClickAgain: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onHandleClick: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClick: props => () => {
      if (props.active && !props.canClickAgain) {
        return
      }

      if (props.type) {
        props.onChange(props.type)
        return
      }

      props.onChange()
    },
  })
)(MenuBoxItem)
