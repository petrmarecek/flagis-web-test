import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import intersection from 'lodash/intersection'
import includes from 'lodash/includes'
import { NotificationManager } from 'react-notifications'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import { Map } from 'immutable'

import {
  createLoadActions,
  fetch,
  mainUndo,
} from 'redux/store/common.sagas'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as treeSelectors from 'redux/store/tree/tree.selectors'
import { deselectTasks } from 'redux/store/tasks/tasks.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as tagsSelectors from 'redux/store/tags/tags.selectors'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
import * as routingSelectors from 'redux/store/routing/routing.selectors'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import { computeTreeOrder } from 'redux/utils/redux-helper'

const TREE = treeActions.TREE

export function* fetchTree() {
  yield* fetch(TREE.FETCH, {
    method: api.tree.get,
    args: [],
    schema: schema.treeList
  })
}

export function* createTreeItem(action) {
  try {

    // hide controls for adding tree items
    yield put(appStateActions.hideTagHints())
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
  yield put(deselectTasks())

  const location = yield select(state => routingSelectors.getRoutingPathname(state))
  if (location !== '/user/tasks') {
    if (location !== '/user/archive') {
      yield put(push('/user/tasks'))
    }
  }

  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))
  const relatedTagIds = action.payload.map(treeItem => treeItem.tagId)
  yield put(tagActions.setActiveTags(relatedTagIds, isArchivedTasks))
}

export function* updateTreeItem(action) {
  // hide controls for adding tree items
  yield put(appStateActions.hideTagHints())
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
      const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))
      let activeTags = yield select(state => tagsSelectors.getActiveTagsIds(state))

      // replace old tag by new tag id
      activeTags = activeTags.update(activeTags.indexOf(originalTreeItem.tagId), () => newTagId)

      yield put(tagActions.setActiveTags(activeTags, isArchivedTasks))
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
  // Get position of delete item
  const itemsByParent = yield select(state => treeSelectors.getTreeItemsByParent(state))
  const position = itemsByParent.get(action.payload.originalData.parentId).indexOf(action.payload.originalData.id)

  yield* fetch(TREE.DELETE, {
    method: api.tree.delete,
    args: [action.payload.originalData.id],
    schema: null,
    payload: action.payload
  })

  action.payload.originalData.position = position
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
        : yield select(state => tagsSelectors.getTag(state, item.tagId).title)
      // data for server
      const createData = {
        title: title,
        parentId: parentId,
        order: item.order,
      }

      // call server
      const treeItem = yield call(api.tree.create, createData)

      if (Number.isInteger(item.position)) {
        treeItem.position = item.position
      }

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
    NotificationManager.error(
      errorMessages.treeItems.duplicatePathConflict,
      'Move conflict',
      constants.NOTIFICATION_ERROR_DURATION
    )
    return
  }

  // Validate siblings conflict
  if (sourceParentId !== targetParentId) {
    const siblingsTagsIds = treeItemsToTags(storeData.treeEntities, findChildren(storeData.treeMap, targetParentId))
    const sourceTagId = treeItemToTag(storeData.treeEntities, sourceItemId)
    if (includes(siblingsTagsIds, sourceTagId)) {
      NotificationManager.error(
        errorMessages.treeItems.duplicateLevelConflict,
        'Move conflict',
        constants.NOTIFICATION_ERROR_DURATION
      )
      return
    }
  }

  try {
    // Call server
    let order = Date.now()
    if (action.payload.dropPosition !== 'MIDDLE') {
      const targetPosition = storeData.treeMap.get(targetParentId).indexOf(targetItemId)
      const children = yield select(state => treeSelectors.getTree(state, targetParentId))
      const isSection = false

      order = computeTreeOrder(children, targetPosition, isSection)
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
