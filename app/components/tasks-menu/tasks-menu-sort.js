import React, { useRef, memo } from 'react'
import PropTypes from 'prop-types'
import domUtils from 'redux/utils/dom'
import constants from 'utils/constants'

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
import { colors } from 'components/styled-components-mixins/colors'

const TasksMenuSort = props => {
  const { filters, sort, options } = props.tasksMenu
  const sortRef = useRef()

  // get menu triangle icon position
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(sortRef.current)
    return window.innerWidth - position.left - constants.TASKS_MENU_ICON_OFFSET
  }

  // get main icon properties
  const getActiveIcon = () => {
    if (sort.alphabet) {
      return ICONS.SORT_ALPHABET
    }

    if (sort.incomplete) {
      return ICONS.SORT_INCOMPLETE
    }

    if (sort.dueDate) {
      return ICONS.SORT_DUE_DATE
    }

    if (sort.important) {
      return ICONS.SORT_IMPORTANT
    }

    return ICONS.SORT_DEFAULT
  }
  const iconColor =
    !sort.defaultSort || sort.menu.isVisible
      ? colors.aztec
      : colors.astrocopusGrey

  // handlers
  const onHandleClick = () => {
    if (sort.menu.isVisible) {
      props.hideMenuSort()
      return
    }

    if (filters.menu.isVisible) {
      props.hideMenuFilter()
    }

    if (options.menu.isVisible) {
      props.hideMenuOption()
    }

    props.visibleMenuSort()
  }

  const onHandleSortAlgorithmToggle = algorithm => {
    props.onToggleSortAlgorithm(algorithm)
  }

  return (
    <TasksMenuItem ref={sortRef} onClick={onHandleClick}>
      <IconWrapper
        iconColor={iconColor}
        hoverIconColor={colors.aztec}
        title="Sorting"
      >
        <Icon icon={getActiveIcon()} width={20} height={20} scale={0.83} />
      </IconWrapper>
      {sort.menu.isVisible && (
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={sortRef.current}
          clickOutsideMenu={onHandleClick}
          trianglePosition={getCenterIconPosition}
        >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={sort.alphabet}
              type="alphabet"
              icon={ICONS.ALPHABET}
              iconWidth={1.14}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
            <MenuBoxItemTitle
              title="Sort alphabetically"
              type="alphabet"
              active={sort.alphabet}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={sort.incomplete}
              type="incomplete"
              icon={ICONS.TASK_UNCOMPLETED}
              iconScale={0.72}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
            <MenuBoxItemTitle
              title="Sort incompleted"
              type="incomplete"
              active={sort.incomplete}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={sort.dueDate}
              type="dueDate"
              icon={ICONS.DUE_DATE}
              iconScale={1.33}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
            <MenuBoxItemTitle
              title="Sort by Due date"
              type="dueDate"
              active={sort.dueDate}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={sort.important}
              type="important"
              icon={ICONS.IMPORTANT}
              iconScale={0.24}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
            <MenuBoxItemTitle
              title="Sort by Importance"
              type="important"
              active={sort.important}
              onChange={onHandleSortAlgorithmToggle}
              canClickAgain
            />
          </MenuBoxGroup>
        </MenuBoxContainer>
      )}
    </TasksMenuItem>
  )
}

TasksMenuSort.propTypes = {
  tasksMenu: PropTypes.object,
  onToggleSortAlgorithm: PropTypes.func,
  visibleMenuSort: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default memo(TasksMenuSort)
