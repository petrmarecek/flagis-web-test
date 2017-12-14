import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { getAppState } from 'redux/store/app-state/app-state.selectors'

class CenterPanel extends React.Component {

  static propTypes = {
    appState: PropTypes.object,
    children: PropTypes.object,
  }

  render() {
    const { leftPanel, centerPanel } = this.props.appState
    const positionLeft = leftPanel.width

    const css = cx({
      'center-panel': true,
      'center-panel--resizing': centerPanel.isResizing,
    })

    return (
      <div className={css} style={{ left: positionLeft }}>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  appState: getAppState(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(CenterPanel)
