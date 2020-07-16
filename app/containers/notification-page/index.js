import React from 'react'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import CenterPanel from 'components/panels/center-panel'
import NotificationContent from 'components/contents/notification-content'

const NotificationPage = () => (
  <div>
    <LeftPanelPrimaryContent />
    <CenterPanel>
      <NotificationContent />
    </CenterPanel>
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
      const { notifications } = routes.user
      const { pathname } = this.props

      if (notifications === pathname) {
        return
      }

      this.props.changeLocation(notifications)
    },
  })
)(NotificationPage)
