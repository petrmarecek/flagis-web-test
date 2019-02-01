import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import domUtils from 'redux/utils/dom'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
} from './styles'

const OFFSET = 50

export default class TasksMenuOptions extends PureComponent {
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
    velocity(this.refs.options, 'transition.fadeIn', {
      duration: 600,
      display: 'flex',
    })
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

  getCenterIconPosition = () => {
    const { options } = this.refs
    const position = domUtils.getOffset(options)
    return window.innerWidth - position.left - OFFSET
  }

  render() {
    const isVisibleArchivedTasks = this.props.isVisibleArchivedTasks
    const { menu } = this.props.tasksMenu.options
    const iconColor = menu.isVisible ? '#282f34' : '#B1B5B8'

    return (
      <div
        ref="options"
        className="tasks-menu__item"
        onClick={this.handleClick}
      >
        <Icon
          icon={ICONS.OPTIONS}
          width={7}
          height={25}
          scale={1.08}
          color={[iconColor]}
          hoverColor={['#282f34']}
        />
        {menu.isVisible && (
          <MenuBoxContainer
            animation="transition.fadeIn"
            menuIcon={this.refs.options}
            clickOutsideMenu={this.handleClick}
            trianglePosition={this.getCenterIconPosition}
          >
            <MenuBoxGroup>
              <MenuBoxItemIcon
                icon={ICONS.SELECT}
                iconScale={1.06}
                onChange={this.props.onSelectAllTasks}
              />
              <MenuBoxItemTitle
                title="Select all tasks"
                onChange={this.props.onSelectAllTasks}
              />
            </MenuBoxGroup>
            {!isVisibleArchivedTasks && (
              <MenuBoxGroup>
                <MenuBoxItemIcon
                  icon={ICONS.ARCHIVE}
                  iconScale={0.59}
                  onChange={this.props.onArchiveCompletedTasks}
                />
                <MenuBoxItemTitle
                  title="Archive completed tasks"
                  onChange={this.props.onArchiveCompletedTasks}
                />
              </MenuBoxGroup>
            )}
          </MenuBoxContainer>
        )}
      </div>
    )
  }
}
