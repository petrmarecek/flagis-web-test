import React from 'react'

// components
import TaskListContainer from '../task-list'

// styles
import { CenterPanelScroll } from '../panels/styles'

const InboxContent = () => (
  <CenterPanelScroll smallOffsetTop smallOffsetBottom>
    <TaskListContainer />
  </CenterPanelScroll>
)

export default InboxContent
