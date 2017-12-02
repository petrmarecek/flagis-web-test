import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import intersection from 'lodash/intersection'
import includes from 'lodash/includes'
import { NotificationManager } from 'react-notifications'

import consts from '../../data/consts'
import { createLoadActions, fetch } from '../common.sagas'
import { TREE } from '../tree/tree.actions'
import * as treeActions from './tree.actions'
import { deselectTasks } from '../tasks/tasks.actions'
import * as tagActions from '../tags/tags.actions'
import * as appStateActions from '../app-state/app-state.actions'
import * as appStateSelectors from '../app-state/app-state.selectors'
import api from '../../utils/api'
import schema from '../../data/schema'

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
      parentId: action.payload.parentId
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

  const location = yield select(state => state.routing.locationBeforeTransitions.pathname)
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
  const treeStore = yield select(state => state.tree)

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
      let activeTags = yield select(state => state.tags.activeTags)

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
  yield* fetch(TREE.DELETE, {
    method: api.tree.delete,
    args: [action.payload.treeItem.id],
    schema: null,
    payload: action.payload
  })

  // delete all child items on client
  yield* deleteChildItems(action.payload.treeItem)
}

// TODO: this is too long --> split
export function* dropTreeItem(action) {

  const storeData = yield select(state => ({
    treeMap: state.tree.itemsByParent,
    treeEntities: state.entities.treeItems,
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
      'Cannot perform this move tree validation failed. Tag duplication found in the result tree path.',
      'Move conflict',
      consts.NOTIFICATION_ERROR_DURATION
    )
    return
  }

  // Validate siblings conflict
  if (sourceParentId !== targetParentId) {
    const siblingsTagsIds = treeItemsToTags(storeData.treeEntities, findChildren(storeData.treeMap, targetParentId))
    const sourceTagId = treeItemToTag(storeData.treeEntities, sourceItemId)
    if (includes(siblingsTagsIds, sourceTagId)) {
      NotificationManager.error(
        'Cannot perform this move tree validation failed. The same tag found on the same tree level.',
        'Move conflict',
        consts.NOTIFICATION_ERROR_DURATION
      )
      return
    }
  }

  try {
    // Call server
    let position = 0
    if (action.payload.dropPosition !== 'MIDDLE') {
      const targetPosition = storeData.treeMap.get(targetParentId).indexOf(targetItemId)
      position = action.payload.dropPosition === 'TOP'
        ? targetPosition
        : targetPosition + 1
    }

    const update = {
      parentId: targetParentId,
      position: position,
    }

    yield call(api.tree.updateParent, sourceItemId, update)

    // Perform move
    yield put(treeActions.moveTreeItem({
      position: action.payload.dropPosition,
      source: action.payload.dragSource,
      target: action.payload.dragTarget,
    }))
  } catch (err) {
    console.error(err, 'Unable to update parent.')
  }
}

// ------ Helper methods ------------------------------------------------------

function* deleteChildItems(treeItem) {
  const { PENDING } = createLoadActions(TREE.DELETE)

  yield* treeItem.childItems.map(childItem => deleteChildItems(childItem))

  yield put({
    type: PENDING,
    payload: { treeItem }
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