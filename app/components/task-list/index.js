import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import R from 'ramda'
import { compose, branch, renderComponent, withStateHandlers } from 'recompose'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { getUserId } from 'redux/store/auth/auth.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import { selectActiveTags } from 'redux/store/tags/tags.actions'
import { getActiveTagsIds } from 'redux/store/tags/tags.selectors'
import { getTasksMenuSort } from 'redux/store/tasks-menu/tasks-menu.selectors'
import { computeOrder } from 'redux/utils/redux-helper'
import { setScrollbarPosition } from 'redux/store/app-state/app-state.actions'
import {
  getArchivedTasksVisibility,
  getLeftPanel,
  getWindow,
  getScrollbarPosition,
} from 'redux/store/app-state/app-state.selectors'
import {
  selectTask,
  requestToggleImportant,
  setComplete,
  setIncomplete,
  setOrder,
  moveTask,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
  acceptTask,
  rejectTask,
  removeTaskFollower,
  toggleDragAndDrop,
  setDraggingTask,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getTasks,
  getInboxTasks,
  getIsDragAndDropActive,
  getInboxTasksItems,
} from 'redux/store/tasks/tasks.selectors'
import {
  getSelectionInfo,
  setArchive,
  cancelArchive,
  getAssigneeOfTask,
} from 'redux/utils/component-helper'

// components
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import TaskList from './task-list'

// styles
import { EmptyList } from 'components/styled-components-mixins'
import { InboxTaskList, InboxCounter } from './styles'

