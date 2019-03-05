import {
  all,
  select,
  cancelled,
  cancel,
  fork,
  put,
  take,
} from 'redux-saga/effects'
import { normalize } from 'normalizr'

import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as activitiesActions from 'redux/store/activities/activities.actions'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import { fetch, createLoadActions, callApi } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'

const APP_STATE = appStateActions.APP_STATE
const ACTIVITIES = activitiesActions.ACTIVITIES

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(ACTIVITIES.FIREBASE)
  const activitie = change.doc.data()

  // Prepare data
  const normalizeData = normalize(activitie, schema.activitie)

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncActivitiesChannel(channel) {
  const { REJECTED } = createLoadActions(ACTIVITIES.FIREBASE)

  try {
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change => callApi(saveChangeFromFirestore, change))
      )
    }
  } catch (err) {
    yield put({ type: REJECTED, err })
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* fetchActivities(action) {
  yield* fetch(ACTIVITIES.FETCH, {
    method: api.activities.get,
    args: [action.payload],
    schema: schema.activities,
  })
}

export function* initActivitiesData() {
  while (true) {
    // eslint-disable-line
    let detail = (yield take(APP_STATE.SET_DETAIL)).payload.detail

    if (detail === 'task' || detail === 'inbox') {
      const initTime = dateUtil.getDateToISOString()
      const taskId = yield select(state =>
        taskSelectors.getSelectionTasks(state).first()
      )

      // Start syncing task comments with firestore
      const channel = firebase.getActivitiesChannel(taskId, initTime)
      const activitiesSyncing = yield fork(syncActivitiesChannel, channel)

      // Wait for cancel
      detail = yield take(APP_STATE.DESELECT_DETAIL)

      // Cancel syncing
      yield cancel(activitiesSyncing)
    }
  }
}
