import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

// containers
import SettingsContainer from 'containers/settings-container'
import NotFoundPage from 'containers/not-found-page/loadable'

const AccountContainer = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/settings`} component={SettingsContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
)

AccountContainer.propTypes = {
  match: PropTypes.any,
}

export default AccountContainer
