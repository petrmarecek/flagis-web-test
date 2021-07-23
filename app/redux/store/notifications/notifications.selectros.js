import { List } from 'immutable'
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

  if (!isReadVisible) {
    // Get only unread notifications
    notifications = notifications
      .filter(notification => notification.readAt === null)
      .sortBy(notification => notification.updatedAt)
      .reverse()
  } else {
    // Get all notifications
    // Unread notifications as first
    let unReadList = List()
    let readList = List()

    notifications.forEach(notification => {
      if (notification.readAt === null) {
        unReadList = unReadList.push(notification)
      } else {
        readList = readList.push(notification)
      }
    })

    unReadList = unReadList
      .sortBy(notification => notification.updatedAt)
      .reverse()
    readList = readList.sortBy(notification => notification.readAt).reverse()

    notifications = unReadList.concat(readList)
  }

  return notifications.toArray()
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getNotificationsIsFetching = state =>
  state.getIn(['notifications', 'isFetching'])

// Export selectors
export const getReadNotificationsVisibility = state =>
  state.getIn(['notifications', 'isReadVisible'])

export const getNotificationsForTaskId = (state, taskId) => {
  const entitiesNotifications = getEntitiesNotifications(state)

  const notificationsForTaskId = entitiesNotifications.filter(
    notification => notification.taskId === taskId
  )

  return notificationsForTaskId.toArray()
}

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
