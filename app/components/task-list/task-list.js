import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TaskListItem from 'components/task-list/task-list-item'
import moment from 'moment'
import { getTimeLineByDueDate } from 'redux/utils/component-helper'

export default class TaskList extends Component {

  static propTypes = {
    selectedTasks: PropTypes.object,
    onCompleteClick: PropTypes.func,
    onTaskSelect: PropTypes.func,
    tasks: PropTypes.array,
    selectedTags: PropTypes.object,
    onToggleImportant: PropTypes.func,
    moveTask: PropTypes.func,
    dropTask: PropTypes.func,
    onTagClick: PropTypes.func.isRequired,
    listType: PropTypes.string,
    sort: PropTypes.object,
    setArchiveTasks: PropTypes.func,
    cancelArchiveTasks: PropTypes.func,
    isVisibleArchivedTasks: PropTypes.bool,
  }

  isSelected(taskId) {
    return this.props.selectedTasks.has(taskId)
  }

  getEmptyTask(typeDate, section) {
    const now = moment()
    const dayOfWeek = now.isoWeekday()
    const dayToNewWeek = (7 - dayOfWeek) + 1
    const today = now.set({'hour': 23, 'minute': 45, 'second': 0, 'millisecond': 0})

    const date = {
      today: today,
      tomorrow: today.clone().add(1, 'days'),
      week: today.clone().add(2, 'days'),
      month: today.clone().add(dayToNewWeek, 'days'),
      others: null,
    }
    const task = { dueDate: date[typeDate] }

    return (
      <TaskListItem
        index={0}
        listType="main"
        task={task}
        moveTask={this.props.moveTask}
        dropTask={this.props.dropTask}
        sort={null}
        section={section}
        noTaskFound/>
    )
  }

  getTaskItems(tasks, section) {

    if (!this.props.listType) {
      return null
    }

    switch (this.props.listType) {
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
              onToggleImportant={this.props.onToggleImportant}
              moveTask={this.props.moveTask}
              dropTask={this.props.dropTask}
              onTagClick={this.props.onTagClick}
              sort={this.props.sort}
              setArchiveTasks={this.props.setArchiveTasks}
              section={section}/>
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
              sort={this.props.sort}
              cancelArchiveTasks={this.props.cancelArchiveTasks}
              section={section}/>
          ))
        )
      }

      default: return null
    }
  }

  getTaskItemsList(tasks) {
    if (this.props.sort.dueDate && !this.props.isVisibleArchivedTasks) {
      // Due date sorting algorithm is activated
      const timeLineTasks = getTimeLineByDueDate(tasks)
      const tasksRender = {
        overdueTasks: null,
        todayTasks: null,
        tomorrowTasks: null,
        weekTasks: null,
        monthTasks: null,
        othersTasks: null,
      }

      if (timeLineTasks.overdueTasks.length !== 0) {
        tasksRender.overdueTasks = this.getTaskItems(timeLineTasks.overdueTasks, 'overdueTasks')
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

      if (timeLineTasks.othersTasks.length !== 0) {
        tasksRender.othersTasks = this.getTaskItems(timeLineTasks.othersTasks, 'othersTasks')
      }

      return {
        overdueTasks: tasksRender.overdueTasks,
        todayTasks: tasksRender.todayTasks,
        tomorrowTasks: tasksRender.tomorrowTasks,
        weekTasks: tasksRender.weekTasks,
        monthTasks: tasksRender.monthTasks,
        othersTasks: tasksRender.othersTasks,
      }
    } else {
      // Due date sorting algorithm isn't activated
      return this.getTaskItems(tasks, null)
    }
  }

  render() {
    // children items
    const { tasks, isVisibleArchivedTasks} = this.props
    const dueDateSort = this.props.sort.dueDate
    const taskItems = this.getTaskItemsList(tasks)

    return (
      <div className="task-list-items">
        {isVisibleArchivedTasks &&
        <ul ref="list" className="task-items">
          {taskItems}
        </ul>}

        {!dueDateSort && !isVisibleArchivedTasks &&
        <ul ref="list" className="task-items">
          {taskItems}
        </ul>}

        {dueDateSort && !isVisibleArchivedTasks &&
        <ul className="time-line">
          {taskItems.overdueTasks &&
          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Overdue</p>
            <ul ref="list" className="task-items">
              {taskItems.overdueTasks}
            </ul>
          </li>}

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Today</p>
            <ul ref="list" className="task-items">
              {!taskItems.todayTasks && this.getEmptyTask('today', 'todayTasks')}

              {taskItems.todayTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Tomorrow</p>
            <ul ref="list" className="task-items">
              {!taskItems.tomorrowTasks && this.getEmptyTask('tomorrow', 'tomorrowTasks')}

              {taskItems.tomorrowTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This week</p>
            <ul ref="list" className="task-items">
              {!taskItems.weekTasks && this.getEmptyTask('week', 'weekTasks')}

              {taskItems.weekTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This Month</p>
            <ul ref="list" className="task-items">
              {!taskItems.monthTasks && this.getEmptyTask('month', 'monthTasks')}

              {taskItems.monthTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Others</p>
            <ul ref="list" className="task-items">
              {!taskItems.othersTasks && this.getEmptyTask('others', 'othersTasks')}

              {taskItems.othersTasks}
            </ul>
          </li>
        </ul>}
      </div>
    )
  }
}

