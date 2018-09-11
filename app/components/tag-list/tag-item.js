import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import velocity from 'velocity-animate'
import { getColorIndex, getTagColor } from '../../redux/utils/component-helper'

import { ICONS } from "../icons/icon-constants"
import Icon from '../icons/icon'

export default class TagItem extends PureComponent {

  static propTypes = {
    tag: PropTypes.object,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  }

  componentDidMount() {
    velocity(this.refs.elem, 'transition.slideUpIn', { duration: 400 })
  }

  handleClick = () => {
    this.refs.elem.focus()
    this.props.onClick(this.props.tag.id)
  }

  render() {
    const tag = this.props.tag
    const colorIndex = getColorIndex(tag.colorIndex, tag.title)
    const tagColor = getTagColor(colorIndex)
    const tagItemClasses = classnames({
      'tag-item': true,
      'selected': this.props.selected
    })

    return (
      <li
        key={this.props.tag.id}
        ref="elem"
        className={tagItemClasses}
        onClick={this.handleClick}>
        <div className="tag-item__container">
          <div className="tag-item__icon-tag">
            <Icon
              icon={ICONS.TAG}
              width={37}
              height={20}
              scale={1.81}
              color={[tagColor]}/>
          </div>
          <div className="tag-item__title">{this.props.tag.title}</div>
        </div>
      </li>
    )
  }
}
