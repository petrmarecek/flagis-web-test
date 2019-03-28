import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

// containers
import EditProfilePage from '../edit-profile-page/'
import ChangePasswordPage from '../change-password-page/'
import ColorThemePage from '../color-theme-page/'

//components
import NotFoundPage from 'containers/not-found-page/loadable'

const SettingsContainer = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/edit-profile`} component={EditProfilePage} />
    <Route
      path={`${match.path}/change-password`}
      component={ChangePasswordPage}
    />
    <Route path={`${match.path}/color-theme`} component={ColorThemePage} />
    <Route component={NotFoundPage} />
  </Switch>
)

SettingsContainer.propTypes = {
  match: PropTypes.any,
}

export default SettingsContainer
