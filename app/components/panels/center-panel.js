import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'

import { CenterPanelContainer } from './styles'

const CenterPanel = ({ leftPanel, children, style }) => (
  <CenterPanelContainer
    id="center-panel"
    left={leftPanel.width}
    style={style}>
    {children}
  </CenterPanelContainer>
)

CenterPanel.propTypes = {
  leftPanel: PropTypes.object,
  children: PropTypes.object,
  style: PropTypes.object,
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CenterPanel)

