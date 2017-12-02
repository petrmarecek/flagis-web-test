import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { OrderedSet } from 'immutable'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'

import {
  changeRangeFilter,
  toggleImportantFilter,
  toggleUnimportantFilter,
  toggleNoTagsFilter,
  deleteFilter,
  changeSearchText,
  toggleSortAlgorithm,
  visibleMenuFilter,
  hideMenuFilter,
  visibleMenuSort,
  hideMenuSort,
  visibleMenuOption,
  hideMenuOption,
} from '../../redux/store/tasks-menu/tasks-menu.action'
import {
  setArchiveTasks,
  deselectTasks,
  selectAllTask,
} from '../../redux/store/tasks/tasks.actions'
import { showDialog } from '../../redux/store/app-state/app-state.actions'
import {
  getTasksId,
  getCompletedTasksId,
} from './../../redux/store/tasks/tasks.selectors'
import { archiveCompletedTasks } from '../../redux/utils/component-helper'

import SearchBox from '../elements/search-box'
import TasksMenuFilters from './tasks-menu-filters'
import TasksMenuFiltersActive from './tasks-menu-filters-active'
import TasksMenuSort from './tasks-menu-sort'
import TasksMenuOptions from './tasks-menu-options'
import TasksMenuMultiSelect from './tasks-menu-multi-select'

class TasksMenuContainer extends Component {

  static propTypes = {
    tasksId: PropTypes.object,
    showTasksId: PropTypes.object,
    completedTasks: PropTypes.object,
    showCompletedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    changeRangeFilter: PropTypes.func,
    toggleImportantFilter: PropTypes.func,
    toggleUnimportantFilter: PropTypes.func,
    toggleNoTagsFilter: PropTypes.func,
    deleteFilter: PropTypes.func,
    changeSearchText: PropTypes.func,
    toggleSortAlgorithm: PropTypes.func,
    deselectTasks: PropTypes.func,
    setArchiveTasks: PropTypes.func,
    showDialog: PropTypes.func,
    selectTasks: PropTypes.object,
    selectTaskCount: PropTypes.number,
    tasksMenu: PropTypes.object,
    multiSelect: PropTypes.bool,
    activeTags: PropTypes.object,
    auth: PropTypes.object,
    isVisibleArchivedTasks: PropTypes.bool,
    visibleMenuFilter: PropTypes.func,
    hideMenuFilter: PropTypes.func,
    visibleMenuSort: PropTypes.func,
    hideMenuSort: PropTypes.func,
    visibleMenuOption: PropTypes.func,
    hideMenuOption: PropTypes.func,
    selectAllTask: PropTypes.func,
  }

  // Filters
  handleRangeFilterChange = value => {
    this.props.changeRangeFilter(value)
  }

  handleImportantFilterToggle = () => {
    this.props.toggleImportantFilter()
  }

  handleUnimportantFilterToggle = () => {
    this.props.toggleUnimportantFilter()
  }

  handleNoTagsFilterToggle = () => {
    this.props.toggleNoTagsFilter()
  }

  handleDeleteFilter = (filter) => {
    this.props.deleteFilter(filter)
  }

  handleSearchTextChange = value => {
    this.props.changeSearchText(value)
  }

  // Sort
  handleSortAlgorithmToggle = algorithm => {
    this.props.toggleSortAlgorithm(algorithm)
  }

  // Options
  handleArchiveCompletedTasks = () => {
    const tasks = this.props.tasksId
    const showCompletedTasks = this.props.showCompletedTasks
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectTasks

    const archive = archiveCompletedTasks(tasks, showCompletedTasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks)

    this.props.setArchiveTasks(
      archive.newArchiveTasksList,
      archive.tasks,
      archive.completedTasks,
      archive.archivedTasks,
      archive.entitiesTasks,
      archive.selectedTasks
    )
    NotificationManager.success('Completed tasks archived', 'Success', 3000)
  }

  handleSelectAllTasks = () => {
    const tasksId = OrderedSet(this.props.showTasksId)
    this.props.selectAllTask(tasksId)
  }

  // Multi Select
  handleAddRemoveTags = () => {
    this.props.showDialog('add-remove-tags', {tasks: this.props.selectTasks})
  }

  handleDelete = () => {
    if (this.props.selectTaskCount !== 0) {
      this.props.showDialog('task-delete-confirm', {tasks: this.props.selectTasks})
    }
  }

