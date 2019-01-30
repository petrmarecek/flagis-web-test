import React from 'react'

// components
import CenterPanel from 'components/panels/center-panel'
import DashboardContent from 'components/contents/dashboard-content'

const DashboardPage = () => {
  const centerPanelStyle = {
    margin: '10px 10px 0 10px',
    backgroundColor: '#fff',
  }

  return (
    <CenterPanel style={centerPanelStyle}>
      <DashboardContent />
    </CenterPanel>
  )
}

export default DashboardPage
