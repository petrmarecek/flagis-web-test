import React from 'react'
import PropTypes from 'prop-types'
import { compose, branch, renderComponent, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { setScrollbarPosition } from 'redux/store/app-state/app-state.actions'
import { getScrollbarPosition } from 'redux/store/app-state/app-state.selectors'
import { getNotifications } from 'redux/store/notifications/notifications.selectros'

// components
import NotificationListItem from './notification-list-item'
import ShadowScrollbar from '../common/shadow-scrollbar'
import Loader from '../common/loader'

// styles
import { EmptyList } from 'components/styled-components-mixins'

const NotificationListContainer = ({
  notifications,
  scrollbarPosition,
  onHandleSetScrollbarPosition,
}) => {
  if (notifications.items.length === 0) {
    return <EmptyList>No notifications found</EmptyList>
  }

  const scrollStyle = {
    height: `calc(100vh - 118px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(239, 239, 239, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(239, 239, 239, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar
      style={scrollStyle}
      position={scrollbarPosition}
      setPosition={onHandleSetScrollbarPosition}
    >
      <ul>
        {notifications.items.map(notification => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </ul>
    </ShadowScrollbar>
  )
}

NotificationListContainer.propTypes = {
  notifications: PropTypes.object,
  scrollbarPosition: PropTypes.number,
  onHandleSetScrollbarPosition: PropTypes.func,
}

const mapStateToProps = state => ({
  notifications: getNotifications(state),
  scrollbarPosition: getScrollbarPosition(state, 'notification'),
})

const mapDispatchToProps = { setScrollbarPosition }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(props => props.notifications.isFetching, renderComponent(Loader)),
  withHandlers({
    onHandleSetScrollbarPosition: props => position =>
      props.setScrollbarPosition('notification', position),
  })
)(NotificationListContainer)
