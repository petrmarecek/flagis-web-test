import { List } from 'immutable'
import moment from 'moment'
import { getEntitiesNotifications } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads notifications entities
 * @param {Object} data Object of entitiesNotifications and entititesTasks
 * @returns {List} list of notifications
 */

function loadNotifications(data) {
  const { entitiesNotifications, isReadVisible } = data

  let notifications = List()
  entitiesNotifications.forEach(notification => {
    notifications = notifications.push(notification)
  })

  // All or active filters
  if (!isReadVisible) {
    notifications = notifications.filter(
      notification => notification.readAt === null
    )
  }

  // Sort by createdAt
  notifications = notifications.sort((a, b) => {
    if (moment(a.createdAt) < moment(b.createdAt)) return -1
    if (moment(a.createdAt) > moment(b.createdAt)) return 1

    return 0
  })

  return notifications.toArray()
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getNotificationsIsFetching = state =>
  state.getIn(['notifications', 'isFetching'])

// Export selectors
export const getReadNotificationsVisibility = state =>
  state.getIn(['notifications', 'isReadVisible'])

// ------ Reselect selectors ----------------------------------------------------

export const getNotifications = createSelector(
  getNotificationsIsFetching,
  getReadNotificationsVisibility,
  getEntitiesNotifications,
  (notificationsIsFetching, isReadVisible, entitiesNotifications) => {
    const data = { entitiesNotifications, isReadVisible }

    return {
      isFetching: notificationsIsFetching,
      items: loadNotifications(data),
    }
  }
)