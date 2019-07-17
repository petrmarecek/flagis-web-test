import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { List } from 'immutable'

import TaskListItem from 'components/task-list/task-list-item'

import { getTimeLineByDueDate } from 'redux/utils/component-helper'

import {
  TaskListItems,
  TimeLine,
  TimeLineList,
  TimeLinePoint,
  TimeLineText,
} from './styles'

const TaskList = props => {
  const {
    // data
    userId,
    tasks,
    listType,
    selectedTasks,
    selectedTags,
    isVisibleArchivedTasks,
    timeLine,
    sort,
    leftPanelWidth,
    windowWidth,

    // handlers
    onCompleteClick,
    onTaskSelect,
    onToggleImportant,
    moveTask,
    dropTask,
    onTagClick,
    setArchiveTasks,
    cancelArchiveTasks,
    acceptTask,
    rejectTask,
  } = props

  const getEmptyTask = (typeDate, section) => {
    const now = moment()
    const dayOfWeek = now.isoWeekday()
    const daysToNewWeek = 7 - dayOfWeek + 1
    const dayOfMonth = now.date()
    const daysOfMonth = now.daysInMonth()
    const add = dayOfMonth === daysOfMonth ? 2 : 1
    const daysToNewMonth = daysOfMonth - dayOfMonth + add
    const date = {
      today: now,
      tomorrow: now.clone().add(1, 'days'),
      week: now.clone().add(2, 'days'),
      month: now.clone().add(daysToNewWeek, 'days'),
      later: now.clone().add(daysToNewMonth, 'days'),
      noDueDates: null,
    }
    const task = {
      dueDate: date[typeDate],
      tags: List(),
      followers: List(),
      description: '',
      createdBy: {
        id: null,
        isContact: false,
        email: null,
      },
    }

    return (
      <TaskListItem
        index={0}
        listType="main"
        task={task}
        selectedTags={selectedTags}
        moveTask={moveTask}
        dropTask={dropTask}
        timeLine={null}
        sort={null}
        section={section}
        noTaskFound
      />
    )
  }

  const getTaskItems = (taskItems, section) => {
    if (!listType) {
      return null
    }

    return taskItems.map((task, i) => (
      <TaskListItem
        key={task.id}
        userId={userId}
        task={task}
        index={i}
        order={task.order}
        listType={listType}
        isSelected={selectedTasks.has(task.id)}
        selectedTags={selectedTags}
        onCompleteClick={onCompleteClick}
        onClick={onTaskSelect}
        onToggleImportant={onToggleImportant}
        moveTask={moveTask}
        dropTask={dropTask}
        onTagClick={onTagClick}
        timeLine={timeLine}
        sort={sort}
        setArchiveTasks={setArchiveTasks}
        cancelArchiveTasks={cancelArchiveTasks}
        acceptTask={acceptTask}
        rejectTask={rejectTask}
        section={section}
        leftPanelWidth={leftPanelWidth}
        windowWidth={windowWidth}
      />
    ))
  }

  const getTaskItemsList = () => {
    if (timeLine && !isVisibleArchivedTasks) {
      // Due date sorting algorithm is activated
      const timeLineTasks = getTimeLineByDueDate(tasks)
      const tasksRender = {
        previousDaysTasks: null,
        todayTasks: null,
        tomorrowTasks: null,
        weekTasks: null,
        monthTasks: null,
        laterTasks: null,
        noDueDatesTasks: null,
      }

      if (timeLineTasks.previousDaysTasks.length !== 0) {
        tasksRender.previousDaysTasks = getTaskItems(
          timeLineTasks.previousDaysTasks,
          'previousDaysTasks'
        )
      }

      if (timeLineTasks.todayTasks.length !== 0) {
        tasksRender.todayTasks = getTaskItems(
          timeLineTasks.todayTasks,
          'todayTasks'
        )
      }

      if (timeLineTasks.tomorrowTasks.length !== 0) {
        tasksRender.tomorrowTasks = getTaskItems(
          timeLineTasks.tomorrowTasks,
          'tomorrowTasks'
        )
      }

      if (timeLineTasks.weekTasks.length !== 0) {
        tasksRender.weekTasks = getTaskItems(
          timeLineTasks.weekTasks,
          'weekTasks'
        )
      }

      if (timeLineTasks.monthTasks.length !== 0) {
        tasksRender.monthTasks = getTaskItems(
          timeLineTasks.monthTasks,
          'monthTasks'
        )
      }

      if (timeLineTasks.laterTasks.length !== 0) {
        tasksRender.laterTasks = getTaskItems(
          timeLineTasks.laterTasks,
          'laterTasks'
        )
      }

      if (timeLineTasks.noDueDatesTasks.length !== 0) {
        tasksRender.noDueDatesTasks = getTaskItems(
          timeLineTasks.noDueDatesTasks,
          'noDueDatesTasks'
        )
      }

      return {
        previousDaysTasks: tasksRender.previousDaysTasks,
        todayTasks: tasksRender.todayTasks,
        tomorrowTasks: tasksRender.tomorrowTasks,
        weekTasks: tasksRender.weekTasks,
        monthTasks: tasksRender.monthTasks,
        laterTasks: tasksRender.laterTasks,
        noDueDatesTasks: tasksRender.noDueDatesTasks,
      }
    } else {
      // Due date sorting algorithm isn't activated
      return getTaskItems(tasks, null)
    }
  }

  // children items
  const taskItems = getTaskItemsList()
  return (
    <div className="task-list-items">
      {!timeLine && <TaskListItems>{taskItems}</TaskListItems>}

      {timeLine && !isVisibleArchivedTasks && (
        <TimeLine>
          {taskItems.previousDaysTasks && (
            <TimeLineList>
              <TimeLinePoint />
              <TimeLineText>Previous days</TimeLineText>
              <TaskListItems>{taskItems.previousDaysTasks}</TaskListItems>
            </TimeLineList>
          )}

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>Today</TimeLineText>
            <TaskListItems>
              {!taskItems.todayTasks
                ? getEmptyTask('today', 'todayTasks')
                : taskItems.todayTasks}
            </TaskListItems>
          </TimeLineList>

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>Tomorrow</TimeLineText>
            <TaskListItems>
              {!taskItems.tomorrowTasks
                ? getEmptyTask('tomorrow', 'tomorrowTasks')
                : taskItems.tomorrowTasks}
            </TaskListItems>
          </TimeLineList>

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>This week</TimeLineText>
            <TaskListItems>
              {!taskItems.weekTasks
                ? getEmptyTask('week', 'weekTasks')
                : taskItems.weekTasks}
            </TaskListItems>
          </TimeLineList>

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>This month</TimeLineText>
            <TaskListItems>
              {!taskItems.monthTasks
                ? getEmptyTask('month', 'monthTasks')
                : taskItems.monthTasks}
            </TaskListItems>
          </TimeLineList>

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>Later</TimeLineText>
            <TaskListItems>
              {!taskItems.laterTasks
                ? getEmptyTask('later', 'laterTasks')
                : taskItems.laterTasks}
            </TaskListItems>
          </TimeLineList>

          <TimeLineList>
            <TimeLinePoint />
            <TimeLineText>No Due Dates</TimeLineText>
            <TaskListItems>
              {!taskItems.noDueDatesTasks
                ? getEmptyTask('noDueDates', 'noDueDatesTasks')
                : taskItems.noDueDatesTasks}
            </TaskListItems>
          </TimeLineList>
        </TimeLine>
      )}
    </div>
  )
}

TaskList.propTypes = {
  // Data
  userId: PropTypes.string,
  tasks: PropTypes.array,
  listType: PropTypes.string,
  selectedTasks: PropTypes.object,
  selectedTags: PropTypes.object,
  isVisibleArchivedTasks: PropTypes.bool,
  timeLine: PropTypes.bool,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,

  // Handlers
  onCompleteClick: PropTypes.func,
  onTaskSelect: PropTypes.func,
  onToggleImportant: PropTypes.func,
  moveTask: PropTypes.func,
  dropTask: PropTypes.func,
  onTagClick: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  acceptTask: PropTypes.func,
  rejectTask: PropTypes.func,
}

export default TaskList