const TaskListContainer = props => {
  const {
    // data
    userId,
    tasks,
    inboxTasks,
    inboxCount,
    selectedTags,
    selectedTasks,
    isVisibleArchivedTasks,
    sort,
    leftPanelWidth,
    windowWidth,
    scrollbarPosition,
    isDragAndDropActive,

    // handlers
    onInvokeMove,
    onDropTask,
    onHandleTaskSelect,
    onHandleToggleImportant,
    onHandleCompleteClick,
    onHandleTagClick,
    onHandleSetArchiveTasks,
    onHandleCancelArchiveTasks,
    onHandleAcceptTask,
    onHandleRejectTask,
    onHandleSetScrollbarPosition,
    onHandleToggleDragAndDrop,
    onHandleSetDraggingTask,
  } = props

  if (!tasks.isFetching && tasks.items.length === 0) {
    return <EmptyList>No tasks found</EmptyList>
  }

  const debouncedMoveTask = debounce(onInvokeMove, 10)
  const onMoveTask = useCallback(move => debouncedMoveTask(move), [])
  let offset = props.isVisibleArchivedTasks ? 108 : 192

  const scrollStyle = {
    height: `calc(100vh - ${offset}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(239, 239, 239, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(239, 239, 239, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar
      style={scrollStyle}
      position={scrollbarPosition}
      setPosition={onHandleSetScrollbarPosition}
    >
      <span onContextMenu={e => e.preventDefault()}>
        {!_.isEmpty(inboxTasks.items) && !isVisibleArchivedTasks && (
          <InboxTaskList>
            <InboxCounter>({inboxCount}) Incomming tasks</InboxCounter>
            <TaskList
              userId={userId}
              listType={inboxTasks.type}
              tasks={inboxTasks.items}
              selectedTags={selectedTags}
              selectedTasks={selectedTasks}
              sort={sort}
              isVisibleArchivedTasks={isVisibleArchivedTasks}
              leftPanelWidth={leftPanelWidth}
              windowWidth={windowWidth}
              moveTask={onMoveTask}
              dropTask={onDropTask}
              onTaskSelect={onHandleTaskSelect}
              onToggleImportant={onHandleToggleImportant}
              onCompleteClick={onHandleCompleteClick}
              onTagClick={onHandleTagClick}
              setArchiveTasks={onHandleSetArchiveTasks}
              cancelArchiveTasks={onHandleCancelArchiveTasks}
              acceptTask={onHandleAcceptTask}
              rejectTask={onHandleRejectTask}
              toggleDragAndDrop={onHandleToggleDragAndDrop}
              isDragAndDropActive={isDragAndDropActive}
              setDraggingTask={onHandleSetDraggingTask}
            />
          </InboxTaskList>
        )}
        <TaskList
          userId={userId}
          listType={tasks.type}
          tasks={tasks.items}
          selectedTags={selectedTags}
          selectedTasks={selectedTasks}
          sort={sort}
          isVisibleArchivedTasks={isVisibleArchivedTasks}
          leftPanelWidth={leftPanelWidth}
          windowWidth={windowWidth}
          moveTask={onMoveTask}
          dropTask={onDropTask}
          onTaskSelect={onHandleTaskSelect}
          onToggleImportant={onHandleToggleImportant}
          onCompleteClick={onHandleCompleteClick}
          onTagClick={onHandleTagClick}
          setArchiveTasks={onHandleSetArchiveTasks}
          cancelArchiveTasks={onHandleCancelArchiveTasks}
          acceptTask={onHandleAcceptTask}
          rejectTask={onHandleRejectTask}
          toggleDragAndDrop={onHandleToggleDragAndDrop}
          isDragAndDropActive={isDragAndDropActive}
          setDraggingTask={onHandleSetDraggingTask}
        />
      </span>
    </ShadowScrollbar>
  )
}

TaskListContainer.propTypes = {
  // data
  userId: PropTypes.string,
  tasks: PropTypes.object,
  inboxTasks: PropTypes.object,
  inboxCount: PropTypes.number,
  tasksId: PropTypes.object,
  completedTasks: PropTypes.object,
  archivedTasks: PropTypes.object,
  entitiesTasks: PropTypes.object,
  selectedTags: PropTypes.object,
  selectedTasks: PropTypes.object,
  isVisibleArchivedTasks: PropTypes.bool,
  isDragAndDropActive: PropTypes.bool,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,
  scrollbarPosition: PropTypes.number,

  // state
  dueDate: PropTypes.object,
  order: PropTypes.number,

  // handlers
  onInvokeMove: PropTypes.func,
  onDropTask: PropTypes.func,
  onHandleTaskSelect: PropTypes.func,
  onHandleToggleImportant: PropTypes.func,
  onHandleCompleteClick: PropTypes.func,
  onHandleTagClick: PropTypes.func,
  onHandleSetArchiveTasks: PropTypes.func,
  onHandleCancelArchiveTasks: PropTypes.func,
  onHandleAcceptTask: PropTypes.func,
  onHandleRejectTask: PropTypes.func,
  onHandleSetScrollbarPosition: PropTypes.func,
  onHandleToggleDragAndDrop: PropTypes.func,
  onHandleSetDraggingTask: PropTypes.func,

  // actions
  selectTask: PropTypes.func,
  setComplete: PropTypes.func,
  requestToggleImportant: PropTypes.func,
  setIncomplete: PropTypes.func,
  setOrder: PropTypes.func,
  moveTask: PropTypes.func,
  selectActiveTags: PropTypes.func,
  deselectTasks: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  acceptTask: PropTypes.func,
  rejectTask: PropTypes.func,
  removeTaskFollower: PropTypes.func,
  setScrollbarPosition: PropTypes.func,
  setDraggingTask: PropTypes.func,
}

const mapStateToProps = state => {
  const { type } = getTasks(state)
  const list = type === 'main' ? 'task' : type

  return {
    userId: getUserId(state),
    tasks: getTasks(state),
    inboxTasks: getInboxTasks(state),
    inboxCount: getInboxTasksItems(state).size,
    tasksId: getTasksItems(state),
    completedTasks: getCompletedTasksItems(state),
    archivedTasks: getArchivedTasksItems(state),
    entitiesTasks: getEntitiesTasks(state),
    selectedTasks: getSelectionTasks(state),
    selectedTags: getActiveTagsIds(state),
    sort: getTasksMenuSort(state),
    isVisibleArchivedTasks: getArchivedTasksVisibility(state),
    leftPanelWidth: getLeftPanel(state).width,
    windowWidth: getWindow(state).width,
    scrollbarPosition: getScrollbarPosition(state, list),
    isDragAndDropActive: getIsDragAndDropActive(state),
  }
}

const mapDispatchToProps = {
  selectTask,
  requestToggleImportant,
  setComplete,
  setIncomplete,
  setOrder,
  moveTask,
  selectActiveTags,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
  acceptTask,
  rejectTask,
  removeTaskFollower,
  setScrollbarPosition,
  toggleDragAndDrop,
  setDraggingTask,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => props.tasks.isFetching, renderComponent(Loader)),
  withStateHandlers(
    () => ({
      dueDate: null,
      order: null,
    }),
    {
      onInvokeMove: (state, props) => move => {
        const { sourceTaskId } = move
        const isActiveTags = props.selectedTags.size !== 0
        const tasks = props.tasks.items
        move = R.assoc('isActiveTags', isActiveTags, move)

        // default user sorting
        const order = computeOrder(tasks, move)
        if (!order) {
          return {}
        }

        props.moveTask(sourceTaskId, order)
        return { order }
      },
      onDropTask: (state, props) => drop => {
        const { dropTask } = drop
        const { order } = state

        // default user sorting
        props.setOrder(dropTask, order)
        return {}
      },
      onHandleTaskSelect: (state, props) => (task, event) => {
        const selectionInfo = getSelectionInfo(event, task, props.selectedTasks)

        props.selectTask(
          selectionInfo.newSelectedTasks,
          selectionInfo.isMultiSelection
        )
        return {}
      },
      onHandleToggleImportant: (state, props) => data =>
        props.requestToggleImportant(data),
      onHandleCompleteClick: (state, props) => task => {
        const { id, followers } = task
        const assignee = getAssigneeOfTask(followers)

        if (task.isCompleted) {
          props.setIncomplete(id)
          return {}
        }

        if (assignee !== null) {
          if (assignee.status === 'new') {
            props.removeTaskFollower(id, assignee.userId, assignee.id)
          }
        }

        props.setComplete(id)
        return {}
      },
      onHandleTagClick: (state, props) => tag => {
        props.deselectTasks()
        props.selectActiveTags([tag.id])
        return {}
      },
      onHandleSetArchiveTasks: (state, props) => taskId => {
        const tasks = props.tasksId
        const {
          completedTasks,
          archivedTasks,
          entitiesTasks,
          selectedTasks,
        } = props

        const archive = setArchive(
          taskId,
          tasks,
          completedTasks,
          archivedTasks,
          entitiesTasks,
          selectedTasks
        )

        props.setArchiveTasks(
          archive.newArchiveTasksList,
          archive.tasks,
          archive.completedTasks,
          archive.archivedTasks,
          archive.entitiesTasks,
          archive.selectedTasks
        )
        toast.success(toastCommon.successMessages.tasks.archive, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.SUCCESS_DURATION,
        })
        return {}
      },
      onHandleCancelArchiveTasks: (state, props) => taskId => {
        const tasks = props.tasksId
        const {
          completedTasks,
          archivedTasks,
          entitiesTasks,
          selectedTasks,
        } = props

        const nonArchive = cancelArchive(
          taskId,
          tasks,
          completedTasks,
          archivedTasks,
          entitiesTasks,
          selectedTasks
        )

        props.cancelArchiveTasks(
          nonArchive.newTasks,
          nonArchive.tasks,
          nonArchive.completedTasks,
          nonArchive.archivedTasks,
          nonArchive.entitiesTasks,
          nonArchive.selectedTasks
        )
        toast.success(toastCommon.successMessages.tasks.cancelArchive, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.SUCCESS_DURATION,
        })
        return {}
      },
      onHandleAcceptTask: (state, props) => data => {
        toast.success(toastCommon.successMessages.tasks.accepted, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.SUCCESS_DURATION,
        })
        props.acceptTask(data.taskId, data.followerId)
        return {}
      },
      onHandleRejectTask: (state, props) => data => {
        props.rejectTask(data)
        return {}
      },
      onHandleSetScrollbarPosition: (state, props) => position => {
        const { type } = props.tasks

        props.setScrollbarPosition(type === 'main' ? 'task' : type, position)
        return {}
      },
      onHandleToggleDragAndDrop: (state, props) => value => {
        props.toggleDragAndDrop(value)
        return {}
      },
      onHandleSetDraggingTask: (state, props) => task => {
        props.setDraggingTask(task)
        return {}
      },
    }
  )
)(TaskListContainer)
