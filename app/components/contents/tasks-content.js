import React, { Component } from 'react'

import TaskListContainer from '../task-list/task-list-container'
import TasksMenuContainer from '../tasks-menu/tasks-menu-container'
import AddTaskForm from '../elements/add-task-form'
import TasksProgressBar from '../elements/tasks-progress-bar'

export default class TasksContent extends Component {
  render() {
    return (
      <div>
        <div className="center-panel__top">
          <TasksMenuContainer />
          <AddTaskForm />
        </div>
        <div className="center-panel__scroll center-panel__scroll--large-offset">
          <div className="task-panel">
            <div className="task-panel__body">
              <div className="task-list unfinished">
                <TaskListContainer />
              </div>
            </div>
          </div>
        </div>
        <TasksProgressBar />
      </div>
    )
  }
}
