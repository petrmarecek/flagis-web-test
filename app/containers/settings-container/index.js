import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

// containers
import EditProfilePage from '../edit-profile-page/'
import ChangePasswordPage from '../change-password-page/'

// components
import CenterPanel from 'components/panels/center-panel'
import NavigationAccountSettings from 'components/navigation/navigation-account-settings'

// styles
import styled from 'styled-components'
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
} from 'components/panels/styles'

const SettingsTitle = styled.div`
  margin-left: 17px;
  font-size: 24px;
  font-weight: bold;
  color: #1c2124;
`

const SettingsContainer = ({ match }) => (
  <CenterPanel style={{ backgroundColor: '#fff', margin: 0 }}>
    <CenterPanelTop>
      <CenterPanelTopPrimary>
        <SettingsTitle>Settings</SettingsTitle>
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary bottomBorder>
        <NavigationAccountSettings />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <Switch>
      <Route path={`${match.path}/edit-profile`} component={EditProfilePage} />
      <Route
        path={`${match.path}/change-password`}
        component={ChangePasswordPage}
      />
    </Switch>
  </CenterPanel>
)

SettingsContainer.propTypes = {
  match: PropTypes.any,
}

export default SettingsContainer
