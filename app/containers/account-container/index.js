import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import ArchivePage from '../archive-page/'
import ContactPage from '../contact-page/'
import EditProfilePage from '../edit-profile-page/'
import ChangePasswordPage from '../change-password-page/'

const AccountContainer = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/archive`} component={ArchivePage} />
      <Route path={`${match.path}/contacts`} component={ContactPage} />
      <Route path={`${match.path}/edit-profile`} component={EditProfilePage} />
      <Route path={`${match.path}/change-password`} component={ChangePasswordPage} />
    </Switch>
  </div>
)

AccountContainer.propTypes = {
  match: PropTypes.any,
}

export default AccountContainer
