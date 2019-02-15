import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
} from 'redux/store/app-state/app-state.actions'
import {
  getColorTheme,
  getAccountNavigationVisibility,
} from 'redux/store/app-state/app-state.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { getUsername } from 'redux/store/auth/auth.selectors'

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
} from './styles'
import colors from 'components/styled-components-mixins/colors'

const NavigationDefault = ({
  colorTheme,
  username,
  isVisibleAccountNavigation,
  accountRef,
  getAccountRef,
  onHandleClickLogo,
  onHandleClickAccount,
}) => {
  return (
    <NavigationDefaultWrapper id="navbar">
      <div title="Default display">
        <Icon
          icon={ICONS.LOGO}
          width={67}
          height={24}
          color={[colors[colorTheme].logoIcon]}
          onClick={onHandleClickLogo}
        />
      </div>
      <div>
        <AccountWrapper
          innerRef={getAccountRef}
          title="Account"
          isVisibleAccountNavigation={isVisibleAccountNavigation}
          onClick={onHandleClickAccount}
          colorTheme={colorTheme}
        >
          <TriangleIcon
            icon={ICONS.TRIANGLE}
            width={11}
            height={5}
            color={[colors[colorTheme].navigationDefaultTriangle]}
          />
          <Avatar
            name={`${
              username !== null
                ? `${username.firstName} ${username.lastName}`
                : ''
            }`}
            size="30"
            textSizeRatio={2}
            color={colors.defaultAvatar}
            round
          />
        </AccountWrapper>
        {isVisibleAccountNavigation && (
          <NavigationAccount
            accountRef={accountRef}
            onClick={onHandleClickAccount}
          />
        )}
      </div>
    </NavigationDefaultWrapper>
  )
}

NavigationDefault.propTypes = {
  pathname: PropTypes.string,
  colorTheme: PropTypes.string,
  username: PropTypes.object,
  isVisibleAccountNavigation: PropTypes.bool,
  accountRef: PropTypes.object,
  getAccountRef: PropTypes.func,
  onHandleClickLogo: PropTypes.func,
  onHandleClickAccount: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
  colorTheme: getColorTheme(state),
  username: getUsername(state),
  isVisibleAccountNavigation: getAccountNavigationVisibility(state),
})

const mapDispatchToProps = {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
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
  })
)(NavigationDefault)
