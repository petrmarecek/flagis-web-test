import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

// containers
import SettingsContainer from 'containers/settings-container'

const AccountContainer = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/settings`} component={SettingsContainer} />
    </Switch>
  </div>
)

AccountContainer.propTypes = {
  match: PropTypes.any,
}

export default AccountContainer
