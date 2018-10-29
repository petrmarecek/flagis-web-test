import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import TaskListItem from 'components/task-list/task-list-item'
import moment from 'moment'
import { getTimeLineByDueDate } from 'redux/utils/component-helper'

export default class TaskList extends PureComponent {

  static propTypes = {
    // Data
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
    moveTask: PropTypes.func,
    dropTask: PropTypes.func,
    onTagClick: PropTypes.func,
    setArchiveTasks: PropTypes.func,
    cancelArchiveTasks: PropTypes.func,
  }

  isSelected(taskId) {
    return this.props.selectedTasks.has(taskId)
  }

  getEmptyTask(typeDate, section) {
    const now = moment()
    const dayOfWeek = now.isoWeekday()
    const daysToNewWeek = (7 - dayOfWeek) + 1
    const dayOfMonth = now.date()
    const daysOfMonth = now.daysInMonth()
    const add = dayOfMonth === daysOfMonth ? 2 : 1
    const daysToNewMonth = (daysOfMonth - dayOfMonth) + add
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
    }

    return (
      <TaskListItem
        index={0}
        listType="main"
        task={task}
        selectedTags={this.props.selectedTags}
        moveTask={this.props.moveTask}
        dropTask={this.props.dropTask}
        timeLine={null}
        sort={null}
        section={section}
        noTaskFound/>
    )
  }

  getTaskItems(tasks, section) {
    const { listType } = this.props

    if (!listType) {
      return null
    }

    switch (listType) {
      case 'main': {
        return (
          tasks.map((task, i) => (
            <TaskListItem
              key={task.id}
              task={task}
              index={i}
              order={task.order}
              listType={this.props.listType}
              isSelected={this.isSelected(task.id)}
              selectedTags={this.props.selectedTags}
              onCompleteClick={this.props.onCompleteClick}
              onClick={this.props.onTaskSelect}
              moveTask={this.props.moveTask}
              dropTask={this.props.dropTask}
              onTagClick={this.props.onTagClick}
              timeLine={this.props.timeLine}
              sort={this.props.sort}
              setArchiveTasks={this.props.setArchiveTasks}
              section={section}
              leftPanelWidth={this.props.leftPanelWidth}
              windowWidth={this.props.windowWidth} />
          ))
        )
      }

      case 'archived': {
        return (
          tasks.map((task, i) => (
            <TaskListItem
              key={task.id}
              task={task}
              index={i}
              order={task.order}
              listType={this.props.listType}
              isSelected={this.isSelected(task.id)}
              selectedTags={this.props.selectedTags}
              onClick={this.props.onTaskSelect}
              moveTask={this.props.moveTask}
              dropTask={this.props.dropTask}
              onTagClick={this.props.onTagClick}
              timeLine={this.props.timeLine}
              sort={this.props.sort}
              cancelArchiveTasks={this.props.cancelArchiveTasks}
              section={section}
              leftPanelWidth={this.props.leftPanelWidth}
              windowWidth={this.props.windowWidth} />
          ))
        )
      }

      case 'inbox': {
        return (
          tasks.map((task, i) => (
            <TaskListItem
              key={task.id}
              task={task}
              index={i}
              order={task.order}
              listType={this.props.listType}
              isSelected={this.isSelected(task.id)}
              selectedTags={this.props.selectedTags}
              onCompleteClick={this.props.onCompleteClick}
              onClick={this.props.onTaskSelect}
              moveTask={this.props.moveTask}
              dropTask={this.props.dropTask}
              onTagClick={this.props.onTagClick}
              timeLine={this.props.timeLine}
              sort={this.props.sort}
              setArchiveTasks={this.props.setArchiveTasks}
              section={section} 
              leftPanelWidth={this.props.leftPanelWidth}
              windowWidth={this.props.windowWidth} />
          ))
        )
      }

      default: return null
    }
  }

  getTaskItemsList(tasks) {
    const { isVisibleArchivedTasks, timeLine } = this.props

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
        tasksRender.previousDaysTasks = this.getTaskItems(timeLineTasks.previousDaysTasks, 'previousDaysTasks')
      }

      if (timeLineTasks.todayTasks.length !== 0) {
        tasksRender.todayTasks = this.getTaskItems(timeLineTasks.todayTasks, 'todayTasks')
      }

      if (timeLineTasks.tomorrowTasks.length !== 0) {
        tasksRender.tomorrowTasks = this.getTaskItems(timeLineTasks.tomorrowTasks, 'tomorrowTasks')
      }

      if (timeLineTasks.weekTasks.length !== 0) {
        tasksRender.weekTasks = this.getTaskItems(timeLineTasks.weekTasks, 'weekTasks')
      }

      if (timeLineTasks.monthTasks.length !== 0) {
        tasksRender.monthTasks = this.getTaskItems(timeLineTasks.monthTasks, 'monthTasks')
      }

      if (timeLineTasks.laterTasks.length !== 0) {
        tasksRender.laterTasks = this.getTaskItems(timeLineTasks.laterTasks, 'laterTasks')
      }

      if (timeLineTasks.noDueDatesTasks.length !== 0) {
        tasksRender.noDueDatesTasks = this.getTaskItems(timeLineTasks.noDueDatesTasks, 'noDueDatesTasks')
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
      return this.getTaskItems(tasks, null)
    }
  }

  render() {
    // children items
    const { tasks, isVisibleArchivedTasks, timeLine } = this.props
    const taskItems = this.getTaskItemsList(tasks)

    return (
      <div className="task-list-items">
        {isVisibleArchivedTasks &&
        <ul ref="list" className="task-items">
          {taskItems}
        </ul>}

        {!timeLine && !isVisibleArchivedTasks &&
        <ul ref="list" className="task-items">
          {taskItems}
        </ul>}

        {timeLine && !isVisibleArchivedTasks &&
        <ul className="time-line">
          {taskItems.previousDaysTasks &&
          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Previous days</p>
            <ul ref="list" className="task-items">
              {taskItems.previousDaysTasks}
            </ul>
          </li>}

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Today</p>
            <ul ref="list" className="task-items">
              {!taskItems.todayTasks ? this.getEmptyTask('today', 'todayTasks') : taskItems.todayTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Tomorrow</p>
            <ul ref="list" className="task-items">
              {!taskItems.tomorrowTasks ? this.getEmptyTask('tomorrow', 'tomorrowTasks') : taskItems.tomorrowTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This week</p>
            <ul ref="list" className="task-items">
              {!taskItems.weekTasks ? this.getEmptyTask('week', 'weekTasks') : taskItems.weekTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This month</p>
            <ul ref="list" className="task-items">
              {!taskItems.monthTasks ? this.getEmptyTask('month', 'monthTasks') : taskItems.monthTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Later</p>
            <ul ref="list" className="task-items">
              {!taskItems.laterTasks ? this.getEmptyTask('later', 'laterTasks') : taskItems.laterTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">No Due Dates</p>
            <ul ref="list" className="task-items">
              {!taskItems.noDueDatesTasks ? this.getEmptyTask('noDueDates', 'noDueDatesTasks') : taskItems.noDueDatesTasks}
            </ul>
          </li>
        </ul>}
      </div>
    )
  }
}

