import { normalize } from 'normalizr'

// toast notifications
import { toast } from 'react-toastify'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { push } from 'react-router-redux'
import {
  all,
  put,
  call,
  select,
  cancelled,
  fork,
  take,
} from 'redux-saga/effects'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as treeSelectors from 'redux/store/tree/tree.selectors'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import { deselectPath } from 'redux/store/tree/tree.actions'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
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

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.FIRESTORE,
        tagValue: 'SYNC_TAGS',
        breadcrumbCategory: sentryBreadcrumbCategory.FIRESTORE,
        breadcrumbMessage: 'SYNC_TAGS',
      })
    )
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
    toast.error(toastCommon.errorMessages.tags.createConflict, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.ERROR_DURATION,
    })

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
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
    // revert to original values
    yield put(tagActions.updateTag(tag, originalData, type))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* prepareDeleteTag(action) {
  const { tag } = action.payload
  const tagId = tag.id
  const tagsRelations = yield select(state =>
    tagSelectors.getTagsRelations(state)
  )
  const tagsReferences = yield select(state =>
    treeSelectors.getTagsReferences(state)
  )
  const isReferenced = tagsReferences.has(tagId)
  const isTagsRelations = tagsRelations.has(tagId)

  if (isReferenced) {
    toast.error(toastCommon.errorMessages.tags.referenceDeleteConflict, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.ERROR_DURATION,
    })
    return
  }

  if (isTagsRelations) {
    if (tagsRelations.getIn([tagId]).size > 0) {
      toast.error(
        toastCommon.errorMessages.relations.relationDeleteConflict('tag', 'My Tasks'),
        {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.ERROR_DURATION,
        }
      )
      return
    }
  }

  // Delete tag
  yield put(tagActions.deselectTags())
  yield put(tagActions.deleteTag(tag))

  // Delete tag from activeTags if the tag in activeTags
  const activeTags = yield select(state => tagSelectors.getActiveTagsIds(state))
  const tagIds = activeTags.includes(tagId)
    ? activeTags.filter(id => id !== tagId)
    : activeTags
  yield put(tagActions.setActiveTags(tagIds))
}

export function* deleteTag(action) {
  try {
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
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
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
