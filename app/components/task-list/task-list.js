import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TaskListItem from 'components/task-list/task-list-item'
import { getTimeLineByDueDate } from 'redux/utils/component-helper'

class TaskList extends Component {

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

  getTaskItems(tasks, index, section) {

    if (!this.props.listType) {
      return null
    }

    switch (this.props.listType) {
      case 'main': {
        return (
          tasks.map(task =>
            <TaskListItem
              key={task.id}
              task={task}
              index={index++}
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
          )
        )
      }

      case 'archived': {
        return (
          tasks.map((task, i) =>
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
          )
        )
      }

      default: return null
    }
  }

  getTaskItemsList(tasks) {
    if (this.props.sort.dueDate && !this.props.isVisibleArchivedTasks) {
      // Due date sorting algorithm is activated
      let index = 0
      const timeLineTasks = getTimeLineByDueDate(tasks)
      const tasksRender = {
        overdueDateTasks: null,
        todayTasks: null,
        tomorrowTasks: null,
        weekTasks: null,
        monthTasks: null,
        othersTasks: null,
      }

      if (timeLineTasks.overdueDateTasks.length !== 0) {
        tasksRender.overdueDateTasks = this.getTaskItems(timeLineTasks.overdueDateTasks, index, 'overdue')
        index += timeLineTasks.overdueDateTasks.length
      }

      if (timeLineTasks.todayTasks.length !== 0) {
        tasksRender.todayTasks = this.getTaskItems(timeLineTasks.todayTasks, index, 'today')
        index += timeLineTasks.todayTasks.length
      }

      if (timeLineTasks.tomorrowTasks.length !== 0) {
        tasksRender.tomorrowTasks = this.getTaskItems(timeLineTasks.tomorrowTasks, index, 'tomorrow')
        index += timeLineTasks.tomorrowTasks.length
      }

      if (timeLineTasks.weekTasks.length !== 0) {
        tasksRender.weekTasks = this.getTaskItems(timeLineTasks.weekTasks, index, 'week')
        index += timeLineTasks.weekTasks.length
      }

      if (timeLineTasks.monthTasks.length !== 0) {
        tasksRender.monthTasks = this.getTaskItems(timeLineTasks.monthTasks, index, 'month')
        index += timeLineTasks.monthTasks.length
      }

      if (timeLineTasks.othersTasks.length !== 0) {
        tasksRender.othersTasks = this.getTaskItems(timeLineTasks.othersTasks, index, 'others')
      }

      return {
        overdueDateTasks: tasksRender.overdueDateTasks,
        todayTasks: tasksRender.todayTasks,
        tomorrowTasks: tasksRender.tomorrowTasks,
        weekTasks: tasksRender.weekTasks,
        monthTasks: tasksRender.monthTasks,
        othersTasks: tasksRender.othersTasks,
      }
    } else {
      // Due date sorting algorithm isn't activated
      return this.getTaskItems(tasks, 0)
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
          {taskItems.overdueDateTasks &&
          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Overdue</p>
            <ul ref="list" className="task-items">
              {taskItems.overdueDateTasks}
            </ul>
          </li>}

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Today</p>
            <ul ref="list" className="task-items">
              {!taskItems.todayTasks &&
              <li className="empty-list">No task found</li>}

              {taskItems.todayTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Tomorrow</p>
            <ul ref="list" className="task-items">
              {!taskItems.tomorrowTasks &&
              <li className="empty-list">No task found</li>}

              {taskItems.tomorrowTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This week</p>
            <ul ref="list" className="task-items">
              {!taskItems.weekTasks &&
              <li className="empty-list">No task found</li>}

              {taskItems.weekTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">This Month</p>
            <ul ref="list" className="task-items">
              {!taskItems.monthTasks &&
              <li className="empty-list">No task found</li>}

              {taskItems.monthTasks}
            </ul>
          </li>

          <li className="time-line__list">
            <span className="time-line__point"/>
            <p className="time-line__text">Others</p>
            <ul ref="list" className="task-items">
              {!taskItems.othersTasks &&
              <li className="empty-list">No task found</li>}

              {taskItems.othersTasks}
            </ul>
          </li>
        </ul>}
      </div>
    )
  }
}

export default TaskList

