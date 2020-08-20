import schema from '../../data/schema'

export const FOLLOWERS = {
  CREATE: 'FOLLOWERS/CREATE',
  ADD: 'FOLLOWERS/ADD',
  DELETE: 'FOLLOWERS/DELETE',
}

export const createFollower = (taskId, userId, type = 'assignee') => ({
  type: FOLLOWERS.CREATE,
  payload: {
    taskId,
    userId,
    type,
  },
})

export const addFollower = follower => ({
  type: FOLLOWERS.ADD,
  payload: follower,
  meta: { schema: schema.follower },
})

export const deleteFollower = (taskId, userId, followerId) => ({
  type: FOLLOWERS.DELETE,
  payload: {
    taskId,
    userId,
    followerId,
  },
})
