import { put, call, select } from 'redux-saga/effects'
import * as tagActions from 'redux/store/tags/tags.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import { deselectPath } from 'redux/store/tree/tree.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import {
  fetch,
  mainUndo
} from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import search from 'redux/services/search'
import { NotificationManager } from 'react-notifications'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'

export function* fetchTags() {
  const result = yield* fetch(tagActions.TAGS.FETCH, {
    method: api.tags.list,
    args: [],
    schema: schema.tagList
  })

  // Initialize search service
  search.tags.resetIndex()
  search.tags.addItems(result)
}

export function* selectActiveTags(action) {
  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))
  yield put(deselectPath())
  yield put(tagActions.setActiveTags(action.payload.tagIds, isArchivedTasks))
}

/**
 * Fetch new task set when tags are selected
 * @param {Object} action Redux action
 */
export function* setActiveTags(action) {
  // Fetch new set
  const isArchivedTasks = action.payload.isArchivedTasks
  const tagIds = action.payload.tagIds
  let fetchAction = TASKS.FETCH
  let actionArgs = [{
    isArchived: false,
    isTrashed: false,
    tags: tagIds,
  }]

  if (isArchivedTasks) {
    fetchAction = TASKS.FETCH_ARCHIVED
    actionArgs = [{
      isArchived: true,
      isCompleted: true,
      isTrashed: false,
      tags: tagIds,
    }]
  }

  yield* fetch(fetchAction, {
    method: api.tasks.search,
    args: actionArgs,
    schema: schema.taskList
  })
}

export function* createTag(action) {
  try {
    // call server and create a new tag
    const data = action.payload.tag
    const tag = yield call(api.tags.create, data)

    // add the tag to the search index
    search.tags.addItem(tag)

    // add the tag to store
    yield put(tagActions.addTag(tag))
  } catch(err) {
    NotificationManager.error('Cannot create tag.', 'Create conflict', 10000)
    console.error('Cannot create tag.', err)
    // TODO: handle error
  }
}

export function* deselectTags() {
  const isTagDetail = yield select(state => appStateSelectors.getTaskTagDetail(state).tag)

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
    yield call(api.tags.update, tag.id, updateData)

  } catch(err) {
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

  yield put(tagActions.deleteTagsRelations(action.payload.originalData.id, null))
  yield* mainUndo(action, 'tag-delete')

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
