import React from 'react'

import LeftPanel from 'components/panels/left-panel'
import TreeContainer from 'components/tag-tree/tree-container'
import CenterPanel from 'components/panels/center-panel'
import DashboardContent from 'components/contents/dashboard-content'

const DashboardPage = () => {
  const centerPanelStyle = {
    margin: '10px 10px 0 10px',
    backgroundColor: '#fff'
  }

  return(
    <div>
      <LeftPanel>
        <TreeContainer />
      </LeftPanel>
      <CenterPanel style={centerPanelStyle}>
        <DashboardContent/>
      </CenterPanel>
    </div>
  )
}

export default DashboardPage
