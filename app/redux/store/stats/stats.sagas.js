import { callApi, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import { STATS } from 'redux/store/stats/stats.actions'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import { put, select } from 'redux-saga/effects'

export function* fetchStats() {
  const { PENDING, FULFILLED } = createLoadActions(STATS.FETCH)

  // Load selected tags
  const tagsIds = yield select(state => tagSelectors.getActiveTagsIds(state))

  // Fetch
  yield put({ type: PENDING })
  const stats = yield callApi(api.stats.loadStats, { tags: tagsIds })

  // Write results
  yield put({ type: FULFILLED, payload: stats })
}
