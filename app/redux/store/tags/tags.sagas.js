import {
  all,
  put,
  call,
  select,
  cancelled,
  fork,
  take,
} from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { push } from 'react-router-redux'

import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import { deselectPath } from 'redux/store/tree/tree.actions'
import {
  fetch,
  mainUndo,
  createLoadActions,
  callApi,
} from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import search from 'redux/services/search'
import firebase from 'redux/utils/firebase'

const TAGS = tagActions.TAGS

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(TAGS.FIREBASE)
  const tag = change.doc.data()

  // Prepare data
  const normalizeData = normalize(tag, schema.tag)
  const storeItems = yield select(state => tagSelectors.getTagsItems(state))
  const isDetailVisible = yield select(state =>
    appStateSelectors.getDetail(state)
  )

  const { id, isDeleted } = tag

  // Update search
  if (!storeItems.includes(id)) {
    // Add new tag to search
    search.tags.addItem(tag)
  } else {
    // Update tag in search
    search.tags.updateItem(tag)
  }

  // Delete tag
  if (isDeleted) {
    // Close tag detail
    if (isDetailVisible.tag) {
      yield put(appStateActions.deselectDetail('tag'))
    }

    // Delete tag from search
    search.tags.removeItem({ id })
  }

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncTagsChannel(channel) {
  const { REJECTED } = createLoadActions(TAGS.FIREBASE)

  try {
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change => call(saveChangeFromFirestore, change))
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

export function* fetchTags() {
  const result = yield* fetch(tagActions.TAGS.FETCH, {
    method: api.tags.list,
    args: [],
    schema: schema.tags,
  })

  // Initialize search service
  search.tags.resetIndex()
  search.tags.addItems(result)
}

export function* initTagsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getTagsChannel(userId, initTime)
  return yield fork(syncTagsChannel, channel)
}

export function* selectActiveTags(action) {
  yield put(deselectPath())
  yield put(taskMenuActions.deselectNoTagsFilter())
  yield put(tagActions.setActiveTags(action.payload.tagIds))
}

export function* createTag(action) {
  try {
    // call server and create a new tag
    const data = action.payload.tag
    const tag = yield callApi(api.tags.create, data)

    // add the tag to the search index
    search.tags.addItem(tag)

    // add the tag to store
    yield put(tagActions.addTag(tag))
  } catch (err) {
    toast.error(errorMessages.tags.createConflict, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_ERROR_DURATION,
    })
  }
}

export function* selectTags(action) {
  const { tagId } = action.payload

  yield put(push(`/user/tags/${tagId}`))
}

export function* deselectTags() {
  const isTagDetail = yield select(
    state => appStateSelectors.getDetail(state).tag
  )

  if (isTagDetail) {
    yield put(appStateActions.deselectDetail('tag'))
  }
}

export function* update(action) {
  const tag = action.payload.tag
  const type = action.payload.type
  const data = action.payload.data
  const originalData = tag[type]

  try {
    // call server
    const updateData = { [type]: data }
    yield callApi(api.tags.update, tag.id, updateData)
  } catch (err) {
    // log error
    console.error('Error occured during tag update', err)

    // revert to original values
    yield put(tagActions.updateTag(tag, originalData, type))
  }
}

export function* deleteTag(action) {
  yield* fetch(tagActions.TAGS.DELETE, {
    method: api.tags.delete,
    args: [action.payload.originalData.id],
    schema: null,
  })

  yield put(
    tagActions.deleteTagsRelations(action.payload.originalData.id, null)
  )
  yield* mainUndo(action, 'tagDelete')

  // delete tag from the search index
  search.tags.removeItem({ id: action.payload })
}

export function* undoDeleteTag(action) {
  const createData = {
    title: action.payload.title,
    description: action.payload.description,
    colorIndex: action.payload.colorIndex,
  }

  yield put(tagActions.createTag(createData))
}

export function* fetchTagsRelations() {
  yield* fetch(tagActions.TAGS.FETCH_TAGS_RELATIONS, {
    method: api.tags.relations,
    args: [],
    schema: null,
  })
}
