import React from 'react'
import TaskListContainer from '../task-list/task-list-container'
import TasksMenuContainer from '../tasks-menu/tasks-menu-container'

const ArchiveContent = () => {
  return (
    <div>
      <div className="center-panel__top">
        <TasksMenuContainer />
      </div>
      <div className="center-panel__title">
        Archived Tasks
      </div>
      <div
        id="center-panel-scroll"
        className="center-panel__scroll center-panel__scroll--small-offset center-panel__scroll--small-offset-bottom">
        <div className="task-panel">
          <div className="task-list">
            <TaskListContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchiveContent
