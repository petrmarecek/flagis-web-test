import React from 'react'

import LeftPanel from 'components/panels/left-panel'
import AccountMenu from 'components/account-menu/'
import CenterPanel from 'components/panels/center-panel'
import EditProfileContent from 'components/contents/edit-profile-content'

const EditProfilePage = () => {
  const centerPanelStyle = {
    margin: '10px 10px 0 10px',
    backgroundColor: '#fff'
  }

  return(
    <div>
      <LeftPanel>
        <AccountMenu />
      </LeftPanel>
      <CenterPanel style={centerPanelStyle}>
        <EditProfileContent/>
      </CenterPanel>
    </div>
  )
}

export default EditProfilePage
