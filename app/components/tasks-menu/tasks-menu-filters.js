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

export default class TasksMenuFilters extends PureComponent {

  static propTypes = {
    onChangeRangeFilter: PropTypes.func,
    onToggleImportantFilter: PropTypes.func,
    onToggleUnimportantFilter: PropTypes.func,
    onToggleNoTagsFilter: PropTypes.func,
    visibleMenuFilter: PropTypes.func,
    hideMenuFilter: PropTypes.func,
    hideMenuSort: PropTypes.func,
    hideMenuOption: PropTypes.func,
    tasksMenu: PropTypes.object,
  }

  componentDidMount() {
    velocity(this.refs.filters, 'transition.fadeIn', { duration: 600, display: 'flex' })
  }

  handleRangeFilterChange(value) {
    this.props.onChangeRangeFilter(value)
  }

  handleClick = () => {
    if (this.props.tasksMenu.filters.menu.isVisible) {
      this.props.hideMenuFilter()
      return
    }

    if (this.props.tasksMenu.sort.menu.isVisible) {
      this.props.hideMenuSort()
    }

    if (this.props.tasksMenu.options.menu.isVisible) {
      this.props.hideMenuOption()
    }

    this.props.visibleMenuFilter()
  }

  getCenterIconPosition = () => {
    const { filters } = this.refs
    const position = domUtils.getOffset(filters)
    return window.innerWidth - position.left - OFFSET
  }

  render() {
    const { menu, active, range, important, unimportant, noTags } = this.props.tasksMenu.filters

    const iconColor = active.size !== 0 || menu.isVisible
      ? '#282f34'
      : '#8c9ea9'

    return (
      <div
        ref="filters"
        className="tasks-menu__item"
        onClick={this.handleClick} >
        <Icon
          icon={ICONS.FILTER}
          width={23}
          height={25}
          color={[iconColor]}
          hoverColor={["#282f34"]} />
        {menu.isVisible &&
        <MenuBoxContainer
          animation="transition.fadeIn"
          menuIcon={this.refs.filters}
          clickOutsideMenu={this.handleClick}
          trianglePosition={this.getCenterIconPosition} >
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={range === 'today' || range === 'week' || range === 'month'}
              icon={ICONS.CALENDAR}
              iconScale={1.14}
              onChange={() => this.handleRangeFilterChange('today')} />
            <MenuBoxItemTitle
              title="Today"
              active={range === 'today'}
              onChange={() => this.handleRangeFilterChange('today')} />
            <span>|</span>
            <MenuBoxItemTitle
              title="This week"
              active={range === 'week'}
              onChange={() => this.handleRangeFilterChange('week')} />
            <span>|</span>
            <MenuBoxItemTitle
              title="This month"
              active={range === 'month'}
              onChange={() => this.handleRangeFilterChange('month')} />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={important || unimportant}
              icon={ICONS.BOLD}
              iconScale={1.33}
              onChange={this.props.onToggleImportantFilter} />
            <MenuBoxItemTitle
              title="Bold"
              active={important}
              onChange={this.props.onToggleImportantFilter} />
            <span>|</span>
            <MenuBoxItemTitle
              title="Normal"
              active={unimportant}
              onChange={this.props.onToggleUnimportantFilter} />
          </MenuBoxGroup>
          <MenuBoxGroup>
            <MenuBoxItemIcon
              active={noTags}
              icon={ICONS.NO_TAGS}
              iconScale={1}
              onChange={this.props.onToggleNoTagsFilter} />
            <MenuBoxItemTitle
              title="No tags"
              active={noTags}
              onChange={this.props.onToggleNoTagsFilter} />
          </MenuBoxGroup>
        </MenuBoxContainer>}
      </div>
    )
  }
}
