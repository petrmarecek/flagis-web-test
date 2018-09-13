import React from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import domUtils from 'redux/utils/dom'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import {
  TasksMenuItem,
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
} from './styles'

const TasksMenuSort = ({ tasksMenu, sortRef, getSortRef, onHandleClick, onHandleSortAlgorithmToggle  }) => {
  const OFFSET = 50
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(sortRef)
    return window.innerWidth - position.left - OFFSET
  }

  const getActiveIcon = () => {
    const { alphabet, important, incomplete } = tasksMenu.sort

    if (alphabet) {
      return ICONS.SORT_ALPHABET
    }

    if (important) {
      return ICONS.SORT_BOLD
    }

    if (incomplete) {
      return ICONS.SORT_INCOMPLETE
    }

    return ICONS.SORT_DEFAULT
  }

  const { defaultSort, alphabet, important, incomplete, menu } = tasksMenu.sort
  const icon = getActiveIcon()
  const iconColor = !defaultSort || menu.isVisible
    ? '#282f34'
    : '#8c9ea9'

  return (
    <TasksMenuItem
      id='tasksMenuItemSort'
      innerRef={ref => { getSortRef(ref) }}
      onClick={onHandleClick} >
      <Icon
        icon={icon}
        width={24}
        height={24}
        color={[iconColor]}
        hoverColor={["#282f34"]} />
      {menu.isVisible &&
      <MenuBoxContainer
        animation="transition.fadeIn"
        menuIcon={sortRef}
        clickOutsideMenu={onHandleClick}
        trianglePosition={getCenterIconPosition} >
        <MenuBoxGroup>
          <MenuBoxItemIcon
            active={defaultSort}
            type="defaultSort"
            icon={ICONS.SORT_DEFAULT}
            iconScale={0.66}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItemTitle
            title="Default user sorting"
            type="defaultSort"
            active={defaultSort}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            active={alphabet}
            type="alphabet"
            icon={ICONS.ALPHABET}
            iconWidth={1.14}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItemTitle
            title="Sort alphabetically"
            type="alphabet"
            active={alphabet}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            active={important}
            type="important"
            icon={ICONS.BOLD}
            iconScale={1.33}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItemTitle
            title="Sort by Bold"
            type="important"
            active={important}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            active={incomplete}
            type="incomplete"
            icon={ICONS.TASK_CHECKED}
            iconScale={0.73}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItemTitle
            title="Sort incompleted"
            type="incomplete"
            active={incomplete}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroup>
      </MenuBoxContainer>}
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

export default compose(
  withStateHandlers(
    () => ({ sortRef: null }),
    {
      getSortRef: () => ref => ({ sortRef: ref }),
      onHandleClick: (state, props) => () => {
        if (props.tasksMenu.sort.menu.isVisible) {
          props.hideMenuSort()
          return ({})
        }

        if (props.tasksMenu.filters.menu.isVisible) {
          props.hideMenuFilter()
        }

        if (props.tasksMenu.options.menu.isVisible) {
          props.hideMenuOption()
        }

        props.visibleMenuSort()
        return ({})
      },
      onHandleSortAlgorithmToggle: (state, props) => algorithm => {
        props.onToggleSortAlgorithm(algorithm)
        return ({})
      }
    }
  ),
  lifecycle({
    componentDidMount() {
      const sort = document.getElementById('tasksMenuItemSort')
      velocity(sort, 'transition.fadeIn', { duration: 600, display: 'flex' })
    }
  })
)(TasksMenuSort)
