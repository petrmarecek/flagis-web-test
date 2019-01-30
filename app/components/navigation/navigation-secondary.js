import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { getTimeLine } from 'redux/store/tasks/tasks.selectors'
import { changeNavigationSecondary } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

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
  const color = '#8C9DA9'
  const colorActive = '#fff'

  return (
    <NavigationSecondaryWrapper>
      <SecondaryButton
        active={isTaskActive}
        onClick={onHandleClickTasks}
        radius="3px 0 0 3px"
        first
      >
        <Icon
          icon={ICONS.TASKS}
          width={19}
          height={15}
          scale={0.75}
          color={isTaskActive ? [colorActive] : [color]}
        />
      </SecondaryButton>
      <SecondaryButton
        active={isTimeLineActive}
        onClick={onHandleClickTimeLine}
      >
        <Icon
          icon={ICONS.TIME_LINE}
          width={18}
          height={15}
          scale={0.6}
          color={isTimeLineActive ? [colorActive] : [color]}
        />
      </SecondaryButton>
      <SecondaryButton
        active={isDashboardActive}
        onClick={onHandleClickDashboard}
        radius="0 3px 3px 0"
      >
        <Icon
          icon={ICONS.DASHBOARD}
          width={15}
          height={15}
          scale={1.36}
          color={isDashboardActive ? [colorActive] : [color]}
        />
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
