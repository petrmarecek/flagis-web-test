import React from 'react'
import TaskListContainer from '../task-list'
import TasksMenuContainer from 'components/tasks-menu/tasks-menu-container'
import AddTaskForm from 'components/common/add-task-form'
import TasksProgressBar from 'components/common/tasks-progress-bar'
import { CenterPanelTop, CenterPanelScroll } from '../panels/styles'

const TasksContent = () => {
  return (
    <div>
      <CenterPanelTop>
        <TasksMenuContainer />
        <AddTaskForm />
      </CenterPanelTop>
      <CenterPanelScroll largeOffsetTop>
        <div className="task-panel">
          <div className="task-panel__body">
            <div className="task-list unfinished">
              <TaskListContainer />
            </div>
          </div>
        </div>
      </CenterPanelScroll>
      <TasksProgressBar />
    </div>
  )
}

export default TasksContent
