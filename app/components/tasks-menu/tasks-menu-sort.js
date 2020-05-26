import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import domUtils from 'redux/utils/dom'
import constants from 'utils/constants'
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
import { colors } from 'components/styled-components-mixins/colors'

const TasksMenuSort = (props) => {
  const {
    tasksMenu,
    onHandleClick,
    onHandleSortAlgorithmToggle,
  } = props

  const sortRef = useRef()

  const { defaultSort, alphabet, important, incomplete, menu } = tasksMenu.sort
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(sortRef.current)
    return window.innerWidth - position.left - constants.TASKS_MENU_ICON_OFFSET
  }

  const getActiveIcon = () => {
    if (alphabet) {
      return ICONS.SORT_ALPHABET
    }

    if (important) {
      return ICONS.SORT_IMPORTANT
    }

    if (incomplete) {
      return ICONS.SORT_INCOMPLETE
    }

    return ICONS.SORT_DEFAULT
  }

  const icon = getActiveIcon()
  const iconColor =
    !defaultSort || menu.isVisible ? colors.aztec : colors.astrocopusGrey

  return (
    <TasksMenuItem ref={sortRef} onClick={onHandleClick}>
      <IconWrapper iconColor={iconColor} hoverIconColor={colors.aztec}>
        <Icon icon={icon} width={20} height={20} scale={0.83} />
      </IconWrapper>
      {menu.isVisible && (
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={sortRef.current}
          clickOutsideMenu={onHandleClick}
          trianglePosition={getCenterIconPosition}
        >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={defaultSort}
              type="defaultSort"
              icon={ICONS.SORT_DEFAULT}
              iconScale={0.66}
              onChange={onHandleSortAlgorithmToggle}
            />
            <MenuBoxItemTitle
              title="Default user sorting"
              type="defaultSort"
              active={defaultSort}
              onChange={onHandleSortAlgorithmToggle}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={alphabet}
              type="alphabet"
              icon={ICONS.ALPHABET}
              iconWidth={1.14}
              onChange={onHandleSortAlgorithmToggle}
            />
            <MenuBoxItemTitle
              title="Sort alphabetically"
              type="alphabet"
              active={alphabet}
              onChange={onHandleSortAlgorithmToggle}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={important}
              type="important"
              icon={ICONS.IMPORTANT}
              iconScale={0.24}
              onChange={onHandleSortAlgorithmToggle}
            />
            <MenuBoxItemTitle
              title="Sort by Importance"
              type="important"
              active={important}
              onChange={onHandleSortAlgorithmToggle}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={incomplete}
              type="incomplete"
              icon={ICONS.TASK_UNCOMPLETED}
              iconScale={0.72}
              onChange={onHandleSortAlgorithmToggle}
            />
            <MenuBoxItemTitle
              title="Sort incompleted"
              type="incomplete"
              active={incomplete}
              onChange={onHandleSortAlgorithmToggle}
            />
          </MenuBoxGroup>
        </MenuBoxContainer>
      )}
    </TasksMenuItem>
  )
}

TasksMenuSort.propTypes = {
  tasksMenu: PropTypes.object,
  sortRef: PropTypes.object,
  getSortRef: PropTypes.func,
  onHandleClick: PropTypes.func,
  onHandleSortAlgorithmToggle: PropTypes.func,
  onToggleSortAlgorithm: PropTypes.func,
  visibleMenuSort: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default withHandlers({
  onHandleClick: (props) => () => {
    if (props.tasksMenu.sort.menu.isVisible) {
      props.hideMenuSort()
      return
    }

    if (props.tasksMenu.filters.menu.isVisible) {
      props.hideMenuFilter()
    }

    if (props.tasksMenu.options.menu.isVisible) {
      props.hideMenuOption()
    }

    props.visibleMenuSort()
  },
  onHandleSortAlgorithmToggle: (props) => (algorithm) => {
    props.onToggleSortAlgorithm(algorithm)
  },
})(TasksMenuSort)
