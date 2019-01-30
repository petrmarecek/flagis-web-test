import React from 'react'

// components
import CenterPanel from 'components/panels/center-panel'
import ChangePasswordContent from 'components/contents/change-password-content'

const ChangePasswordPage = () => {
  const centerPanelStyle = {
    margin: '10px 10px 0 10px',
    backgroundColor: '#fff',
  }

  return (
    <CenterPanel style={centerPanelStyle}>
      <ChangePasswordContent />
    </CenterPanel>
  )
}

export default ChangePasswordPage
