import React from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import { compose, withHandlers, lifecycle } from 'recompose'

import MenuBox from 'components/menux-box/menu-box'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import { TasksMenuItem } from './styles'

const TasksMenuSort = ({ tasksMenu, onHandleClick, onHandleSortAlgorithmToggle  }) => {

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
      innerRef={comp => {this.sort = comp}}
      onClick={onHandleClick} >
      <Icon
        icon={icon}
        width={24}
        height={24}
        color={[iconColor]}
        hoverColor={["#282f34"]} />
      {menu.isVisible &&
      <MenuBox
        animation="transition.fadeIn"
        menuIcon={this.sort}
        clickOutsideMenu={onHandleClick}>
        <MenuBoxGroupItems>
          <MenuBoxItem
            active={defaultSort}
            type="defaultSort"
            icon={ICONS.SORT_DEFAULT}
            iconScale={0.66}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItem
            title="Default user sorting"
            type="defaultSort"
            active={defaultSort}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroupItems>
        <MenuBoxGroupItems>
          <MenuBoxItem
            active={alphabet}
            type="alphabet"
            icon={ICONS.ALPHABET}
            iconWidth={1.14}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItem
            title="Sort alphabetically"
            type="alphabet"
            active={alphabet}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroupItems>
        <MenuBoxGroupItems>
          <MenuBoxItem
            active={important}
            type="important"
            icon={ICONS.BOLD}
            iconScale={1.33}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItem
            title="Sort by Bold"
            type="important"
            active={important}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroupItems>
        <MenuBoxGroupItems>
          <MenuBoxItem
            active={incomplete}
            type="incomplete"
            icon={ICONS.TASK_CHECKED}
            iconScale={0.73}
            onChange={onHandleSortAlgorithmToggle} />
          <MenuBoxItem
            title="Sort incompleted"
            type="incomplete"
            active={incomplete}
            onChange={onHandleSortAlgorithmToggle} />
        </MenuBoxGroupItems>
      </MenuBox>}
    </TasksMenuItem>
  )
}

TasksMenuSort.propTypes = {
  tasksMenu: PropTypes.object,
  onHandleClick: PropTypes.func,
  onHandleSortAlgorithmToggle: PropTypes.func,
  onToggleSortAlgorithm: PropTypes.func,
  visibleMenuSort: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClick: props => () => {
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
    onHandleSortAlgorithmToggle: props => algorithm => {
      props.onToggleSortAlgorithm(algorithm)
    }
  }),
  lifecycle({
    componentDidMount() {
      const sort = document.getElementById('tasksMenuItemSort')
      velocity(sort, 'transition.fadeIn', { duration: 600, display: 'flex' })
    }
  })
)(TasksMenuSort)
