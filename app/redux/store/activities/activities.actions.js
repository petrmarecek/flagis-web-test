export const ACTIVITIES = {
  FETCH: 'ACTIVITIES/FETCH',
  FIREBASE: 'ACTIVITIES/FIREBASE',
}

export const fetchActivities = taskId => ({
  type: ACTIVITIES.FETCH,
  payload: taskId,
})
