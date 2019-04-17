import React from 'react'

// components
import NotificationMenu from 'components/common/notification-menu'
import NotificationListContainer from '../notification-list'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const NotificationContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder>
        <CenterPageTitle>Notifications</CenterPageTitle>
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary>
        <NotificationMenu />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={108} offsetBottom={10}>
      <NotificationListContainer />
    </CenterPanelScroll>
  </div>
)

export default NotificationContent
