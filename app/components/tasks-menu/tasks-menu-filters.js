import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import domUtils from 'redux/utils/dom'
import constants from 'utils/constants'

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
import { colors } from '../styled-components-mixins/colors'

const TasksMenuFilters = props => {
  const { filters, sort, options } = props.tasksMenu
  const filterRef = useRef()

  // get menu triangle icon position
  const getCenterIconPosition = () => {
    const position = domUtils.getOffset(filterRef.current)
    const left = position ? position.left : 0
    return window.innerWidth - left - constants.TASKS_MENU_ICON_OFFSET
  }

  // get main icon properties
  const iconColor =
    filters.active.size !== 0 || filters.menu.isVisible
      ? colors.aztec
      : colors.astrocopusGrey

  // handlers
  const onHandleClick = () => {
    if (filters.menu.isVisible) {
      props.hideMenuFilter()
      return
    }

    if (sort.menu.isVisible) {
      props.hideMenuSort()
    }

    if (options.menu.isVisible) {
      props.hideMenuOption()
    }

    props.visibleMenuFilter()
  }

  const onHandleToggleSenderFilter = () => props.onToggleSenderFilter()
  const onHandleToggleAssigneeFilter = () => props.onToggleAssigneeFilter()
  const onHandleRangeFilterChange = value => props.onChangeRangeFilter(value)
  const onHandleToggleImportantFilter = () => props.onToggleImportantFilter()
  const onHandleToggleUnimportantFilter = () =>
    props.onToggleUnimportantFilter()
  const onHandleToggleCompletedFilter = () => props.onToggleCompletedFilter()
  const onHandleToggleUncompletedFilter = () =>
    props.onToggleUncompletedFilter()
  const onHandleToggleNoIncomingFilter = () => props.onToggleNoIncomingFilter()
  const onHandleToggleNoTagsFilter = () => props.onToggleNoTagsFilter()

  return (
    <TasksMenuItem ref={filterRef} onClick={onHandleClick}>
      <IconWrapper iconColor={iconColor} hoverIconColor={colors.aztec}>
        <Icon icon={ICONS.FILTER} width={19} height={20} scale={0.8} />
      </IconWrapper>
      {filters.menu.isVisible && (
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={filterRef.current}
          clickOutsideMenu={onHandleClick}
          trianglePosition={getCenterIconPosition}
        >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.assignee}
              icon={ICONS.FOLLOWER_NEW}
              iconScale={0.66}
              onChange={onHandleToggleAssigneeFilter}
            />
            <MenuBoxItemTitle
              title="Sent to ..."
              active={filters.assignee}
              onChange={onHandleToggleAssigneeFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.sender}
              icon={ICONS.FOLLOWER_NEW}
              iconScale={0.66}
              onChange={onHandleToggleSenderFilter}
            />
            <MenuBoxItemTitle
              title="Received from ..."
              active={filters.sender}
              onChange={onHandleToggleSenderFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={
                filters.range === 'today' ||
                filters.range === 'week' ||
                filters.range === 'month'
              }
              icon={ICONS.CALENDAR}
              iconScale={1.14}
              onChange={() => onHandleRangeFilterChange('today')}
            />
            <MenuBoxItemTitle
              title="Today"
              active={filters.range === 'today'}
              onChange={() => onHandleRangeFilterChange('today')}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="This week"
              active={filters.range === 'week'}
              onChange={() => onHandleRangeFilterChange('week')}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="This month"
              active={filters.range === 'month'}
              onChange={() => onHandleRangeFilterChange('month')}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.important || filters.unimportant}
              icon={ICONS.IMPORTANT}
              iconScale={0.24}
              onChange={onHandleToggleImportantFilter}
            />
            <MenuBoxItemTitle
              title="Important"
              active={filters.important}
              onChange={onHandleToggleImportantFilter}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="Normal"
              active={filters.unimportant}
              onChange={onHandleToggleUnimportantFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.completed || filters.uncompleted}
              icon={ICONS.TASK_COMPLETED}
              iconScale={0.66}
              onChange={onHandleToggleCompletedFilter}
            />
            <MenuBoxItemTitle
              title="Completed"
              active={filters.completed}
              onChange={onHandleToggleCompletedFilter}
            />
            <span>|</span>
            <MenuBoxItemTitle
              title="Uncompleted"
              active={filters.uncompleted}
              onChange={onHandleToggleUncompletedFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.noIncoming}
              icon={ICONS.NO_TAGS}
              iconScale={1}
              onChange={onHandleToggleNoIncomingFilter}
            />
            <MenuBoxItemTitle
              title="No incoming"
              active={filters.noIncoming}
              onChange={onHandleToggleNoIncomingFilter}
            />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={filters.noTags}
              icon={ICONS.NO_TAGS}
              iconScale={1}
              onChange={onHandleToggleNoTagsFilter}
            />
            <MenuBoxItemTitle
              title="No tags"
              active={filters.noTags}
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
  onToggleSenderFilter: PropTypes.func,
  onToggleAssigneeFilter: PropTypes.func,
  onChangeRangeFilter: PropTypes.func,
  onToggleImportantFilter: PropTypes.func,
  onToggleUnimportantFilter: PropTypes.func,
  onToggleCompletedFilter: PropTypes.func,
  onToggleUncompletedFilter: PropTypes.func,
  onToggleNoIncomingFilter: PropTypes.func,
  onToggleNoTagsFilter: PropTypes.func,
  visibleMenuFilter: PropTypes.func,
  hideMenuFilter: PropTypes.func,
  hideMenuSort: PropTypes.func,
  hideMenuOption: PropTypes.func,
}

export default TasksMenuFilters
