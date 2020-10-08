import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { titles } from 'utils/titles-enums'

// components
import { withTitle } from 'components/head-title/withTitle'

// containers
import EditProfilePage from '../edit-profile-page/'
import ChangePasswordPage from '../change-password-page/'
import ColorThemePage from '../color-theme-page/'
import UserContactUsPage from '../user-contact-us-page/'
import NotFoundPage from 'containers/not-found-page/loadable'

// adding title
const EditProfilePageWithTitle = withTitle({
  component: EditProfilePage,
  title: titles.SETTINGS_EDIT_PROFILE,
})
const ChangePasswordWithTitle = withTitle({
  component: ChangePasswordPage,
  title: titles.SETTINGS_CHANGE_PASSWORD,
})
const ColorThemePageWithTitle = withTitle({
  component: ColorThemePage,
  title: titles.SETTINGS_COLOR_THEME,
})
const UserContactUsPageWithTitle = withTitle({
  component: UserContactUsPage,
  title: titles.SETTINGS_CONTACT_US,
})
const NotFoundPageWithTitle = withTitle({
  component: NotFoundPage,
  title: titles.NOT_FOUND,
})

const SettingsContainer = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/edit-profile`}
      component={EditProfilePageWithTitle}
    />
    <Route
      path={`${match.path}/change-password`}
      component={ChangePasswordWithTitle}
    />
    <Route
      path={`${match.path}/color-theme`}
      component={ColorThemePageWithTitle}
    />
    <Route
      path={`${match.path}/contact-us`}
      component={UserContactUsPageWithTitle}
    />
    <Route component={NotFoundPageWithTitle} />
  </Switch>
)

SettingsContainer.propTypes = {
  match: PropTypes.any,
}

export default SettingsContainer
