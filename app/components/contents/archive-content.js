import React from 'react'
import TaskListContainer from '../task-list/task-list-container'
import TasksMenuContainer from '../tasks-menu/tasks-menu-container'
import { CenterPanelTop, CenterPanelScroll } from "../panels/styles";

const ArchiveContent = () => {
  return (
    <div>
      <CenterPanelTop>
        <TasksMenuContainer />
      </CenterPanelTop>
      <div className="center-panel__title">
        Archived Tasks
      </div>
      <CenterPanelScroll
        id="center-panel-scroll"
        smallOffsetBottom >
        <div className="task-panel">
          <div className="task-list">
            <TaskListContainer />
          </div>
        </div>
      </CenterPanelScroll>
    </div>
  )
}

export default ArchiveContent
