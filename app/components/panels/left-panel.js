import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import { resizeLeftPanel } from 'redux/store/app-state/app-state.actions'
import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import ResizeHandle from 'components/common/resize-handle'

class LeftPanel extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    resizeLeftPanel: PropTypes.func.isRequired,
    leftPanel: PropTypes.object,
    location: PropTypes.string,
  }

  handleResize = position => {
    this.props.resizeLeftPanel(position.x)
  }

  render() {
    const { leftPanel, location } = this.props
    const isAccountPage = location.includes('/user/account')
    const style = { width: leftPanel.width }

    const leftPanelCss = cx({
      'left-panel': true,
      'left-panel--white-background': isAccountPage,
    })

    return (
      <div
        ref="elem"
        className={leftPanelCss} style={style}>
        {!isAccountPage && <ResizeHandle right onResize={this.handleResize} />}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state),
  location: getRoutingPathname(state),
})

const actionCreators = {
  resizeLeftPanel
}
export default connect(mapStateToProps, actionCreators)(LeftPanel)
