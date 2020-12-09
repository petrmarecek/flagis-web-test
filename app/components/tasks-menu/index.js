import React, { memo } from 'react'
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
  setCompleteTasks,
  setIncompleteTasks,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getTaskIds,
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

// components
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

const TasksMenuContainer = props => {
  const isFiltersAndSorting =
    !props.isVisibleArchivedTasks && !props.isMultiSelect
  const taskCount = props.isMultiSelect
    ? props.selectedTaskCount
    : props.taskIds.size

  const tasksMenuProps = {
    hideMenuFilter: props.hideMenuFilter,
    hideMenuSort: props.hideMenuSort,
    hideMenuOption: props.hideMenuOption,
    tasksMenu: props.tasksMenu,
  }

  // Multi Select
  const multiSelectProps = {
    auth: props.auth,
    activeTags: props.activeTags,
    deselectTasks: props.deselectTasks,
    isVisibleArchivedTasks: props.isVisibleArchivedTasks,
  }

  const handleSetIncompleteTasks = () => {
    props.setIncompleteTasks()
  }

  const handleSetCompleteTasks = () => {
    props.setCompleteTasks()
  }

  const handleAddRemoveTags = () => {
    props.showDialog('add-remove-tags', { tasks: props.selectedTasks })
  }

  const handleDelete = () => {
    if (props.selectedTaskCount === 0) {
      return
    }

    props.prepareDeleteTask(props.selectedTasks)
  }

  // Filters
  const handleToggleSenderFilter = () => {
    props.toggleSenderFilter()
  }

  const handleToggleAssigneeFilter = () => {
    props.toggleAssigneeFilter()
  }

  const handleRangeFilterChange = value => {
    props.changeRangeFilter(value)
  }

  const handleToggleImportantFilter = () => {
    props.toggleImportantFilter()
  }

  const handleToggleUnimportantFilter = () => {
    props.toggleUnimportantFilter()
  }

  const handleToggleCompletedFilter = () => {
    props.toggleCompletedFilter()
  }

  const handleToggleUncompletedFilter = () => {
    props.toggleUncompletedFilter()
  }

  const handleToggleNoIncomingFilter = () => {
    props.toggleNoIncomingFilter()
  }

  const handleToggleNoTagsFilter = () => {
    props.toggleNoTagsFilter()
  }

  const handleDeleteFilter = filter => {
    props.deleteFilter(filter)
  }

  // Sort
  const handleSortAlgorithmToggle = algorithm => {
    props.toggleSortAlgorithm(algorithm)
  }

  // Options
  const handleArchiveCompletedTasks = () => {
    const archive = archiveCompletedTasks(
      props.tasks,
      props.showCompletedTasks,
      props.completedTasks,
      props.archivedTasks,
      props.entitiesTasks,
      props.selectedTasks
    )

    props.setLoader(loaderTypes.GLOBAL)
    props.setArchiveTasks(
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

  const handleSelectAllTasks = () => {
    props.selectAllTask(OrderedSet(props.taskIds))
  }

  return (
    <TaskMenuWrapper>
      {props.isMultiSelect && (
        <TasksMenuMultiSelect
          {...multiSelectProps}
          onSetCompleteTasks={handleSetCompleteTasks}
          onSetIncompleteTasks={handleSetIncompleteTasks}
          onAddRemoveTags={handleAddRemoveTags}
          onDelete={handleDelete}
        />
      )}

      {isFiltersAndSorting && (
        <TasksMenuFiltersActive
          isFilterActive={props.tasksMenu.filters.active.size !== 0}
        >
          {props.tasksMenu.filters.active.map((filter, key) => {
            const filtersActiveItemProps = {
              key,
              title: filter,
              canAutocomplete: false,
              autocompleteItems: List(),
              autocompleteLocation: '',
              onDeselectAutocomplete: null,
            }

            if (filter === 'assignee') {
              filtersActiveItemProps.canAutocomplete = true
              filtersActiveItemProps.autocompleteItems = props.activeAssignee
              filtersActiveItemProps.autocompleteLocation =
                'tasksMenuFilterContactsAssignee'
              filtersActiveItemProps.onDeselectAutocomplete =
                props.deselectActiveAssignee
            }

            if (filter === 'sender') {
              filtersActiveItemProps.canAutocomplete = true
              filtersActiveItemProps.autocompleteItems = props.activeSender
              filtersActiveItemProps.autocompleteLocation =
                'tasksMenuFilterContactsSender'
              filtersActiveItemProps.onDeselectAutocomplete =
                props.deselectActiveSender
            }

            return (
              <TasksMenuFiltersActiveItem
                {...filtersActiveItemProps}
                onDelete={handleDeleteFilter}
              />
            )
          })}
        </TasksMenuFiltersActive>
      )}

      {isFiltersAndSorting && (
        <TasksMenuFilters
          {...tasksMenuProps}
          visibleMenuFilter={props.visibleMenuFilter}
          onToggleSenderFilter={handleToggleSenderFilter}
          onToggleAssigneeFilter={handleToggleAssigneeFilter}
          onChangeRangeFilter={handleRangeFilterChange}
          onToggleImportantFilter={handleToggleImportantFilter}
          onToggleUnimportantFilter={handleToggleUnimportantFilter}
          onToggleCompletedFilter={handleToggleCompletedFilter}
          onToggleUncompletedFilter={handleToggleUncompletedFilter}
          onToggleNoIncomingFilter={handleToggleNoIncomingFilter}
          onToggleNoTagsFilter={handleToggleNoTagsFilter}
        />
      )}

      {isFiltersAndSorting && (
        <TasksMenuSort
          {...tasksMenuProps}
          visibleMenuSort={props.visibleMenuSort}
          onToggleSortAlgorithm={handleSortAlgorithmToggle}
        />
      )}

      {!props.isMultiSelect && (
        <TasksMenuOptions
          {...tasksMenuProps}
          isVisibleArchivedTasks={props.isVisibleArchivedTasks}
          visibleMenuOption={props.visibleMenuOption}
          onArchiveCompletedTasks={handleArchiveCompletedTasks}
          onSelectAllTasks={handleSelectAllTasks}
        />
      )}

      {props.isVisibleArchivedTasks && (
        <TaskCountIndicator>
          <TaskCountIndicatorInner multiSelect={props.isMultiSelect}>
            {taskCount}
          </TaskCountIndicatorInner>
        </TaskCountIndicator>
      )}
    </TaskMenuWrapper>
  )
}

const mapStateToProps = state => ({
  tasks: getTasksItems(state),
  taskIds: getTaskIds(state),
  completedTasks: getCompletedTasksItems(state),
  showCompletedTasks: getCompletedTasksId(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  selectedTasks: getSelectionTasks(state),
  selectedTaskCount: getSelectionTasks(state).size,
  tasksMenu: getTasksMenu(state),
  activeSender: getTasksMenuFiltersActiveSender(state),
  activeAssignee: getTasksMenuFiltersActiveAssignee(state),
  isMultiSelect: getMultiSelectVisibility(state),
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
  setCompleteTasks,
  setIncompleteTasks,
}

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(TasksMenuContainer)
)
