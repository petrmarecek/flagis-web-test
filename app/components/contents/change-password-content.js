import React from 'react'

// components
import ChangePassword from 'components/common/change-password'
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

const ChangePasswordContent = () => (
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
      <ChangePassword />
    </CenterPanelScroll>
  </CenterPanel>
)

export default ChangePasswordContent
