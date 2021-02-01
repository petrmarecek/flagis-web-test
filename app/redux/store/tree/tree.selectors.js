import { List } from 'immutable'
import {
  getActiveEntitiesTags,
  getEntitiesTreeItems,
} from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------
/* eslint-disable no-use-before-define */

/**
 * Returns tag ids of tree item all parents
 * @param {Object} state
 * @param {String} treeItemId
 */

const getTagIdsOfAllParents = (state, treeItemId) => {
  const treeItem = getTreeItem(state, treeItemId)

  if (!treeItem || !treeItem.tagId) {
    return List()
  }

  const parents = List([treeItem.tagId])
  const parentTreeItem = getTreeItem(state, treeItem.parentId)

  if (!parentTreeItem.parentId) {
    return parents
  }

  return parents.push(...getTagIdsOfAllParents(state, treeItem.parentId))
}

/**
 * Returns tag ids of tree item childs
 * @param {Object} state
 * @param {String} treeItemId
 */
function getTagIdsOfChilds(state, treeItemId) {
  const childIds = state.getIn(['tree', 'itemsByParent']).get(treeItemId)

  if (!childIds) {
    return List()
  }

  return childIds.map(childId => getTreeItem(state, childId).tagId)
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTreeItemsById = state => state.getIn(['tree', 'itemsById'])

// Export selectors
export const getTreeItemsIsFetching = state =>
  state.getIn(['tree', 'isFetching'])
export const getTreeStore = state => state.getIn(['tree'])
export const getTreeItemsByParent = state =>
  state.getIn(['tree', 'itemsByParent'])
export const getSelectionTree = state => state.getIn(['tree', 'selection'])
export const getAddControlParentId = state =>
  state.getIn(['tree', 'addControlParentId'])
export const getTreeItem = (state, treeItemId) =>
  state.getIn(['entities', 'treeItems']).get(treeItemId)

export const getTree = (state, parentId = null) => {
  const itemIds = state.getIn(['tree', 'itemsByParent']).get(parentId)
  if (!itemIds) {
    return List()
  }

  let items = itemIds.map(childId => {
    return state.getIn(['entities', 'treeItems']).get(childId)
  })

  // sort treeItems by order
  items = items.sort((a, b) => {
    if (a.order < b.order) return -1
    if (a.order > b.order) return 1

    return 0
  })

  return items.map(item => {
    const { id, tagId } = item

    return item
      .set('collapsed', state.getIn(['tree', 'collapsedItems']).has(id))
      .set('childItems', getTree(state, id))
      .set('tag', state.getIn(['entities', 'tags']).get(tagId))
      .set('fromUser', state.getIn(['entities', 'contacts', item.fromUserId]))
      .set('toUser', state.getIn(['entities', 'contacts', item.toUserId]))
  })
}

/**
 * Returns tag ids which cannot be selected in tag autocomplete
 * @param {Object} state
 * @param {String} parentId
 * @param {Object} updatedTreeItem For update treeItem
 * @param {String} updatedTreeItem.treeItemId
 * @param {String} updatedTreeItem.tagId
 */
export const getDisabledTagIds = (state, parentId, updatedTreeItem = {}) => {
  // tag ids which have same parent
  const tagIdsOfSameParent = getTree(state, parentId).map(item => item.tagId)
  // tag ids of tree item parents
  const tagIdsOfParents = getTagIdsOfAllParents(state, parentId)
  // tag ids of tree item childs
  const tagIdsOfChilds = getTagIdsOfChilds(
    state,
    updatedTreeItem ? updatedTreeItem.treeItemId : parentId,
  )

  let result = tagIdsOfSameParent
    .push(...tagIdsOfParents)
    .push(...tagIdsOfChilds)
    .toJS()

  // if update treeItem, delete the treeItemId from returned object
  if (updatedTreeItem) {
    result = result.filter(tagId => tagId !== updatedTreeItem.tagId)
  }

  return result
}

// ------ Reselect selectors ----------------------------------------------------

export const getSections = createSelector(
  getTreeItemsByParent,
  getEntitiesTreeItems,
  (treeItemsByParent, entitiesTreeItems) => {
    const sectionIds = treeItemsByParent.get(null)
    if (!sectionIds) {
      return null
    }

    let sections = sectionIds.map(id => {
      return entitiesTreeItems.get(id)
    })

    // sort sections by order
    sections = sections.sort((a, b) => {
      if (a.order < b.order) return -1
      if (a.order > b.order) return 1

      return 0
    })

    return sections
  },
)

export const getTagsReferences = createSelector(
  getTreeItemsById,
  getEntitiesTreeItems,
  (treeItemsById, entitiesTreeItems) => {
    const treeItemsEntities = treeItemsById.map(treeItem =>
      entitiesTreeItems.getIn([treeItem.id]),
    )
    return treeItemsEntities.map(treeItem => treeItem.tagId).toSet()
  },
)

export const getTagsOfTree = (state, parentId) =>
  createSelector(
    getTreeItemsByParent,
    getEntitiesTreeItems,
    getActiveEntitiesTags,
    (treeItemsByParent, entitiesTreeItems, entitiesTags) => {
      // Tags of all parents
      const treeItemsIdByParent = treeItemsByParent.get(parentId)
      const parentsTagIds = getTagIdsOfAllParents(state, parentId)
      let tags = parentsTagIds.map(tagId => entitiesTags.get(tagId)).toSet()
      const contacts = treeItemsIdByParent
        .map(itemId => entitiesTreeItems.get(itemId))
        .map(item => ({ id: item.toUserId || item.fromUserId }))
        .toList()

      // Tags of all children
      if (treeItemsIdByParent) {
        const treeItems = treeItemsIdByParent.map(treeItemId =>
          entitiesTreeItems.get(treeItemId),
        )
        const childrenTags = treeItems
          .map(treeItem => entitiesTags.get(treeItem.tagId))
          .toSet()
        tags = tags.union(childrenTags)
      }

      // Return tags of all parents and children
      return {
        tags: tags.isEmpty() ? null : tags.toList(),
        contacts,
      }
    },
  )
