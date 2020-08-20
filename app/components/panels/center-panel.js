import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'

import { CenterPanelWrapper } from './styles'

const CenterPanel = ({ leftPanel, children, style }) => (
  <CenterPanelWrapper id="center-panel" left={leftPanel.width} style={style}>
    {children}
  </CenterPanelWrapper>
)

CenterPanel.propTypes = {
  leftPanel: PropTypes.object,
  children: PropTypes.any,
  style: PropTypes.object,
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CenterPanel)
