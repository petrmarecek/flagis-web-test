import React from 'react'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import SettingsNotificationsContent from 'components/contents/settings-notifications-content'

const SettingsNotificationsPage = () => (
  <div>
    <LeftPanelPrimaryContent />
    <SettingsNotificationsContent />
  </div>
)

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = { changeLocation }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { settingsNotifications } = routes.user.account.settings
      const { pathname } = this.props

      if (settingsNotifications === pathname) {
        return
      }

      this.props.changeLocation(settingsNotifications)
    },
  })
)(SettingsNotificationsPage)
