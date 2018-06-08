import { Map, List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from '../auth/auth.actions'
import { APP_STATE } from '../app-state/app-state.actions'
import { TREE } from './tree.actions'
import { TreeStore, TreeRecord } from '../../data/records'

export default typeToReducer({

  [TREE.FETCH]: {
    PENDING: (state) => state
      .set('isFetching', true),

    FULFILLED: (state, action) => {
      const itemsById = Map(action.payload.entities.treeItem).map(item => new TreeRecord({ id: item.id }))

      // construct a Map (parentId --> treeItems)
      const tree = action.payload.entities.tree || {}
      const itemsByParent = Object.keys(tree).reduce((prev, key) => {
        const currentEntry = tree[key]
        return prev.set(currentEntry.parentId, List(currentEntry.items))
      }, Map())

      return state
        .set('isFetching', false)
        .set('itemsById', itemsById)
        .set('itemsByParent', itemsByParent)
    },
  },

  [TREE.FIREBASE]: {
    FULFILLED: (state, action) => {
      const { newItemsById, newItemsByParent } = updateTagTreeItemsListsFromFirestore(state, action)

      return state
        .set('itemsById', newItemsById)
        .set('itemsByParent', newItemsByParent)
    },
  },

  [TREE.SHOW_ADD_CONTROL]: (state, action) =>
    state.set('addControlParentId', action.payload.parentTreeItemId),

  [TREE.HIDE_ADD_CONTROL]: state =>
    state.set('addControlParentId', null),

  [APP_STATE.HIDE_TAG_HINTS]: state =>
    state.set('addControlParentId', null),

  [TREE.ADD]: (state, action) => {
    const itemId = action.payload.result
    const item = action.payload.entities.treeItem[itemId]

    return state
      .setIn(['itemsById', itemId], new TreeRecord({ id: itemId }))
      .updateIn(['itemsByParent', item.parentId], list => list
        ? list.push(itemId)
        : List([itemId]))
  },

  [TREE.SELECT_PATH]: (state, action) => {
    const treeItemIds = action.payload.map(treeItem => treeItem.id)
    return state.setIn(['selection'], List(treeItemIds))
  },

  [TREE.DESELECT_PATH]: state => state.setIn(['selection'], List()),

  [TREE.DELETE]: {
    PENDING: (state, action) => state
      .deleteIn(['itemsById', action.payload.originalData.id])
      .updateIn(['itemsByParent', action.payload.originalData.parentId], list =>
        list.filter(item => item !== action.payload.originalData.id)
      )
  },

  [TREE.COLLAPSE]: (state, action) => {
    const treeItemId = action.payload.treeItem.id
    const isCollapsed = state.collapsedItems.has(treeItemId)
    return isCollapsed
      ? state.updateIn(['collapsedItems'], set => set.delete(treeItemId))
      : state.updateIn(['collapsedItems'], set => set.add(treeItemId))
  },

  [TREE.MOVE_TREE_ITEM]: (state, action) => moveItem(state, action.payload),

  [AUTH.LOGOUT]: () => new TreeStore()

}, new TreeStore())

// ------ Helper functions ----------------------------------------------------

function findParent(map, treeItemId) {
  return map.findKey(list => list.includes(treeItemId))
}

function deleteFromCurrentList(map, treeItemId) {
  const sourceParentId = findParent(map, treeItemId)
  return map.updateIn([sourceParentId], list => list.filter(item => item !== treeItemId))
}

function getTarget(map, treeItemId) {
  const parentId = findParent(map, treeItemId)
  const index = map.get(parentId).indexOf(treeItemId)
  return {
    parentId,
    index,
  }
}

function moveItem(state, move) {

  return state.updateIn(['itemsByParent'], map => {

    // Delete from original position
    const result = deleteFromCurrentList(map, move.source.id)

    // Add to target position
    switch (move.position) {

      case 'MIDDLE':
        return result.has(move.target.id)
          ? result.updateIn([move.target.id], list => list.push(move.source.id))
          : result.setIn([move.target.id], List([move.source.id]))

      case 'TOP': {
        const target = getTarget(result, move.target.id)
        return result.updateIn([target.parentId], list => list.splice(target.index, 0, move.source.id))
      }

      case 'BOTTOM': {
        const target = getTarget(result, move.target.id)
        return result.updateIn([target.parentId], list => list.splice(target.index + 1, 0, move.source.id))
      }

      default:
        throw new Error('Unknown drop position.')
    }
  })
}

function updateTagTreeItemsListsFromFirestore(state, action) {
  const treeItem = action.payload.entities.treeItem
  const resultId = action.payload.result
  const { id, parentId, isDeleted } = treeItem[resultId]

  let newItemsById = state.getIn(['itemsById'])
  let newItemsByParent = state.getIn(['itemsByParent'])

  // New treeItem
  if (!isDeleted) {
    if (!newItemsById.has(id)) {
      newItemsById = newItemsById.setIn([id], new TreeRecord({ id }))
    }

    // Remove child from parent
    newItemsByParent.forEach((value, key) => {
      if (value.includes(id)) {
        newItemsByParent = newItemsByParent.updateIn([key], list => list.filter(treeItemId => treeItemId !== id))
      }
    })

    // Set child for new parent
    newItemsByParent = newItemsByParent.updateIn([parentId], list => list
      ? list.push(id)
      : List([id])
    )

    return { newItemsById, newItemsByParent }
  }

  // Delete treeItem
  if (isDeleted) {
    newItemsById = newItemsById.deleteIn([id])
    newItemsByParent = newItemsByParent.updateIn([parentId], list => list.filter(treeItemId => treeItemId !== id))

    return { newItemsById, newItemsByParent }
  }

  return { newItemsById, newItemsByParent }
}
