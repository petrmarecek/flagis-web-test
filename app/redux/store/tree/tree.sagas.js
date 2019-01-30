import { normalize } from 'normalizr'
import { all, take, cancelled, fork, call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import intersection from 'lodash/intersection'
import includes from 'lodash/includes'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import { routes } from 'utils/routes'
import { Map } from 'immutable'

import {
  createLoadActions,
  fetch,
  mainUndo,
} from 'redux/store/common.sagas'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import * as treeSelectors from 'redux/store/tree/tree.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
import * as routingSelectors from 'redux/store/routing/routing.selectors'
import { computeTreeItemOrder } from 'redux/utils/redux-helper'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'

const TREE = treeActions.TREE

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(TREE.FIREBASE)
  const treeItem = change.doc.data()

  // Prepare data
  const normalizeData = normalize(treeItem, schema.treeItem)
  const storeAddControlParentId = yield select(state => treeSelectors.getAddControlParentId(state))
  const storeSelection = yield select(state => treeSelectors.getSelectionTree(state))
  let storeActiveTags = yield select(state => tagSelectors.getActiveTagsIds(state))
  const { id, isDeleted, tagId } = treeItem

  // Delete treeItem
  if (isDeleted) {
    // Hide add control panel
    if (storeAddControlParentId === id) {
      yield put(treeActions.hideTreeItemAddControl())
    }

    // Deselect path
    if (storeSelection.includes(id)) {
      yield put(treeActions.deselectPath())
    }

    // Remove treeItem from tagSearch
    if (storeActiveTags.includes(tagId)) {
      storeActiveTags = storeActiveTags.filter(activeId => activeId !== tagId)
      yield put(tagActions.setActiveTags(storeActiveTags))
    }

  }

  //TODO: Delete treeItem -> Hide add control panel and deselect tags

  // Save changes to store
  yield put({type: FULFILLED, payload: normalizeData})
}

