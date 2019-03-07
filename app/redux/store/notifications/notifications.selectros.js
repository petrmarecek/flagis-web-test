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
  const { entitiesNotifications } = data

  let notifications = List()
  entitiesNotifications.forEach(notification => {
    notifications = notifications.push(notification)
  })

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

// ------ Reselect selectors ----------------------------------------------------

export const getNotifications = createSelector(
  getNotificationsIsFetching,
  getEntitiesNotifications,
  (notificationsIsFetching, entitiesNotifications) => {
    const data = { entitiesNotifications }

    return {
      isFetching: notificationsIsFetching,
      items: loadNotifications(data),
    }
  }
)
