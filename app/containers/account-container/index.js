import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import EditProfilePage from '../edit-profile-page/'
import ChangePasswordPage from '../change-password-page/'

const AccountContainer = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/edit-profile`} component={EditProfilePage} />
      <Route
        path={`${match.path}/change-password`}
        component={ChangePasswordPage}
      />
    </Switch>
  </div>
)

AccountContainer.propTypes = {
  match: PropTypes.any,
}

export default AccountContainer
