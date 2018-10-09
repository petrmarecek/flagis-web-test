import schema from '../../data/schema'

export const FOLLOWERS = {
  CREATE: 'FOLLOWERS/CREATE',
  ADD: 'FOLLOWERS/ADD',
  SEND_TASK: 'FOLLOWERS/SEND_TASK',
  ACCEPT_TASK: 'FOLLOWERS/ACCEPT_TASK',
  REJECT_TASK: 'FOLLOWERS/REJECT_TASK',
  DELETE: 'FOLLOWERS/DELETE',
}

export const createFollower = (taskId, userId, type = 'assignee') => ({
  type: FOLLOWERS.CREATE,
  payload: {
    taskId,
    userId,
    type
  },
})

export const addFollower = follower => ({
  type: FOLLOWERS.ADD,
  payload: follower,
  meta: { schema: schema.follower }
})

export const sendTaskToFollowers = (taskId, followerId) => ({
  type: FOLLOWERS.SEND_TASK,
  payload: {
    taskId,
    followerId
  },
})

export const followerAcceptTask = (taskId, followerId) => ({
  type: FOLLOWERS.ACCEPT_TASK,
  payload: {
    taskId,
    followerId
  },
})

export const followerRejectTask = (taskId, followerId) => ({
  type: FOLLOWERS.REJECT_TASK,
  payload: {
    taskId,
    followerId
  },
})

export const deleteFollower = (taskId, userId, followerId) => ({
  type: FOLLOWERS.DELETE,
  payload: {
    taskId,
    userId,
    followerId
  },
})

