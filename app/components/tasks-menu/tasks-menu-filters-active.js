import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class TasksMenuFiltersActive extends Component {

  static propTypes = {
    title: PropTypes.string,
    onDelete: PropTypes.func,
  }

  handleDelete = () => {
    this.props.onDelete(this.props.title)
  }

  renameTitle(title) {
    switch (title) {
      case ('today'):
        title = 'Today'
        break;

      case ('week'):
        title = 'This week'
        break;

      case ('month'):
        title = 'This month'
        break;

      case ('unimportant'):
        title = 'Normal'
        break;

      case ('noTags'):
        title = 'No tags'
        break;

      default:
        title = 'Bold'
    }

    return title
  }

  render() {
    const title = this.renameTitle(this.props.title)

    return (
      <div
        className="filter-active__item">
        <div className="filter-active__title">
          {title}
        </div>
        <Icon
          className="filter-active__icon"
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color="#8c9ea9"
          hoverColor="#282f34"
          onClick={this.handleDelete}/>
      </div>
    )
  }
}
