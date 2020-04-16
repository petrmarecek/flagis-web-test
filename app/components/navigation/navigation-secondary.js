import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { getTimeLine } from 'redux/store/tasks/tasks.selectors'
import { changeNavigationSecondary } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// styles
import { NavigationSecondaryWrapper, SecondaryButton } from './styles'

const NavigationSecondary = props => {
  const {
    pathname,
    timeLine,
    onHandleClickTasks,
    onHandleClickTimeLine,
    onHandleClickDashboard,
  } = props
  const { user } = routes

  const isTaskActive = pathname === user.tasks && !timeLine
  const isTimeLineActive = pathname === user.tasks && timeLine
  const isDashboardActive = pathname === user.dashboard

  return (
    <NavigationSecondaryWrapper>
      <SecondaryButton active={isTaskActive} onClick={onHandleClickTasks}>
        List
      </SecondaryButton>
      <SecondaryButton
        active={isTimeLineActive}
        onClick={onHandleClickTimeLine}
      >
        Timeline
      </SecondaryButton>
      <SecondaryButton
        active={isDashboardActive}
        onClick={onHandleClickDashboard}
      >
        Charts
      </SecondaryButton>
    </NavigationSecondaryWrapper>
  )
}

NavigationSecondary.propTypes = {
  pathname: PropTypes.string,
  timeLine: PropTypes.bool,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTimeLine: PropTypes.func,
  onHandleClickDashboard: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
  timeLine: getTimeLine(state),
})

const mapDispatchToProps = {
  changeNavigationSecondary,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleClickTasks: props => () =>
      props.changeNavigationSecondary(routes.user.tasks),
    onHandleClickTimeLine: props => () =>
      props.changeNavigationSecondary(routes.user.tasks, 'timeline'),
    onHandleClickDashboard: props => () =>
      props.changeNavigationSecondary(routes.user.dashboard),
  })
)(NavigationSecondary)
