import React from 'react'
import TaskListContainer from 'components/task-list/task-list-container'
import TasksMenuContainer from 'components/tasks-menu/tasks-menu-container'
import AddTaskForm from 'components/common/add-task-form'
import TasksProgressBar from 'components/common/tasks-progress-bar'

const TasksContent = () => {
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

export default TasksContent
