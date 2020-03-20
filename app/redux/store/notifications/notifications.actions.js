export const NOTIFICATIONS = {
  FETCH: 'NOTIFICATIONS/FETCH',
  FIREBASE: 'NOTIFICATIONS/FIREBASE',
  READ: 'NOTIFICATIONS/READ',
  READ_TASK: 'NOTIFICATIONS/READ_TASK',
  READ_ALL: 'NOTIFICATIONS/READ_ALL',
  READ_VISIBLE: 'NOTIFICATIONS/READ_VISIBLE',
  READ_HIDE: 'NOTIFICATIONS/READ_HIDE',
}

export const fetchNotifications = () => ({
  type: NOTIFICATIONS.FETCH,
})

export const readNotification = (notification, task = null) => ({
  type: NOTIFICATIONS.READ,
  payload: { notification, task },
})

export const readTaskNotifications = taskId => ({
  type: NOTIFICATIONS.READ_TASK,
  payload: { taskId },
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
