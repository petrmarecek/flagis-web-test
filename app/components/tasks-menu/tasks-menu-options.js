import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import constants from 'utils/constants'
import domUtils from 'redux/utils/dom'
import { withHandlers } from 'recompose'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import {
  TasksMenuItem,
  IconWrapper,
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
} from './styles'

const TasksMenuOptions = props => {
  const {
    tasksMenu,
    onHandleClick,
    onHandleArchiveCompletedTasks,
    onHandleSelectAllTasks,
    isVisibleArchivedTasks,
  } = props

  const optionsRef = useRef()

  const { menu } = tasksMenu.options
  const iconColor = menu.isVisible ? '#293034' : '#B1B5B8'
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(optionsRef.current)
    const left = position ? position.left : 0
    return window.innerWidth - left - constants.TASKS_MENU_ICON_OFFSET
  }

  return (
    <TasksMenuItem
      ref={optionsRef}
      onClick={onHandleClick}
    >
      <IconWrapper iconColor={iconColor} hoverIconColor="#293034">
        <Icon icon={ICONS.OPTIONS} width={6} height={20} scale={0.86} />
      </IconWrapper>
      {menu.isVisible && (
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={optionsRef.current}
          clickOutsideMenu={onHandleClick}
          trianglePosition={getCenterIconPosition}
        >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              icon={ICONS.SELECT}
              iconScale={1.06}
              onChange={onHandleSelectAllTasks}
            />
            <MenuBoxItemTitle
              title="Select all tasks"
              onChange={onHandleSelectAllTasks}
            />
          </MenuBoxGroup>
          {!isVisibleArchivedTasks && (
            <MenuBoxGroup>
              <MenuBoxItemIcon
                icon={ICONS.ARCHIVE}
                iconScale={0.59}
                onChange={onHandleArchiveCompletedTasks}
              />
              <MenuBoxItemTitle
                title="Archive completed tasks"
                onChange={onHandleArchiveCompletedTasks}
              />
            </MenuBoxGroup>
          )}
        </MenuBoxContainer>
      )}
    </TasksMenuItem>
  )
}

TasksMenuOptions.propTypes = {
  tasksMenu: PropTypes.object,
  optionsRef: PropTypes.object,
  isVisibleArchivedTasks: PropTypes.bool,
  getOptionsRef: PropTypes.func,
  onHandleClick: PropTypes.func,
  onArchiveCompletedTasks: PropTypes.func,
  onHandleArchiveCompletedTasks: PropTypes.func,
  onSelectAllTasks: PropTypes.func,
  onHandleSelectAllTasks: PropTypes.func,
  visibleMenuOption: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default withHandlers({
  onHandleClick: (props) => () => {
    if (props.tasksMenu.options.menu.isVisible) {
      props.hideMenuOption()
      return
    }

    if (props.tasksMenu.filters.menu.isVisible) {
      props.hideMenuFilter()
    }

    if (props.tasksMenu.sort.menu.isVisible) {
      props.hideMenuSort()
    }

    props.visibleMenuOption()
  },
  onHandleArchiveCompletedTasks: (props) => () => props.onArchiveCompletedTasks(),
  onHandleSelectAllTasks: (props) => () => props.onSelectAllTasks(),
})(TasksMenuOptions)
