import React from 'react'

// components
import ColorTheme from 'components/common/color-theme'
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

const ColorThemeContent = () => (
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
      <ColorTheme />
    </CenterPanelScroll>
  </CenterPanel>
)

export default ColorThemeContent
