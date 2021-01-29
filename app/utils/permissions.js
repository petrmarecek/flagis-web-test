import _ from 'lodash'
import { FOLLOWER_STATUS, TASK_ACTIONS } from './constants'

const isTaskActionAllowed = (task, actionName) => {
  switch (actionName) {
    case TASK_ACTIONS.ACCEPT:
      return !task.isOwner
        && task.followers.count()
        && task.followers.get(0).status === FOLLOWER_STATUS.PENDING

    case TASK_ACTIONS.ADD_ATTACHMENT:
      return task.isOwner
        || (task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.ACCEPTED)

    case TASK_ACTIONS.ADD_COMMENT:
      return true

    case TASK_ACTIONS.ADD_FOLLOWER:
      return task.isOwner && !task.isCompleted && task.followers.isEmpty()

    case TASK_ACTIONS.CHANGE_ORDER:
      return !task.isArchived
        && (task.isOwner
          || (task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.ACCEPTED))

    case TASK_ACTIONS.DELETE_FOLLOWER:
      return task.isOwner
        && task.followers.count()
        && _.includes(
          [FOLLOWER_STATUS.NEW, FOLLOWER_STATUS.REJECTED],
          task.followers.get(0).status,
        )

    case TASK_ACTIONS.DELETE_TASK:
      return task.isOwner
        && (
          !task.followers.count()
          || _.includes(
            [FOLLOWER_STATUS.NEW, FOLLOWER_STATUS.REJECTED],
            task.followers.get(0).status,
          )
        )

    case TASK_ACTIONS.REJECT_TASK:
      return !task.isOwner
        && !task.isCompleted
        && task.followers.count()
        && _.includes(
          [FOLLOWER_STATUS.PENDING, FOLLOWER_STATUS.ACCEPTED],
          task.followers.get(0).status,
        )

    case TASK_ACTIONS.SEND_TASK:
      return task.isOwner
        && !task.isCompleted
        && task.followers.count()
        && task.followers.get(0).status === FOLLOWER_STATUS.NEW

    case TASK_ACTIONS.TAKE_BACK:
      return task.isOwner
        && task.followers.count()
        && !task.isCompleted
        && _.includes(
          [FOLLOWER_STATUS.PENDING, FOLLOWER_STATUS.ACCEPTED],
          task.followers.get(0).status,
        )

    case TASK_ACTIONS.TOGGLE_ARCHIVED:
      return task.isCompleted || task.isArchived

    case TASK_ACTIONS.TOGGLE_COMPLETED:
      if (task.isArchived) {
        return false
      }

      return !(task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.PENDING)

    case TASK_ACTIONS.TOGGLE_IMPORTANT:
      return (
        task.isOwner
        || (task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.ACCEPTED)
      ) && !task.isCompleted

    case TASK_ACTIONS.UPDATE_DESCRIPTION:
    case TASK_ACTIONS.UPDATE_DUE_DATE:
    case TASK_ACTIONS.UPDATE_SUBJECT:
      return task.isOwner
        && !task.isCompleted
        && (
          !task.followers.count()
          || _.includes(
            [FOLLOWER_STATUS.NEW, FOLLOWER_STATUS.REJECTED],
            task.followers.get(0).status,
          )
        )

    case TASK_ACTIONS.UPDATE_REMINDER_DATE:
      return (
        task.isOwner
        || (task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.ACCEPTED)
      ) && !task.isCompleted

    case TASK_ACTIONS.UPDATE_TAGS:
      return (
        task.isOwner
        || (task.followers.count() && task.followers.get(0).status === FOLLOWER_STATUS.ACCEPTED)
      ) && !task.isCompleted

    default:
      return false
  }
}

const checkTaskAction = (task, actionName, reference, ...props) =>
  isTaskActionAllowed(task, actionName) ? reference(...props) : null

export {
  TASK_ACTIONS,
  isTaskActionAllowed,
  checkTaskAction,
}
