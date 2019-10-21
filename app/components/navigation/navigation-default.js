import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
} from 'redux/store/app-state/app-state.actions'
import { getAccountNavigationVisibility } from 'redux/store/app-state/app-state.selectors'
import { getCountActiveNotification } from 'redux/store/entities/entities.selectors'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  getUsername,
  getUserPhoto,
  getColorTheme,
} from 'redux/store/auth/auth.selectors'

// components
import Avatar from 'react-avatar'
import NavigationAccount from 'components/navigation/navigation-account'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  TriangleIcon,
  NavigationDefaultWrapper,
  AccountWrapper,
  AccountNotificationsWrapper,
  NotificationsWrapper,
  NotificationsCounter,
} from './styles'
import colors from 'components/styled-components-mixins/colors'

const NavigationDefault = ({
  pathname,
  colorTheme,
  username,
  imageUrl,
  isVisibleAccountNavigation,
  notificationsCount,
  accountRef,
  getAccountRef,
  onHandleClickLogo,
  onHandleClickAccount,
  onHandleClickNotifications,
}) => {
  const { user } = routes
  const isNotificationsActive =
    pathname.substring(0, user.notifications.length) === user.notifications

  return (
    <NavigationDefaultWrapper id="navbar">
      <div title="Default display">
        <Icon
          icon={ICONS.LOGO}
          width={67}
          height={25}
          color={[colors[colorTheme].logoIcon]}
          onClick={onHandleClickLogo}
        />
      </div>
      <AccountNotificationsWrapper>
        <NotificationsWrapper onClick={onHandleClickNotifications}>
          <Icon
            icon={ICONS.NOTIFICATIONS}
            width={17}
            height={19}
            color={isNotificationsActive ? ['#fff'] : ['#676D71']}
            hoverColor={['#fff']}
          />
          {notificationsCount > 0 && (
            <NotificationsCounter count={notificationsCount} />
          )}
        </NotificationsWrapper>
        <div>
          <AccountWrapper
            innerRef={getAccountRef}
            title="Account"
            isVisibleAccountNavigation={isVisibleAccountNavigation}
            onClick={onHandleClickAccount}
            colorTheme={colorTheme}
          >
            <Avatar
              src={imageUrl}
              size="30"
              textSizeRatio={2}
              color={colors.defaultAvatar}
              round
              name={`${
                username !== null
                  ? `${username.firstName} ${username.lastName}`
                  : ''
              }`}
            />
            <TriangleIcon
              icon={ICONS.TRIANGLE}
              width={11}
              height={5}
              color={[colors[colorTheme].navigationDefaultTriangle]}
            />
          </AccountWrapper>
          {isVisibleAccountNavigation && (
            <NavigationAccount
              accountRef={accountRef}
              onClickOutSide={onHandleClickAccount}
            />
          )}
        </div>
      </AccountNotificationsWrapper>
    </NavigationDefaultWrapper>
  )
}

NavigationDefault.propTypes = {
  pathname: PropTypes.string,
  imageUrl: PropTypes.string,
  colorTheme: PropTypes.string,
  username: PropTypes.object,
  isVisibleAccountNavigation: PropTypes.bool,
  notificationsCount: PropTypes.number,
  accountRef: PropTypes.object,
  getAccountRef: PropTypes.func,
  onHandleClickLogo: PropTypes.func,
  onHandleClickAccount: PropTypes.func,
  onHandleClickNotifications: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
  imageUrl: getUserPhoto(state),
  colorTheme: getColorTheme(state),
  username: getUsername(state),
  isVisibleAccountNavigation: getAccountNavigationVisibility(state),
  notificationsCount: getCountActiveNotification(state),
})

const mapDispatchToProps = {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
  changeNavigation,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(() => ({ accountRef: null }), {
    getAccountRef: () => ref => ({ accountRef: ref }),
    onHandleClickLogo: (state, props) => () => {
      props.defaultDisplay()
      return {}
    },
    onHandleClickAccount: (state, props) => () => {
      if (props.isVisibleAccountNavigation) {
        props.accountNavigationHide()
        return {}
      }

      props.accountNavigationVisible()
      return {}
    },
    onHandleClickNotifications: (state, props) => () =>
      props.changeNavigation(routes.user.notifications),
  })
)(NavigationDefault)
