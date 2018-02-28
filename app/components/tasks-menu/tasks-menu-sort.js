import React, { Component } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'

import MenuBox from 'components/elements/menux-box/menu-box'
import MenuBoxGroupItems from 'components/elements/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/elements/menux-box/menu-box-item'
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class TasksMenuSort extends Component {

  static propTypes = {
    onToggleSortAlgorithm: PropTypes.func,
    visibleMenuSort: PropTypes.func,
    hideMenuFilter: PropTypes.func,
    hideMenuSort: PropTypes.func,
    hideMenuOption: PropTypes.func,
    tasksMenu: PropTypes.object,
  }

  componentDidMount() {
    velocity(this.refs.sort, 'transition.fadeIn', { duration: 600, display: 'flex' })
  }

  handleClick = () => {
    if (this.props.tasksMenu.sort.menu.isVisible) {
      this.props.hideMenuSort()
      return
    }

    if (this.props.tasksMenu.filters.menu.isVisible) {
      this.props.hideMenuFilter()
    }

    if (this.props.tasksMenu.options.menu.isVisible) {
      this.props.hideMenuOption()
    }

    this.props.visibleMenuSort()
  }

  handleSortAlgorithmToggle = algorithm => {
    this.props.onToggleSortAlgorithm(algorithm)
  }

  getActiveIcon() {
    const { dueDate, alphabet, important, incomplete } = this.props.tasksMenu.sort

    if (dueDate) {
      return ICONS.SORT_DUE_DATE
    }

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

  render() {
    const { defaultSort, dueDate, alphabet, important, incomplete, menu } = this.props.tasksMenu.sort
    const icon = this.getActiveIcon()

    return (
      <div
        ref="sort"
        className="tasks-menu__item"
        onClick={this.handleClick} >
        <Icon
          icon={icon}
          width={24}
          height={24}
          color="#282f34" />
        {menu.isVisible &&
        <MenuBox
          className="tasks-menu-box"
          animation="transition.fadeIn"
          menuIcon={this.refs.sort}
          clickOutsideMenu={this.handleClick}>
          <MenuBoxGroupItems>
            <MenuBoxItem
              active={defaultSort}
              type="defaultSort"
              icon={ICONS.SORT_DEFAULT}
              iconScale={0.66}
              onChange={this.handleSortAlgorithmToggle} />
            <MenuBoxItem
              title="Default user sorting"
              type="defaultSort"
              active={defaultSort}
              onChange={this.handleSortAlgorithmToggle} />
            </MenuBoxGroupItems>
          <MenuBoxGroupItems>
            <MenuBoxItem
              active={dueDate}
              type="dueDate"
              icon={ICONS.CALENDAR}
              iconScale={1.14}
              onChange={this.handleSortAlgorithmToggle} />
            <MenuBoxItem
              title="Sort by Due Date"
              type="dueDate"
              active={dueDate}
              onChange={this.handleSortAlgorithmToggle} />
          </MenuBoxGroupItems>
          <MenuBoxGroupItems>
            <MenuBoxItem
              active={alphabet}
              type="alphabet"
              icon={ICONS.ALPHABET}
              iconWidth={1.14}
              onChange={this.handleSortAlgorithmToggle} />
            <MenuBoxItem
              title="Sort alphabetically"
              type="alphabet"
              active={alphabet}
              onChange={this.handleSortAlgorithmToggle} />
          </MenuBoxGroupItems>
          <MenuBoxGroupItems>
            <MenuBoxItem
              active={important}
              type="important"
              icon={ICONS.BOLD}
              iconScale={1.33}
              onChange={this.handleSortAlgorithmToggle} />
            <MenuBoxItem
              title="Sort by Bold"
              type="important"
              active={important}
              onChange={this.handleSortAlgorithmToggle} />
          </MenuBoxGroupItems>
          <MenuBoxGroupItems>
            <MenuBoxItem
              active={incomplete}
              type="incomplete"
              icon={ICONS.TASK_CHECKED}
              iconScale={0.73}
              onChange={this.handleSortAlgorithmToggle} />
            <MenuBoxItem
              title="Sort incompleted"
              type="incomplete"
              active={incomplete}
              onChange={this.handleSortAlgorithmToggle} />
          </MenuBoxGroupItems>
        </MenuBox>}
      </div>
    )
  }
}
