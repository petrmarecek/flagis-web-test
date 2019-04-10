import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { getCountActiveNotification } from 'redux/store/entities/entities.selectors'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import { NavigationNotificationsWrapper, NotificationsCounter } from './styles'

const NavigationNotifications = ({
  notificationsCount,
  pathname,
  onHandleClickNotifications,
}) => {
  const { user } = routes
  const isNotificationsActive =
    pathname.substring(0, user.notifications.length) === user.notifications

  return (
    <NavigationNotificationsWrapper onClick={onHandleClickNotifications}>
      <Icon
        icon={ICONS.NOTIFICATIONS}
        width={17}
        height={19}
        color={isNotificationsActive ? ['#1c2124'] : ['#676D71']}
        hoverColor={['#1c2124']}
      />
      {notificationsCount > 0 && (
        <NotificationsCounter count={notificationsCount} />
      )}
    </NavigationNotificationsWrapper>
  )
}

NavigationNotifications.propTypes = {
  notificationsCount: PropTypes.number,
  pathname: PropTypes.string,
  onHandleClickNotifications: PropTypes.func,
}

const mapStateToProps = state => ({
  notificationsCount: getCountActiveNotification(state),
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = { changeNavigation }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleClickNotifications: props => () =>
      props.changeNavigation(routes.user.notifications),
  })
)(NavigationNotifications)
