import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'

import { getArchivedTasksVisibility } from 'redux/store/app-state/app-state.selectors'
import { getNewRefreshToken } from 'redux/store/auth/auth.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import { selectActiveTags } from 'redux/store/tags/tags.actions'
import { getActiveTagsIds } from 'redux/store/tags/tags.selectors'
import {
  selectTask,
  setComplete,
  setIncomplete,
  setOrder,
  setOrderTimeLine,
  setDueDateTimeLine,
  moveTask,
  moveTimeLineTask,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getTasks,
} from 'redux/store/tasks/tasks.selectors'
import { getTasksMenuSort } from 'redux/store/tasks-menu/tasks-menu.selectors'
import {
  getSelectionInfo,
  setArchive,
  cancelArchive
} from 'redux/utils/component-helper'
import {
  computeOrder,
  computeTimeLine,
} from 'redux/utils/redux-helper'

import Loader from 'components/elements/loader'
import ShadowScrollbar from 'components/elements/shadow-scrollbar'
import TaskList from 'components/task-list/task-list'
import moment from 'moment'

class TaskListContainer extends Component {

  static propTypes = {
    tasks: PropTypes.object,
    isNewRefreshToken: PropTypes.bool,
    tasksId: PropTypes.object,
    completedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    selectTask: PropTypes.func,
    setComplete: PropTypes.func,
    setIncomplete: PropTypes.func,
    fetchTasks: PropTypes.func,
    setOrder: PropTypes.func,
    setOrderTimeLine: PropTypes.func,
    setDueDateTimeLine: PropTypes.func,
    moveTask: PropTypes.func,
    moveTimeLineTask: PropTypes.func,
    selectActiveTags: PropTypes.func.isRequired,
    selectedTags: PropTypes.object,
    selectedTasks: PropTypes.object,
    deselectTasks: PropTypes.func,
    sort: PropTypes.object,
    setArchiveTasks: PropTypes.func,
    cancelArchiveTasks: PropTypes.func,
    isVisibleArchivedTasks: PropTypes.bool,
  }

  state = {
    dueDate: null,
    orderTimeLine: null,
    order: null,
  }

  constructor(props) {
    super(props)
    this.debouncedMoveTask = debounce(this.invokeMove, 10)
  }

  moveTask = move => this.debouncedMoveTask(move)

  invokeMove(move) {
    const { sourceTaskId, targetSection } = move
    const tasks = this.props.tasks.items

    // Sort by Due Date
    if (targetSection) {

      // No task for this week
      if (targetSection === 'weekTasks') {
        const now = moment()
        const dayOfWeek = now.isoWeekday()

        if (dayOfWeek >= 6) {
          return
        }
      }

      // No task for this month
      if (targetSection === 'monthTasks') {
        const now = moment()
        const date = now.date()
        const dayOfMonth = now.daysInMonth()
        const diff = dayOfMonth - date
        if (diff <= 1) {
          return
        }

        const dayOfWeek = now.isoWeekday()
        const dayToNewWeek = (7 - dayOfWeek) + 1
        const add = date + dayToNewWeek
        if (add > dayOfMonth) {
          return
        }
      }

      const timeLine = computeTimeLine(tasks, move)
      if (!timeLine) {
        return
      }

      this.setState({
        dueDate: timeLine.dueDate,
        orderTimeLine: timeLine.orderTimeLine,
      })

      // Move to the otherTasks section and previous and next task has null due date
      if (targetSection === 'noDueDateTasks') {
        // Set null due date
        this.props.moveTimeLineTask(sourceTaskId, null, timeLine.orderTimeLine)
        return
      }

      this.props.moveTimeLineTask(sourceTaskId, timeLine.dueDate, timeLine.orderTimeLine)
      return
    }

    // Default user sorting
    const order = computeOrder(tasks, move)
    if (!order) {
      return
    }

    this.setState({ order })
    this.props.moveTask(sourceTaskId, order)
  }

  dropTask = drop => {
    const { dropTask, targetSection } = drop
    const { dueDate, orderTimeLine, order } = this.state

    // Sort by Due Date
    if (targetSection) {
      if (this.state.orderTimeLine) {
        this.props.setOrderTimeLine(dropTask, dueDate, orderTimeLine)
      } else {
        this.props.setOrderTimeLine(dropTask, dueDate, dropTask.orderTimeLine)
      }
      return
    }

    // Default user sorting
    this.props.setOrder(dropTask, order)
  }

  handleTaskSelect = (task, event) => {
    const selectionInfo = getSelectionInfo(event, task, this.props.selectedTasks)
    this.props.selectTask(selectionInfo.newSelectedTasks, selectionInfo.isMultiSelection)
  }

  handleCompleteClick = task => {
    if (task.isCompleted) {
      this.props.setIncomplete(task.id)
      return
    }

    this.props.setComplete(task.id)
  }

  handleTagClick = tag => {
    this.props.deselectTasks()
    this.props.selectActiveTags([tag.id])
  }

  handleSetArchiveTasks = taskId => {
    const tasks = this.props.tasksId
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectedTasks

    const archive = setArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks)

    this.props.setArchiveTasks(
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
  }

  handleCancelArchiveTasks = taskId => {
    const tasks = this.props.tasksId
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectedTasks

    const nonArchive = cancelArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks)

    this.props.cancelArchiveTasks(
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
  }

  getTaskList() {
    const offset = this.props.isVisibleArchivedTasks
      ? 154
      : 194

    const scrollStyle = {
      height: `calc(100vh - ${offset}px)`,
      shadowHeight: 20,
      boxShadowTop: 'inset 0 20px 20px -10px rgba(231, 236, 237, 1)',
      boxShadowBottom: 'inset 0 -20px 20px -10px  rgba(231, 236, 237, 1)',
    }

    return (
      <div>
        {!this.props.tasks.isFetching && this.props.tasks.items.length === 0 && !this.props.sort.dueDate &&
        <div className="empty-list">No task found</div>}
        <ShadowScrollbar style={scrollStyle}>
          <TaskList
            listType={this.props.tasks.type}
            tasks={this.props.tasks.items}
            selectedTags={this.props.selectedTags}
            selectedTasks={this.props.selectedTasks}
            onCompleteClick={this.handleCompleteClick}
            onTaskSelect={this.handleTaskSelect}
            moveTask={this.moveTask}
            dropTask={this.dropTask}
            onTagClick={this.handleTagClick}
            sort={this.props.sort}
            setArchiveTasks={this.handleSetArchiveTasks}
            cancelArchiveTasks={this.handleCancelArchiveTasks}
            isVisibleArchivedTasks={this.props.isVisibleArchivedTasks}/>
        </ShadowScrollbar>
      </div>
    )
  }

  render() {
    const taskList = this.getTaskList()
    return (
      <div>
        {(this.props.isNewRefreshToken || this.props.tasks.isFetching) && <Loader />}
        {!this.props.isNewRefreshToken && taskList}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: getTasks(state),
  isNewRefreshToken: getNewRefreshToken(state),
  tasksId: getTasksItems(state),
  completedTasks: getCompletedTasksItems(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  selectedTasks: getSelectionTasks(state),
  selectedTags: getActiveTagsIds(state),
  sort: getTasksMenuSort(state),
  isVisibleArchivedTasks: getArchivedTasksVisibility(state),
})

const mapDispatchToProps = {
  selectTask,
  setComplete,
  setIncomplete,
  setOrder,
  setOrderTimeLine,
  setDueDateTimeLine,
  moveTask,
  moveTimeLineTask,
  selectActiveTags,
  deselectTasks,
  setArchiveTasks,
  cancelArchiveTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer)
