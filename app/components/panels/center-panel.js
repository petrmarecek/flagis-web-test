import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { getAppState } from 'redux/store/app-state/app-state.selectors'

const CenterPanel = props => {
  const { leftPanel, centerPanel } = props.appState
  const positionLeft = leftPanel.width

  const css = cx({
    'center-panel': true,
    'center-panel--resizing': centerPanel.isResizing,
  })

  return (
    <div className={css} style={{ left: positionLeft }}>
      {props.children}
    </div>
  )
}

CenterPanel.propTypes = {
  appState: PropTypes.object,
  children: PropTypes.object,
}
const mapStateToProps = state => ({
  appState: getAppState(state)
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CenterPanel)
