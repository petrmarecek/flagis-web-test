import React from 'react'

// components
import TaskListContainer from '../task-list'

// styles
import { CenterPanelScroll } from '../panels/styles'

const InboxContent = () => (
  <CenterPanelScroll offsetTop={10} offsetBottom={10}>
    <TaskListContainer />
  </CenterPanelScroll>
)

export default InboxContent
