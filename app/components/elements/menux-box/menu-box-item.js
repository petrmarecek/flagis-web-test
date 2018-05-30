import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Icon from '../../icons/icon'

export default class MenuBoxItem extends PureComponent {

  static propTypes = {
    icon: PropTypes.object,
    iconScale: PropTypes.number,
    title: PropTypes.string,
    active: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
  }

  handleClick = () => {
    if (this.props.active) {
      return
    }

    if (this.props.type) {
      this.props.onChange(this.props.type)
      return
    }

    this.props.onChange()
  }

  render() {
    const { icon, iconScale, title, active } = this.props

    const menuBoxItemClass = cx({
      'menu-box-group__icon': icon,
      'menu-box-group__title': title,
      'active': active,
    })

    return (
      <div className={menuBoxItemClass} >
        {icon &&
        <Icon
          icon={icon}
          width={16}
          height={16}
          scale={iconScale}
          onClick={this.handleClick} />}
        {title &&
        <span onClick={this.handleClick}>{title}</span>}
      </div>
    )
  }
}
