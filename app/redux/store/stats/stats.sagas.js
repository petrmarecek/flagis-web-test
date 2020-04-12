import { callApi, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import { STATS } from 'redux/store/stats/stats.actions'
import { put } from 'redux-saga/effects'

export function* fetchStats() {
  const { PENDING, FULFILLED } = createLoadActions(STATS.FETCH)

  // Fetch
  yield put({ type: PENDING })
  const stats = yield callApi(api.stats.getStats)

  // Write results
  yield put({ type: FULFILLED, payload: stats })
}
