import React from 'react'

// components
import ChangePassword from 'components/common/change-password'
import CenterPanel from 'components/panels/center-panel'
import NavigationAccountSettings from 'components/navigation/navigation-account-settings'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from 'components/panels/styles'

const ChangePasswordContent = () => (
  <CenterPanel style={{ backgroundColor: '#fff', margin: '0 0 0 1px' }}>
    <CenterPanelTop>
      <CenterPanelTopPrimary>
        <CenterPageTitle leftMargin>Settings</CenterPageTitle>
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
