import React from 'react'

// components
import EditProfile from 'components/common/edit-profile'
import CenterPanel from 'components/panels/center-panel'
import NavigationAccountSettings from 'components/navigation/navigation-account-settings'

// styles
import styled from 'styled-components'
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from 'components/panels/styles'

const SettingsTitle = styled.div`
  margin-left: 17px;
  font-size: 24px;
  font-weight: bold;
  color: #1c2124;
`

const EditProfileContent = () => (
  <CenterPanel style={{ backgroundColor: '#fff', margin: '0 0 0 1px' }}>
    <CenterPanelTop>
      <CenterPanelTopPrimary>
        <SettingsTitle>Settings</SettingsTitle>
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary bottomBorder>
        <NavigationAccountSettings />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={108} offsetBottom={0}>
      <EditProfile />
    </CenterPanelScroll>
  </CenterPanel>
)

export default EditProfileContent
