import React from 'react'

// components
import NotificationMenu from 'components/common/notification-menu'
import NotificationListContainer from '../notification-list'

// styles
import {
  CenterPanelTop,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const NotificationContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopSecondary>
        <NotificationMenu />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={48} offsetBottom={10}>
      <NotificationListContainer />
    </CenterPanelScroll>
  </div>
)

export default NotificationContent
