import React from 'react'

// components
import EditProfile from 'components/forms/edit-profile'
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
import { useTheme } from 'styled-components'

const EditProfileContent = () => {
  const theme = useTheme()

  return (
    <CenterPanel style={{
      backgroundColor: theme.otherPages.wrapperBgColor,
      margin: '0 0 0 1px',
    }}>
      <CenterPanelTop>
        <CenterPanelTopPrimary>
          <CenterPageTitle leftMargin>Settings</CenterPageTitle>
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
}

export default EditProfileContent
