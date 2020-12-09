import React, { useRef, memo } from 'react'
import PropTypes from 'prop-types'
import constants from 'utils/constants'
import domUtils from 'redux/utils/dom'

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
import { colors } from '../styled-components-mixins/colors'

const TasksMenuOptions = props => {
  const { filters, sort, options } = props.tasksMenu
  const optionsRef = useRef()

  // get menu triangle icon position
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(optionsRef.current)
    const left = position ? position.left : 0
    return window.innerWidth - left - constants.TASKS_MENU_ICON_OFFSET
  }

  // get main icon properties
  const iconColor = options.menu.isVisible
    ? colors.aztec
    : colors.astrocopusGrey

  // handlers
  const onHandleClick = () => {
    if (options.menu.isVisible) {
      props.hideMenuOption()
      return
    }

    if (filters.menu.isVisible) {
      props.hideMenuFilter()
    }

    if (sort.menu.isVisible) {
      props.hideMenuSort()
    }

    props.visibleMenuOption()
  }
  const onHandleArchiveCompletedTasks = () => props.onArchiveCompletedTasks()
  const onHandleSelectAllTasks = () => props.onSelectAllTasks()

  return (
    <TasksMenuItem ref={optionsRef} onClick={onHandleClick}>
      <IconWrapper
        iconColor={iconColor}
        hoverIconColor="#293034"
        title="More options"
      >
        <Icon icon={ICONS.OPTIONS} width={6} height={20} scale={0.86} />
      </IconWrapper>
      {options.menu.isVisible && (
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
          {!props.isVisibleArchivedTasks && (
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
  isVisibleArchivedTasks: PropTypes.bool,
  onArchiveCompletedTasks: PropTypes.func,
  onSelectAllTasks: PropTypes.func,
  visibleMenuOption: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default memo(TasksMenuOptions)
