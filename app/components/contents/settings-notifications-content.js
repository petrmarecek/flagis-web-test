import React from 'react'

// components
import SettingsNotificationsForm from 'components/forms/settings-notifications-form'
import CenterPanel from 'components/panels/center-panel'
import NavigationAccountSettings from 'components/navigation/navigation-account-settings'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
  CenterPageTitle,
} from 'components/panels/styles'

const SettingsNotificationsContent = () => (
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
      <SettingsNotificationsForm />
    </CenterPanelScroll>
  </CenterPanel>
)

export default SettingsNotificationsContent
