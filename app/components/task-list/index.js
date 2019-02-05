import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import debounce from 'lodash/debounce'
import R from 'ramda'
import constants from 'utils/constants'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import { compose, branch, renderComponent, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { getNewRefreshToken, getUserId } from 'redux/store/auth/auth.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import { selectActiveTags } from 'redux/store/tags/tags.actions'
import { getActiveTagsIds } from 'redux/store/tags/tags.selectors'
import { getTasksMenuSort } from 'redux/store/tasks-menu/tasks-menu.selectors'
import { computeOrder, computeTimeLine } from 'redux/utils/redux-helper'
import {
  getArchivedTasksVisibility,
  getInboxTasksVisibility,
  getLeftPanel,
  getWindow,
} from 'redux/store/app-state/app-state.selectors'
import {
  selectTask,
  setComplete,
  setIncomplete,
  setOrder,
  setOrderTimeLine,
  moveTask,
  moveTimeLineTask,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
  acceptTask,
  rejectTask,
  removeTaskFollower,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getTimeLine,
  getSelectionTasks,
  getTasks,
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

const TaskListContainer = props => {
  const {
    // data
    userId,
    tasks,
    selectedTags,
    selectedTasks,
    isVisibleArchivedTasks,
    isVisibleInbox,
    timeLine,
    sort,
    leftPanelWidth,
    windowWidth,

    // handlers
    onInvokeMove,
    onDropTask,
    onHandleTaskSelect,
    onHandleCompleteClick,
    onHandleTagClick,
    onHandleSetArchiveTasks,
    onHandleCancelArchiveTasks,
    onHandleAcceptTask,
    onHandleRejectTask,
  } = props

  if (!tasks.isFetching && tasks.items.length === 0 && !timeLine) {
    return <EmptyList>No tasks found</EmptyList>
  }

  const debouncedMoveTask = debounce(onInvokeMove, 10)
  const onMoveTask = move => debouncedMoveTask(move)
  let offset = props.isVisibleArchivedTasks ? 162 : 202

  if (isVisibleInbox) {
    offset = 20
  }

  const scrollStyle = {
    height: `calc(100vh - ${offset}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(239, 239, 239, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(239, 239, 239, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <TaskList
        userId={userId}
        listType={tasks.type}
        tasks={tasks.items}
        selectedTags={selectedTags}
        selectedTasks={selectedTasks}
        timeLine={timeLine}
        sort={sort}
        isVisibleArchivedTasks={isVisibleArchivedTasks}
        leftPanelWidth={leftPanelWidth}
        windowWidth={windowWidth}
        moveTask={onMoveTask}
        dropTask={onDropTask}
        onTaskSelect={onHandleTaskSelect}
        onCompleteClick={onHandleCompleteClick}
        onTagClick={onHandleTagClick}
        setArchiveTasks={onHandleSetArchiveTasks}
        cancelArchiveTasks={onHandleCancelArchiveTasks}
        acceptTask={onHandleAcceptTask}
        rejectTask={onHandleRejectTask}
      />
    </ShadowScrollbar>
  )
}

TaskListContainer.propTypes = {
  // data
  userId: PropTypes.string,
  tasks: PropTypes.object,
  isNewRefreshToken: PropTypes.bool,
  tasksId: PropTypes.object,
  completedTasks: PropTypes.object,
  archivedTasks: PropTypes.object,
  entitiesTasks: PropTypes.object,
  selectedTags: PropTypes.object,
  selectedTasks: PropTypes.object,
  isVisibleArchivedTasks: PropTypes.bool,
  isVisibleInbox: PropTypes.bool,
  timeLine: PropTypes.bool,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,

  // state
  dueDate: PropTypes.object,
  order: PropTypes.number,
  orderTimeLine: PropTypes.number,

  // handlers
  onInvokeMove: PropTypes.func,
  onDropTask: PropTypes.func,
  onHandleTaskSelect: PropTypes.func,
  onHandleCompleteClick: PropTypes.func,
  onHandleTagClick: PropTypes.func,
  onHandleSetArchiveTasks: PropTypes.func,
  onHandleCancelArchiveTasks: PropTypes.func,
  onHandleAcceptTask: PropTypes.func,
  onHandleRejectTask: PropTypes.func,

  // actions
  selectTask: PropTypes.func,
  setComplete: PropTypes.func,
  setIncomplete: PropTypes.func,
  setOrder: PropTypes.func,
  setOrderTimeLine: PropTypes.func,
  moveTask: PropTypes.func,
  moveTimeLineTask: PropTypes.func,
  selectActiveTags: PropTypes.func,
  deselectTasks: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  acceptTask: PropTypes.func,
  rejectTask: PropTypes.func,
  removeTaskFollower: PropTypes.func,
}

const mapStateToProps = state => ({
  userId: getUserId(state),
  tasks: getTasks(state),
  isNewRefreshToken: getNewRefreshToken(state),
  tasksId: getTasksItems(state),
  completedTasks: getCompletedTasksItems(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  selectedTasks: getSelectionTasks(state),
  selectedTags: getActiveTagsIds(state),
  timeLine: getTimeLine(state),
  sort: getTasksMenuSort(state),
  isVisibleArchivedTasks: getArchivedTasksVisibility(state),
  isVisibleInbox: getInboxTasksVisibility(state),
  leftPanelWidth: getLeftPanel(state).width,
  windowWidth: getWindow(state).width,
})

const mapDispatchToProps = {
  selectTask,
  setComplete,
  setIncomplete,
  setOrder,
  setOrderTimeLine,
  moveTask,
  moveTimeLineTask,
  selectActiveTags,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
  acceptTask,
  rejectTask,
  removeTaskFollower,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(
    props => props.isNewRefreshToken || props.tasks.isFetching,
    renderComponent(Loader)
  ),
  withStateHandlers(
    () => ({
      dueDate: null,
      orderTimeLine: null,
      order: null,
    }),
    {
      onInvokeMove: (state, props) => move => {
        const { sourceTaskId, targetSection } = move
        const isActiveTags = props.selectedTags.size !== 0
        const tasks = props.tasks.items
        move = R.assoc('isActiveTags', isActiveTags, move)

        // sort by Due Date
        if (targetSection) {
          // no task for this week
          if (targetSection === 'weekTasks') {
            const now = moment()
            const dayOfWeek = now.isoWeekday()

            if (dayOfWeek >= 6) {
              return {}
            }
          }

          // no task for this month
          if (targetSection === 'monthTasks') {
            const now = moment()
            const date = now.date()
            const dayOfMonth = now.daysInMonth()
            const diff = dayOfMonth - date
            if (diff <= 1) {
              return {}
            }

            const dayOfWeek = now.isoWeekday()
            const dayToNewWeek = 7 - dayOfWeek + 1
            const add = date + dayToNewWeek
            if (add > dayOfMonth) {
              return {}
            }
          }

          const timeLine = computeTimeLine(tasks, move)
          if (!timeLine) {
            return {}
          }

          // move to the otherTasks section and previous and next task has null due date
          if (targetSection === 'noDueDateTasks') {
            // set null due date
            props.moveTimeLineTask(sourceTaskId, null, timeLine.orderTimeLine)
            return {}
          }

          props.moveTimeLineTask(
            sourceTaskId,
            timeLine.dueDate,
            timeLine.orderTimeLine
          )

          return {
            dueDate: timeLine.dueDate,
            orderTimeLine: timeLine.orderTimeLine,
          }
        }

        // default user sorting
        const order = computeOrder(tasks, move)
        if (!order) {
          return {}
        }

        props.moveTask(sourceTaskId, order)
        return { order }
      },
      onDropTask: (state, props) => drop => {
        const { dropTask, targetSection } = drop
        const { dueDate, orderTimeLine, order } = state

        // sort by Due Date
        if (targetSection) {
          if (orderTimeLine) {
            props.setOrderTimeLine(dropTask, dueDate, orderTimeLine)
          } else {
            props.setOrderTimeLine(dropTask, dueDate, dropTask.orderTimeLine)
          }
          return {}
        }

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
        toast.success(successMessages.tasks.archive, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
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
        toast.success(successMessages.tasks.cancelArchive, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
        })
        return {}
      },
      onHandleAcceptTask: (state, props) => data => {
        toast.success(successMessages.tasks.accepted, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
        })
        props.acceptTask(data.taskId, data.followerId)
        return {}
      },
      onHandleRejectTask: (state, props) => data => {
        props.rejectTask(data)
        return {}
      },
    }
  )
)(TaskListContainer)
