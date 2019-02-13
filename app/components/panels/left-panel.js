import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { resizeLeftPanel } from 'redux/store/app-state/app-state.actions'
import {
  getLeftPanel,
  getColorTheme,
} from 'redux/store/app-state/app-state.selectors'

// components
import ResizeHandle from 'components/common/resize-handle'

// styles
import { LeftPanelWrapper } from './styles'

const LeftPanel = ({ children, leftPanel, colorTheme, onHandleResize }) => (
  <LeftPanelWrapper width={leftPanel.width} colorTheme={colorTheme}>
    <ResizeHandle onResize={onHandleResize} />
    {children}
  </LeftPanelWrapper>
)

LeftPanel.propTypes = {
  children: PropTypes.array.isRequired,
  leftPanel: PropTypes.object,
  colorTheme: PropTypes.string,
  onHandleResize: PropTypes.func,
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state),
  colorTheme: getColorTheme(state),
})

const mapDispatchToProps = {
  resizeLeftPanel,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleResize: props => position => props.resizeLeftPanel(position.x),
  })
)(LeftPanel)
