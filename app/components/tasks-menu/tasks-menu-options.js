import React, { Component } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'

import MenuBox from 'components/elements/menux-box/menu-box'
import MenuBoxGroupItems from 'components/elements/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/elements/menux-box/menu-box-item'
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class TasksMenuOptions extends Component {

  static propTypes = {
    onArchiveCompletedTasks: PropTypes.func,
    onSelectAllTasks: PropTypes.func,
    visibleMenuOption: PropTypes.func,
    hideMenuFilter: PropTypes.func,
    hideMenuSort: PropTypes.func,
    hideMenuOption: PropTypes.func,
    tasksMenu: PropTypes.object,
    isVisibleArchivedTasks: PropTypes.bool,
  }

  componentDidMount() {
    velocity(this.refs.options, 'transition.fadeIn', { duration: 600, display: 'flex' })
  }

  handleClick = () => {
    if (this.props.tasksMenu.options.menu.isVisible) {
      this.props.hideMenuOption()
      return
    }

    if (this.props.tasksMenu.filters.menu.isVisible) {
      this.props.hideMenuFilter()
    }

    if (this.props.tasksMenu.sort.menu.isVisible) {
      this.props.hideMenuSort()
    }

    this.props.visibleMenuOption()
  }

  render() {
    const isVisibleArchivedTasks = this.props.isVisibleArchivedTasks
    const { menu } = this.props.tasksMenu.options

    const iconColor = menu.isVisible
      ? '#282f34'
      : '#8c9ea9'

    return (
      <div
        ref="options"
        className="tasks-menu__item"
        onClick={this.handleClick} >
        <Icon
          icon={ICONS.OPTIONS}
          width={7}
          height={25}
          scale={1.08}
          color={iconColor}
          hoverColor="#282f34" />
        {menu.isVisible &&
        <MenuBox
          className="tasks-menu-box"
          animation="transition.fadeIn"
          menuIcon={this.refs.options}
          clickOutsideMenu={this.handleClick}>
          <MenuBoxGroupItems>
            <MenuBoxItem
              icon={ICONS.SELECT}
              iconScale={1.06}
              onChange={this.props.onSelectAllTasks} />
            <MenuBoxItem
              title="Select all tasks"
              onChange={this.props.onSelectAllTasks} />
          </MenuBoxGroupItems>
          {!isVisibleArchivedTasks &&
          <MenuBoxGroupItems>
            <MenuBoxItem
              icon={ICONS.ARCHIVE}
              iconScale={0.59}
              onChange={this.props.onArchiveCompletedTasks} />
            <MenuBoxItem
              title="Archive completed tasks"
              onChange={this.props.onArchiveCompletedTasks} />
          </MenuBoxGroupItems>}
        </MenuBox>}
      </div>
    )
  }
}
