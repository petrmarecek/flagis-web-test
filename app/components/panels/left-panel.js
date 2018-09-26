import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { resizeLeftPanel } from 'redux/store/app-state/app-state.actions'
import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import ResizeHandle from 'components/common/resize-handle'
import { LeftPanelContainer } from './styles'

const LeftPanel = ({ children, leftPanel, location, onHandleResize }) => {
  const isAccountPage = location.includes('/user/account')

  return (
    <LeftPanelContainer
      width={leftPanel.width}
      whiteBackground={isAccountPage}>
      {!isAccountPage &&
      <ResizeHandle onResize={onHandleResize} />}
      {children}
    </LeftPanelContainer>
  )
}

LeftPanel.propTypes = {
  children: PropTypes.object.isRequired,
  leftPanel: PropTypes.object,
  location: PropTypes.string,
  onHandleResize: PropTypes.func,
  resizeLeftPanel: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  leftPanel: getLeftPanel(state),
  location: getRoutingPathname(state),
})

const mapDispatchToProps = {
  resizeLeftPanel
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleResize: props => position => props.resizeLeftPanel(position.x),
  }),
)(LeftPanel)
