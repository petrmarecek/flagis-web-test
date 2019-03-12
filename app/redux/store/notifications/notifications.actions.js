export const NOTIFICATIONS = {
  FETCH: 'NOTIFICATIONS/FETCH',
  FIREBASE: 'NOTIFICATIONS/FIREBASE',
  READ: 'NOTIFICATIONS/READ',
  READ_ALL: 'NOTIFICATIONS/READ_ALL',
  READ_VISIBLE: 'NOTIFICATIONS/READ_VISIBLE',
  READ_HIDE: 'NOTIFICATIONS/READ_HIDE',
}

export const fetchNotifications = () => ({
  type: NOTIFICATIONS.FETCH,
})

export const readNotification = (notification, isRedirect) => ({
  type: NOTIFICATIONS.READ,
  payload: { notification, isRedirect },
})

export const readAllNotifications = () => ({
  type: NOTIFICATIONS.READ_ALL,
})

export const visibleReadNotifications = () => ({
  type: NOTIFICATIONS.READ_VISIBLE,
})

export const hideReadNotifications = () => ({
  type: NOTIFICATIONS.READ_HIDE,
})
