import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { logout } from 'redux/store/auth/auth.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { changeNavigation } from 'redux/store/routing/routing.actions'

// components
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  MenuBoxWrapper,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
} from './styles'

const NavigationAccount = props => {
  const {
    pathname,
    accountRef,
    onHandleClickOutSide,
    onHandleClickSettings,
    onHandleClickLogOut,
  } = props
  const { settings } = routes.user.account
  const isSettings = pathname.substring(0, settings.length) === settings

  return (
    <MenuBoxWrapper
      animation="transition.fadeIn"
      menuIcon={accountRef}
      clickOutsideMenu={onHandleClickOutSide}
    >
      <MenuBoxGroup>
        <MenuBoxItemIcon
          icon={ICONS.COG_WHEEL}
          iconScale={0.72}
          active={isSettings}
          type="settings"
          onChange={onHandleClickSettings}
        />
        <MenuBoxItemTitle
          title="Settings"
          active={isSettings}
          type="settings"
          onChange={onHandleClickSettings}
        />
      </MenuBoxGroup>
      <MenuBoxGroup>
        <MenuBoxItemIcon
          icon={ICONS.LOG_OUT}
          iconScale={1}
          onChange={onHandleClickLogOut}
        />
        <MenuBoxItemTitle title="Log Out" onChange={onHandleClickLogOut} />
      </MenuBoxGroup>
    </MenuBoxWrapper>
  )
}

NavigationAccount.propTypes = {
  pathname: PropTypes.string,
  accountRef: PropTypes.object,
  onClickOutSide: PropTypes.func,
  onHandleClickOutSide: PropTypes.func,
  onHandleClickSettings: PropTypes.func,
  onHandleClickLogOut: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeNavigation,
  logout,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleClickOutSide: props => () => props.onClickOutSide(),
    onHandleClickLogOut: props => () => props.logout(),
    onHandleClickSettings: props => () => {
      props.onClickOutSide()
      props.changeNavigation(routes.user.account.settings.editProfile)
    },
  })
)(NavigationAccount)
