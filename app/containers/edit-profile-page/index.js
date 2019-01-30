import React from 'react'

// components
import CenterPanel from 'components/panels/center-panel'
import EditProfileContent from 'components/contents/edit-profile-content'

const EditProfilePage = () => {
  const centerPanelStyle = {
    margin: '10px 10px 0 10px',
    backgroundColor: '#fff',
  }

  return (
    <CenterPanel style={centerPanelStyle}>
      <EditProfileContent />
    </CenterPanel>
  )
}

export default EditProfilePage
