import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OrderedSet, List } from 'immutable'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { getAuth } from 'redux/store/auth/auth.selectors'
import { showDialog, setLoader } from 'redux/store/app-state/app-state.actions'
import {
  getMultiSelectVisibility,
  getArchivedTasksVisibility,
} from 'redux/store/app-state/app-state.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import { getActiveTagsIds } from 'redux/store/tags/tags.selectors'
import {
  setArchiveTasks,
  deselectTasks,
  selectAllTask,
  prepareDeleteTask,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getTasksId,
  getCompletedTasksId,
} from 'redux/store/tasks/tasks.selectors'
import {
  toggleSenderFilter,
  toggleAssigneeFilter,
  changeRangeFilter,
  toggleImportantFilter,
  toggleUnimportantFilter,
  toggleCompletedFilter,
  toggleUncompletedFilter,
  toggleNoIncomingFilter,
  toggleNoTagsFilter,
  deleteFilter,
  toggleSortAlgorithm,
  visibleMenuFilter,
  hideMenuFilter,
  visibleMenuSort,
  hideMenuSort,
  visibleMenuOption,
  hideMenuOption,
  deselectActiveSender,
  deselectActiveAssignee,
} from 'redux/store/tasks-menu/tasks-menu.actions'
import {
  getTasksMenu,
  getTasksMenuFiltersActiveSender,
  getTasksMenuFiltersActiveAssignee,
} from 'redux/store/tasks-menu/tasks-menu.selectors'
import { archiveCompletedTasks } from 'redux/utils/component-helper'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

import TasksMenuFilters from 'components/tasks-menu/tasks-menu-filters'
import TasksMenuFiltersActiveItem from 'components/tasks-menu/tasks-menu-filters-active-item'
import TasksMenuSort from 'components/tasks-menu//tasks-menu-sort'
import TasksMenuOptions from 'components/tasks-menu//tasks-menu-options'
import TasksMenuMultiSelect from 'components/tasks-menu/tasks-menu-multi-select'

import {
  TaskMenuWrapper,
  TaskCountIndicator,
  TaskCountIndicatorInner,
  TasksMenuFiltersActive,
} from './styles'

class TasksMenuContainer extends PureComponent {
  static propTypes = {
    tasksId: PropTypes.object,
    showTasksId: PropTypes.object,
    completedTasks: PropTypes.object,
    showCompletedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    toggleSenderFilter: PropTypes.func,
    toggleAssigneeFilter: PropTypes.func,
    changeRangeFilter: PropTypes.func,
    toggleImportantFilter: PropTypes.func,
    toggleUnimportantFilter: PropTypes.func,
    toggleCompletedFilter: PropTypes.func,
    toggleUncompletedFilter: PropTypes.func,
    toggleNoIncomingFilter: PropTypes.func,
    toggleNoTagsFilter: PropTypes.func,
    deleteFilter: PropTypes.func,
    toggleSortAlgorithm: PropTypes.func,
    deselectTasks: PropTypes.func,
    setArchiveTasks: PropTypes.func,
    showDialog: PropTypes.func,
    setLoader: PropTypes.func,
    selectTasks: PropTypes.object,
    selectTaskCount: PropTypes.number,
    tasksMenu: PropTypes.object,
    activeSender: PropTypes.object,
    activeAssignee: PropTypes.object,
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
    deselectActiveSender: PropTypes.func,
    deselectActiveAssignee: PropTypes.func,
    prepareDeleteTask: PropTypes.func,
  }

  // Filters
  onHandleToggleSenderFilter = () => {
    this.props.toggleSenderFilter()
  }

  onHandleToggleAssigneeFilter = () => {
    this.props.toggleAssigneeFilter()
  }

  onHandleRangeFilterChange = value => {
    this.props.changeRangeFilter(value)
  }

  onHandleToggleImportantFilter = () => {
    this.props.toggleImportantFilter()
  }

  onHandleToggleUnimportantFilter = () => {
    this.props.toggleUnimportantFilter()
  }

