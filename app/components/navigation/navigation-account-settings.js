import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// styles
import { NavigationAccountSettingsWrapper, SettingsButton } from './styles'

const NavigationAccountSettings = ({ pathname, changeNavigation }) => {
  const { settings } = routes.user.account

  const handleClickEditProfile = () => changeNavigation(settings.editProfile)

  const handleClickChangePassword = () =>
    changeNavigation(settings.changePassword)

  const handleClickSettingsNotifications = () =>
    changeNavigation(settings.notifications)

  const handleClickColorTheme = () => changeNavigation(settings.colorTheme)

  const handleClickContactUs = () => changeNavigation(settings.contactUs)

  return (
    <NavigationAccountSettingsWrapper>
      <SettingsButton
        active={pathname === settings.editProfile}
        onClick={handleClickEditProfile}
      >
        My Profile
      </SettingsButton>
      <SettingsButton
        active={pathname === settings.changePassword}
        onClick={handleClickChangePassword}
      >
        Change Password
      </SettingsButton>
      <SettingsButton
        active={pathname === settings.notifications}
        onClick={handleClickSettingsNotifications}
      >
        Notifications
      </SettingsButton>
      <SettingsButton
        active={pathname === settings.colorTheme}
        onClick={handleClickColorTheme}
      >
        Color Theme
      </SettingsButton>
      <SettingsButton
        active={pathname === settings.contactUs}
        onClick={handleClickContactUs}
      >
        Contact Us
      </SettingsButton>
    </NavigationAccountSettingsWrapper>
  )
}

NavigationAccountSettings.propTypes = {
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeNavigation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationAccountSettings)
