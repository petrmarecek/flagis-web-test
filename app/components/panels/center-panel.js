import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'

const CenterPanel = ({ leftPanel, children, style }) => (
  <div
    id="center-panel"
    className="center-panel"
    style={{ left: leftPanel.width, ...style }}>
    {children}
  </div>
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
