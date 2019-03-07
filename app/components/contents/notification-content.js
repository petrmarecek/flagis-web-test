import React from 'react'

// components
import NavigationNotifications from 'components/navigation/navigation-notifications'
import NotificationListContainer from '../notification-list'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const NotificationContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder flexEnd>
        <NavigationNotifications />
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary flexEnd>Delete All</CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={104} offsetBottom={10}>
      <NotificationListContainer />
    </CenterPanelScroll>
  </div>
)

export default NotificationContent
