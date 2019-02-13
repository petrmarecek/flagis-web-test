import React from 'react'

// components
import ColorTheme from 'components/common/color-theme'

// styles
import { CenterPanelScroll } from 'components/panels/styles'

const ColorThemeContent = () => (
  <CenterPanelScroll offsetTop={108} offsetBottom={0}>
    <ColorTheme />
  </CenterPanelScroll>
)

export default ColorThemeContent