function* syncTagTreeItemsChannel(channel) {
  const { REJECTED } = createLoadActions(TREE.FIREBASE)

  try {
    while (true) { // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(snapshot.docChanges().map(change => call(saveChangeFromFirestore, change)))
    }
  } catch(err) {
    yield put({ type: REJECTED, err })

  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* fetchTree() {
  yield* fetch(TREE.FETCH, {
    method: api.tree.get,
    args: [],
    schema: schema.trees
  })
}

export function* initTagTreeItemsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getTagTreeItemsChannel(userId, initTime)
  return yield fork(syncTagTreeItemsChannel, channel)
}

export function* createTreeItem(action) {
  try {

    // hide controls for adding tree items
    yield put(treeActions.hideTreeItemAddControl())

    // TODO: Optimistic update

    const data = {
      title: action.payload.title,
      parentId: action.payload.parentId,
      order: action.payload.order
    }

    // call server
    const item = yield call(api.tree.create, data)

    // add tree item to the store
    yield put(treeActions.addTreeItem(item))

  } catch (error) {
    // TODO: Error
  }
}

export function* selectPath(action) {
  yield put(taskActions.deselectTasks())
  yield put(tagActions.deselectTags())

  const isInboxTasks = yield select(state => appStateSelectors.getInboxTasksVisibility(state))
  if (isInboxTasks) {
    yield put(appStateActions.hideInboxTasks())
  }

  const location = yield select(state => routingSelectors.getRoutingPathname(state))
  if (location !== routes.user.tasks) {
    yield put(push(routes.user.tasks))
  }

  const relatedTagIds = action.payload.map(treeItem => treeItem.tagId)
  yield put(tagActions.setActiveTags(relatedTagIds))
}

export function* updateTreeItem(action) {
  // hide controls for adding tree items
  yield put(appStateActions.hideDialog())

  const originalTreeItem = action.payload.treeItem
  const treeStore = yield select(state => treeSelectors.getTreeStore(state))

  const { PENDING, FULFILLED, REJECTED } = createLoadActions(TREE.UPDATE)

  try {

    // optimistic update
    yield put({
      type: PENDING,
      payload: action.payload
    })

    // call api
    const result = yield call(api.tree.updateTitle, action.payload.treeItem.id, action.payload.title)

    yield put({
      type: FULFILLED,
      payload: result,
      meta: {
        schema: schema.treeItem
      }
    })

    // update tags in global search if tree item is selected
    if (treeStore.selection.includes(originalTreeItem.id)) {
      const newTagId = result.tag.id
      let activeTags = yield select(state => tagSelectors.getActiveTagsIds(state))

      // replace old tag by new tag id
      activeTags = activeTags.update(activeTags.indexOf(originalTreeItem.tagId), () => newTagId)

      yield put(tagActions.setActiveTags(activeTags))
    }

  } catch (e) {

    yield put({
      type: REJECTED,
      payload: originalTreeItem
    })

    console.log(e)
  }
}

export function* deleteTreeItem(action) {

  // Call server
  yield* fetch(TREE.DELETE, {
    method: api.tree.delete,
    args: [action.payload.originalData.id],
    schema: null,
    payload: action.payload
  })

  // Set action for undo
  const title = action.payload.originalData.isSection
    ? 'treeGroupDelete'
    : 'treeItemDelete'
  yield* mainUndo(action, title)

  // delete all child items on client
  yield* deleteChildItems(action.payload.originalData)
}

export function* undoDeleteTreeItem(action) {
  try {
    // BFS algorithm
    const stack = []
    let mapId = Map()
    // set main node
    let parentId = action.payload.parentId
    mapId = mapId.set(parentId, parentId)
    stack.push(action.payload)

    while (stack.length > 0) {
      const item = stack.shift()
      // get new id of old item
      parentId = mapId.get(item.parentId)

      // title for section or tag-item
      const title = item.isSection
        ? item.title
        : yield select(state => tagSelectors.getTag(state, item.tagId).title)

      // data for server
      const createData = {
        title: title,
        parentId: parentId,
        order: item.order,
      }

      // call server
      const treeItem = yield call(api.tree.create, createData)

      // add tree item to the store
      yield put(treeActions.addTreeItem(treeItem))

      for (const child of item.childItems) {
        // map new id with key of old id
        mapId = mapId.set(item.id, treeItem.id)
        stack.push(child)
      }
    }
  } catch (err) {
    console.error(err)
  }

}

// TODO: this is too long --> split
export function* dropTreeItem(action) {

  const storeData = yield select(state => ({
    treeMap: treeSelectors.getTreeItemsByParent(state),
    treeEntities: entitiesSelectors.getEntitiesTreeItems(state),
  }))

  // Collect fields
  const sourceItemId = action.payload.dragSource.id
  const targetItemId = action.payload.dragTarget.id
  const sourceParentId = findParent(storeData.treeMap, sourceItemId)
  const targetParentId = action.payload.dropPosition === 'MIDDLE' ? targetItemId : findParent(storeData.treeMap, targetItemId)

  // Run validations
  const targetParentsTags = treeItemsToTags(storeData.treeEntities, findParentsRecursive(storeData.treeMap, targetItemId))
  const targetTag = treeItemToTag(storeData.treeEntities, targetItemId)
  const sourceChildTags = treeItemsToTags(storeData.treeEntities, findChildrenRecursive(storeData.treeMap, sourceItemId))
  const sourceTag = treeItemToTag(storeData.treeEntities, sourceItemId)

  // Validate parents-children conflicts (when target parents contain similar tag that source with children that the
  // tree path to the leaf will contain a duplicate tag)
  const isParentColision = action.payload.dropPosition !== 'MIDDLE'
    ? intersection(targetParentsTags, [sourceTag, ...sourceChildTags]).length !== 0
    : intersection([targetTag, ...targetParentsTags], [sourceTag, ...sourceChildTags]).length !== 0

  if (isParentColision) {
    toast.error(errorMessages.treeItems.duplicatePathConflict, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_ERROR_DURATION,
    })
    return
  }

  // Validate siblings conflict
  if (sourceParentId !== targetParentId) {
    const siblingsTagsIds = treeItemsToTags(storeData.treeEntities, findChildren(storeData.treeMap, targetParentId))
    const sourceTagId = treeItemToTag(storeData.treeEntities, sourceItemId)
    if (includes(siblingsTagsIds, sourceTagId)) {
      toast.error(errorMessages.treeItems.duplicateLevelConflict, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })
      return
    }
  }

  try {
    // Call server
    let order = Date.now()
    if (action.payload.dropPosition !== 'MIDDLE') {
      const children = yield select(state => treeSelectors.getTree(state, targetParentId))
      const direction = action.payload.dropPosition
      const targetIndex = children.findIndex(item => item.id === targetItemId)

      order = computeTreeItemOrder(children, { targetIndex, direction, sourceParentId, targetParentId })
    }

    const update = {
      parentId: targetParentId,
      order,
    }

    yield call(api.tree.updateParent, sourceItemId, update)

    // Perform move
    yield put(treeActions.moveTreeItem({
      position: action.payload.dropPosition,
      source: action.payload.dragSource,
      target: action.payload.dragTarget,
      targetParentId,
      order
    }))
  } catch (err) {
    console.error(err, 'Unable to update parent.')
  }
}

export function* dropSection(action) {

  try {
    // Call server
    const sourceUpdate = {
      parentId: null,
      order: action.payload.order,
    }

    yield call(api.tree.updateParent, action.payload.section.id, sourceUpdate)
  } catch (err) {
    console.error(err, 'Unable to update position for section.')
  }
}

// ------ Helper methods ------------------------------------------------------

function* deleteChildItems(treeItem) {
  const { PENDING } = createLoadActions(TREE.DELETE)

  yield* treeItem.childItems.map(childItem => deleteChildItems(childItem))

  yield put({
    type: PENDING,
    payload: {
      originalData: treeItem
    }
  })
}

function findParent(map, treeItemId) {
  return map.findKey(list => list.includes(treeItemId))
}

function findParentsRecursive(map, treeItemId) {

  // Parent of current item
  const parentId = findParent(map, treeItemId)
  if (!parentId) {
    return []
  }

  // My parent with its parents
  const grandParents = findParentsRecursive(map, parentId)
  const parents = [...grandParents, parentId]
  return parents
}

function findChildren(map, treeItemId) {
  return map.has(treeItemId)
    ? map.get(treeItemId).toArray()
    : []
}

function findChildrenRecursive(map, treeItemId) {

  // My children
  let children = findChildren(map, treeItemId)

  // Children of my children
  children.forEach(childTreeItemId => {
    const nestedChildren = findChildrenRecursive(map, childTreeItemId)
    children = children.concat(nestedChildren)
  })

  return children
}

function treeItemToTag(treeEntities, treeItemId) {
  return treeEntities.getIn([treeItemId, 'tagId'])
}

function treeItemsToTags(treeEntities, treeItems) {
  return treeItems.map(treeItemId => treeItemToTag(treeEntities, treeItemId))
}
