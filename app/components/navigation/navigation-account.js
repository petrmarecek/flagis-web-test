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
    onHandleClick,
    onHandleClickChangePassword,
    onHandleClickEditProfile,
    onHandleClickLogOut,
  } = props
  const { account } = routes.user

  return (
    <div onClick={onHandleClick}>
      <MenuBoxWrapper
        animation="transition.fadeIn"
        menuIcon={accountRef}
        clickOutsideMenu={onHandleClick}
      >
        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.ACCOUNT}
            iconScale={0.72}
            active={pathname === account.editProfile}
            type="editProfile"
            onChange={onHandleClickEditProfile}
          />
          <MenuBoxItemTitle
            title="Edit My Profile"
            active={pathname === account.editProfile}
            type="editProfile"
            onChange={onHandleClickEditProfile}
          />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.LOCK}
            iconScale={0.42}
            active={pathname === account.changePassword}
            type="changePassword"
            onChange={onHandleClickChangePassword}
          />
          <MenuBoxItemTitle
            title="Change Password"
            active={pathname === account.changePassword}
            type="changePassword"
            onChange={onHandleClickChangePassword}
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
    </div>
  )
}

NavigationAccount.propTypes = {
  pathname: PropTypes.string,
  accountRef: PropTypes.object,
  onClick: PropTypes.func,
  onHandleClick: PropTypes.func,
  onHandleClickEditProfile: PropTypes.func,
  onHandleClickChangePassword: PropTypes.func,
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
    onHandleClick: props => () => props.onClick(),
    onHandleClickLogOut: props => () => props.logout(),
    onHandleClickEditProfile: props => () =>
      props.changeNavigation(routes.user.account.editProfile),
    onHandleClickChangePassword: props => () =>
      props.changeNavigation(routes.user.account.changePassword),
  })
)(NavigationAccount)
