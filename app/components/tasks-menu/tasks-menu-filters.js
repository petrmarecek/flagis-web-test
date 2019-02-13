import React from 'react'
import PropTypes from 'prop-types'
import domUtils from 'redux/utils/dom'
import constants from 'utils/constants'
import { withStateHandlers } from 'recompose'

// component
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

const TasksMenuFilters = props => {
  const {
    tasksMenu,
    filterRef,
    getFilterRef,
    onHandleClick,
    onHandleToggleAssigneeFilter,
    onHandleRangeFilterChange,
    onHandleToggleImportantFilter,
    onHandleToggleUnimportantFilter,
    onHandleToggleNoTagsFilter,
  } = props

  const {
    menu,
    active,
    assignee,
    range,
    important,
    unimportant,
    noTags,
  } = tasksMenu.filters

  const iconColor = active.size !== 0 || menu.isVisible ? '#293034' : '#B1B5B8'
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(filterRef)
    return window.innerWidth - position.left - constants.TASKS_MENU_ICON_OFFSET
  }

  return (
    <TasksMenuItem innerRef={getFilterRef} onClick={onHandleClick}>
      <IconWrapper iconColor={iconColor} hoverIconColor="#293034">
        <Icon icon={ICONS.FILTER} width={19} height={20} scale={0.8} />
      </IconWrapper>
      {menu.isVisible && (
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={filterRef}
          clickOutsideMenu={onHandleClick}
          trianglePosition={getCenterIconPosition}
        >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={assignee}
              icon={ICONS.FOLLOWER_NEW}
              iconScale={0.66}
              onChange={onHandleToggleAssigneeFilter}
            />
            <MenuBoxItemTitle
              title="Sent to ..."
              active={assignee}
              onChange={onHandleToggleAssigneeFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={
                range === 'today' || range === 'week' || range === 'month'
              }
              icon={ICONS.CALENDAR}
              iconScale={1.14}
              onChange={() => onHandleRangeFilterChange('today')}
            />
            <MenuBoxItemTitle
              title="Today"
              active={range === 'today'}
              onChange={() => onHandleRangeFilterChange('today')}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="This week"
              active={range === 'week'}
              onChange={() => onHandleRangeFilterChange('week')}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="This month"
              active={range === 'month'}
              onChange={() => onHandleRangeFilterChange('month')}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={important || unimportant}
              icon={ICONS.BOLD}
              iconScale={1.33}
              onChange={onHandleToggleImportantFilter}
            />
            <MenuBoxItemTitle
              title="Bold"
              active={important}
              onChange={onHandleToggleImportantFilter}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="Normal"
              active={unimportant}
              onChange={onHandleToggleUnimportantFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={noTags}
              icon={ICONS.NO_TAGS}
              iconScale={1}
              onChange={onHandleToggleNoTagsFilter}
            />
            <MenuBoxItemTitle
              title="No tags"
              active={noTags}
              onChange={onHandleToggleNoTagsFilter}
            />
          </MenuBoxGroup>
        </MenuBoxContainer>
      )}
    </TasksMenuItem>
  )
}

TasksMenuFilters.propTypes = {
  tasksMenu: PropTypes.object,
  filterRef: PropTypes.object,
  getFilterRef: PropTypes.func,
  onHandleClick: PropTypes.func,
  onToggleAssigneeFilter: PropTypes.func,
  onHandleToggleAssigneeFilter: PropTypes.func,
  onChangeRangeFilter: PropTypes.func,
  onHandleRangeFilterChange: PropTypes.func,
  onToggleImportantFilter: PropTypes.func,
  onHandleToggleImportantFilter: PropTypes.func,
  onToggleUnimportantFilter: PropTypes.func,
  onHandleToggleUnimportantFilter: PropTypes.func,
  onToggleNoTagsFilter: PropTypes.func,
  onHandleToggleNoTagsFilter: PropTypes.func,
  visibleMenuFilter: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default withStateHandlers(() => ({ filterRef: null }), {
  getFilterRef: () => ref => ({ filterRef: ref }),
  onHandleClick: (state, props) => () => {
    const { filters, sort, options } = props.tasksMenu

    if (filters.menu.isVisible) {
      props.hideMenuFilter()
      return {}
    }

    if (sort.menu.isVisible) {
      props.hideMenuSort()
    }

    if (options.menu.isVisible) {
      props.hideMenuOption()
    }

    props.visibleMenuFilter()
    return {}
  },
  onHandleToggleAssigneeFilter: (state, props) => () => {
    props.onToggleAssigneeFilter()
    return {}
  },
  onHandleRangeFilterChange: (state, props) => value => {
    props.onChangeRangeFilter(value)
    return {}
  },
  onHandleToggleImportantFilter: (state, props) => () => {
    props.onToggleImportantFilter()
    return {}
  },
  onHandleToggleUnimportantFilter: (state, props) => () => {
    props.onToggleUnimportantFilter()
    return {}
  },
  onHandleToggleNoTagsFilter: (state, props) => () => {
    props.onToggleNoTagsFilter()
    return {}
  },
})(TasksMenuFilters)
