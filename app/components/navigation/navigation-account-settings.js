import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// styles
import { NavigationAccountSettingsWrapper, SettingsButton } from './styles'

const NavigationAccountSettings = props => {
  const {
    pathname,
    onHandleClickEditProfile,
    onHandleClickChangePassword,
  } = props
  const { settings } = routes.user.account

  return (
    <NavigationAccountSettingsWrapper>
      <SettingsButton
        active={pathname === settings.editProfile}
        onClick={onHandleClickEditProfile}
      >
        My Profile
      </SettingsButton>
      <SettingsButton
        active={pathname === settings.changePassword}
        onClick={onHandleClickChangePassword}
      >
        Change password
      </SettingsButton>
    </NavigationAccountSettingsWrapper>
  )
}

NavigationAccountSettings.propTypes = {
  pathname: PropTypes.string,
  onHandleClickEditProfile: PropTypes.func,
  onHandleClickChangePassword: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeNavigation,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleClickEditProfile: props => () =>
      props.changeNavigation(routes.user.account.settings.editProfile),
    onHandleClickChangePassword: props => () =>
      props.changeNavigation(routes.user.account.settings.changePassword),
  })
)(NavigationAccountSettings)