  onHandleToggleCompletedFilter = () => {
    this.props.toggleCompletedFilter()
  }

  onHandleToggleUncompletedFilter = () => {
    this.props.toggleUncompletedFilter()
  }

  onHandleToggleNoIncomingFilter = () => {
    this.props.toggleNoIncomingFilter()
  }

  onHandleToggleNoTagsFilter = () => {
    this.props.toggleNoTagsFilter()
  }

  onHandleDeleteFilter = filter => {
    this.setState({ isMounted: false })
    this.props.deleteFilter(filter)
  }

  // Sort
  onHandleSortAlgorithmToggle = algorithm => {
    this.props.toggleSortAlgorithm(algorithm)
  }

  // Options
  onHandleArchiveCompletedTasks = () => {
    const tasks = this.props.tasksId
    const showCompletedTasks = this.props.showCompletedTasks
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectTasks

    const archive = archiveCompletedTasks(
      tasks,
      showCompletedTasks,
      completedTasks,
      archivedTasks,
      entitiesTasks,
      selectedTasks
    )

    this.props.setLoader(loaderTypes.GLOBAL)
    this.props.setArchiveTasks(
      archive.newArchiveTasksList,
      archive.tasks,
      archive.completedTasks,
      archive.archivedTasks,
      archive.entitiesTasks,
      archive.selectedTasks
    )
    toast.success(toastCommon.successMessages.multiSelect.archive, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })
  }

  onHandleSelectAllTasks = () => {
    const tasksId = OrderedSet(this.props.showTasksId)
    this.props.selectAllTask(tasksId)
  }

  // Multi Select
  onHandleAddRemoveTags = () => {
    this.props.showDialog('add-remove-tags', { tasks: this.props.selectTasks })
  }

  onHandleDelete = () => {
    if (this.props.selectTaskCount === 0) {
      return
    }

    this.props.prepareDeleteTask(this.props.selectTasks)
  }

  render() {
    const isMultiSelect = this.props.multiSelect
    const isVisibleArchivedTasks = this.props.isVisibleArchivedTasks
    const taskCount = isMultiSelect
      ? this.props.selectTaskCount
      : this.props.showTasksId.size

    return (
      <TaskMenuWrapper>
        {isMultiSelect && (
          <TasksMenuMultiSelect
            onAddRemoveTags={this.onHandleAddRemoveTags}
            onDelete={this.onHandleDelete}
            auth={this.props.auth}
            activeTags={this.props.activeTags}
            isVisibleArchivedTasks={isVisibleArchivedTasks}
            deselectTasks={this.props.deselectTasks}
          />
        )}

        {!isVisibleArchivedTasks && !isMultiSelect && (
          <TasksMenuFiltersActive
            isFilterActive={this.props.tasksMenu.filters.active.size !== 0}
          >
            {this.props.tasksMenu.filters.active.map((filter, key) => {
              const { props } = this
              let canAutocomplete = false
              let autocompleteItems = List()
              let onDeselectAutocomplete = null
              let autocompleteLocation = ''

              if (filter === 'assignee') {
                canAutocomplete = true
                autocompleteItems = props.activeAssignee
                onDeselectAutocomplete = props.deselectActiveAssignee
                autocompleteLocation = 'tasksMenuFilterContactsAssignee'
              }

              if (filter === 'sender') {
                canAutocomplete = true
                autocompleteItems = props.activeSender
                onDeselectAutocomplete = props.deselectActiveSender
                autocompleteLocation = 'tasksMenuFilterContactsSender'
              }

              return (
                <TasksMenuFiltersActiveItem
                  key={key}
                  title={filter}
                  canAutocomplete={canAutocomplete}
                  autocompleteItems={autocompleteItems}
                  autocompleteLocation={autocompleteLocation}
                  onDeselectAutocomplete={onDeselectAutocomplete}
                  onDelete={this.onHandleDeleteFilter}
                />
              )
            })}
          </TasksMenuFiltersActive>
        )}

        {!isVisibleArchivedTasks && !isMultiSelect && (
          <TasksMenuFilters
            onToggleSenderFilter={this.onHandleToggleSenderFilter}
            onToggleAssigneeFilter={this.onHandleToggleAssigneeFilter}
            onChangeRangeFilter={this.onHandleRangeFilterChange}
            onToggleImportantFilter={this.onHandleToggleImportantFilter}
            onToggleUnimportantFilter={this.onHandleToggleUnimportantFilter}
            onToggleCompletedFilter={this.onHandleToggleCompletedFilter}
            onToggleUncompletedFilter={this.onHandleToggleUncompletedFilter}
            onToggleNoIncomingFilter={this.onHandleToggleNoIncomingFilter}
            onToggleNoTagsFilter={this.onHandleToggleNoTagsFilter}
            visibleMenuFilter={this.props.visibleMenuFilter}
            hideMenuFilter={this.props.hideMenuFilter}
            hideMenuSort={this.props.hideMenuSort}
            hideMenuOption={this.props.hideMenuOption}
            tasksMenu={this.props.tasksMenu}
          />
        )}

        {!isVisibleArchivedTasks && !isMultiSelect && (
          <TasksMenuSort
            onToggleSortAlgorithm={this.onHandleSortAlgorithmToggle}
            visibleMenuSort={this.props.visibleMenuSort}
            hideMenuFilter={this.props.hideMenuFilter}
            hideMenuSort={this.props.hideMenuSort}
            hideMenuOption={this.props.hideMenuOption}
            tasksMenu={this.props.tasksMenu}
          />
        )}

        {!isMultiSelect && (
          <TasksMenuOptions
            onArchiveCompletedTasks={this.onHandleArchiveCompletedTasks}
            onSelectAllTasks={this.onHandleSelectAllTasks}
            visibleMenuOption={this.props.visibleMenuOption}
            hideMenuFilter={this.props.hideMenuFilter}
            hideMenuSort={this.props.hideMenuSort}
            hideMenuOption={this.props.hideMenuOption}
            tasksMenu={this.props.tasksMenu}
            isVisibleArchivedTasks={isVisibleArchivedTasks}
          />
        )}

        {isVisibleArchivedTasks && (
          <TaskCountIndicator>
            <TaskCountIndicatorInner multiSelect={isMultiSelect}>
              {taskCount}
            </TaskCountIndicatorInner>
          </TaskCountIndicator>
        )}
      </TaskMenuWrapper>
    )
  }
}

