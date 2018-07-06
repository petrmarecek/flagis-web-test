import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { resizeLeftPanel } from 'redux/store/app-state/app-state.actions'
import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'
import ResizeHandle from 'components/common/resize-handle'

class LeftPanel extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    resizeLeftPanel: PropTypes.func.isRequired,
    leftPanel: PropTypes.object,
  }

  handleResize = position => {
    this.props.resizeLeftPanel(position.x)
  }

  render() {
    const leftPanel = this.props.leftPanel
    const style = { width: leftPanel.width }

    return (
      <div
        ref="elem"
        className="left-panel" style={style}>
        <ResizeHandle right onResize={this.handleResize} />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state),
})

const actionCreators = {
  resizeLeftPanel
}
export default connect(mapStateToProps, actionCreators)(LeftPanel)
