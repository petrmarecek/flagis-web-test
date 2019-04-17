import React from 'react'

// components
import TaskListContainer from '../task-list'

// styles
import { CenterPanelTop, CenterPanelTopPrimary, CenterPageTitle, CenterPanelScroll } from '../panels/styles'

const InboxContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary>
        <CenterPageTitle>Inbox</CenterPageTitle>
      </CenterPanelTopPrimary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={60} offsetBottom={10}>
      <TaskListContainer />
    </CenterPanelScroll>
  </div>
)

export default InboxContent
