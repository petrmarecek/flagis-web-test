import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigationSecondary } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// styles
import {
  NavigationSecondaryWrapper,
  SecondaryButtonsWrapper,
  SecondaryButton,
} from './styles'

const NavigationSecondary = props => {
  const { pathname, onHandleClickTasks, onHandleClickDashboard } = props
  const { user } = routes

  const isTaskActive = pathname === user.tasks
  const isDashboardActive = pathname === user.dashboard

  return (
    <NavigationSecondaryWrapper>
      <SecondaryButtonsWrapper>
        <SecondaryButton
          active={isTaskActive}
          onClick={onHandleClickTasks}
          title="My Tasks"
        >
          List
        </SecondaryButton>
        <SecondaryButton
          active={isDashboardActive}
          onClick={onHandleClickDashboard}
          title="Charts and statistics of My Tasks"
        >
          Charts
        </SecondaryButton>
      </SecondaryButtonsWrapper>
    </NavigationSecondaryWrapper>
  )
}

NavigationSecondary.propTypes = {
  pathname: PropTypes.string,
  onHandleClickTasks: PropTypes.func,
  onHandleClickDashboard: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeNavigationSecondary,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickTasks: props => () =>
      props.changeNavigationSecondary(routes.user.tasks),
    onHandleClickDashboard: props => () =>
      props.changeNavigationSecondary(routes.user.dashboard),
  })
)(NavigationSecondary)