const mapStateToProps = state => ({
  tasksId: getTasksItems(state),
  showTasksId: getTasksId(state),
  completedTasks: getCompletedTasksItems(state),
  showCompletedTasks: getCompletedTasksId(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  selectTasks: getSelectionTasks(state),
  selectTaskCount: getSelectionTasks(state).size,
  tasksMenu: getTasksMenu(state),
  activeSender: getTasksMenuFiltersActiveSender(state),
  activeAssignee: getTasksMenuFiltersActiveAssignee(state),
  multiSelect: getMultiSelectVisibility(state),
  activeTags: getActiveTagsIds(state),
  auth: getAuth(state),
  isVisibleArchivedTasks: getArchivedTasksVisibility(state),
})
const mapDispatchToProps = {
  toggleSenderFilter,
  toggleAssigneeFilter,
  changeRangeFilter,
  toggleImportantFilter,
  toggleUnimportantFilter,
  toggleCompletedFilter,
  toggleUncompletedFilter,
  toggleNoIncomingFilter,
  toggleNoTagsFilter,
  deleteFilter,
  toggleSortAlgorithm,
  showDialog,
  setLoader,
  setArchiveTasks,
  deselectTasks,
  visibleMenuFilter,
  hideMenuFilter,
  visibleMenuSort,
  hideMenuSort,
  visibleMenuOption,
  hideMenuOption,
  selectAllTask,
  deselectActiveSender,
  deselectActiveAssignee,
  prepareDeleteTask,
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksMenuContainer)
