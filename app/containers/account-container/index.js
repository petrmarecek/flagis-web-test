import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { titles } from 'utils/titles-enums'

// components
import { withTitle } from 'components/head-title/withTitle'

// containers
import SettingsContainer from 'containers/settings-container'
import NotFoundPage from 'containers/not-found-page/loadable'

// adding title
const NotFoundPageWithTitle = withTitle({
  Component: NotFoundPage,
  title: titles.NOT_FOUND,
})

const AccountContainer = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}/settings`} component={SettingsContainer} />
      <Route component={NotFoundPageWithTitle} />
    </Switch>
  </div>
)

AccountContainer.propTypes = {
  match: PropTypes.any,
}

export default AccountContainer