  render() {
    const isMultiSelect = this.props.multiSelect
    const isVisibleArchivedTasks = this.props.isVisibleArchivedTasks
    const activeFilters = this.props.tasksMenu.filters.active.map((filter, key) =>
      <TasksMenuFiltersActive
        key={key}
        title={filter}
        onDelete={this.handleDeleteFilter}/>)

    const taskCount = isMultiSelect
      ? this.props.selectTaskCount
      : this.props.showTasksId.size

    const taskCountCss = cx({
      'task-count-indicator__inner': true,
      'task-count-indicator__inner--multi-select': isMultiSelect,
    })

    return (
      <div
        className="tasks-menu">

        <SearchBox
          onChange={this.handleSearchTextChange}
          value={this.props.tasksMenu.filters.searchText} />

        {isMultiSelect &&
        <TasksMenuMultiSelect
          onAddRemoveTags={this.handleAddRemoveTags}
          onDelete={this.handleDelete}
          auth={this.props.auth}
          activeTags={this.props.activeTags}
          isVisibleArchivedTasks={isVisibleArchivedTasks}
          deselectTasks={this.props.deselectTasks}/>}

        {!isMultiSelect &&
        <div className="filter-active">
          {activeFilters}
        </div>}

        {!isVisibleArchivedTasks && !isMultiSelect &&
        <TasksMenuFilters
          onChangeRangeFilter={this.handleRangeFilterChange}
          onToggleImportantFilter={this.handleImportantFilterToggle}
          onToggleUnimportantFilter={this.handleUnimportantFilterToggle}
          onToggleNoTagsFilter={this.handleNoTagsFilterToggle}
          visibleMenuFilter={this.props.visibleMenuFilter}
          hideMenuFilter={this.props.hideMenuFilter}
          hideMenuSort={this.props.hideMenuSort}
          hideMenuOption={this.props.hideMenuOption}
          tasksMenu={this.props.tasksMenu} />}

        {!isVisibleArchivedTasks && !isMultiSelect &&
        <TasksMenuSort
          onToggleSortAlgorithm={this.handleSortAlgorithmToggle}
          visibleMenuSort={this.props.visibleMenuSort}
          hideMenuFilter={this.props.hideMenuFilter}
          hideMenuSort={this.props.hideMenuSort}
          hideMenuOption={this.props.hideMenuOption}
          tasksMenu={this.props.tasksMenu}/>}

        {!isMultiSelect &&
        <TasksMenuOptions
          onArchiveCompletedTasks={this.handleArchiveCompletedTasks}
          onSelectAllTasks={this.handleSelectAllTasks}
          visibleMenuOption={this.props.visibleMenuOption}
          hideMenuFilter={this.props.hideMenuFilter}
          hideMenuSort={this.props.hideMenuSort}
          hideMenuOption={this.props.hideMenuOption}
          tasksMenu={this.props.tasksMenu}
          isVisibleArchivedTasks={isVisibleArchivedTasks}/>}

        <span className="task-count-indicator">
          <span className={taskCountCss}>{taskCount}</span>
        </span>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasksId: state.tasks.items,
  showTasksId: getTasksId(state),
  completedTasks: state.tasks.completed,
  showCompletedTasks: getCompletedTasksId(state),
  archivedTasks: state.tasks.archived.items,
  entitiesTasks: state.entities.tasks,
  selectTasks: state.tasks.selection,
  selectTaskCount: state.tasks.selection.size,
  tasksMenu: state.tasksMenu,
  multiSelect: state.appState.multiSelect.isVisible,
  activeTags: state.tags.activeTags,
  auth: state.auth,
  isVisibleArchivedTasks: state.appState.archivedTasks.isVisible,
})
const mapDispatchToProps = {
  changeRangeFilter,
  toggleImportantFilter,
  toggleUnimportantFilter,
  toggleNoTagsFilter,
  deleteFilter,
  changeSearchText,
  toggleSortAlgorithm,
  showDialog,
  setArchiveTasks,
  deselectTasks,
  visibleMenuFilter,
  hideMenuFilter,
  visibleMenuSort,
  hideMenuSort,
  visibleMenuOption,
  hideMenuOption,
  selectAllTask,
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksMenuContainer)
