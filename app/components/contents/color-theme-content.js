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
import { useTheme } from 'styled-components'

const ColorThemeContent = () => {
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
        <ColorTheme />
      </CenterPanelScroll>
    </CenterPanel>
  )
}

export default ColorThemeContent
