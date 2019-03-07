export const NOTIFICATIONS = {
  FETCH: 'NOTIFICATIONS/FETCH',
  FIREBASE: 'NOTIFICATIONS/FIREBASE',
}

export const fetchNotifications = () => ({
  type: NOTIFICATIONS.FETCH,
})
