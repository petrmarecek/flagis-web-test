import { List } from 'immutable'

// ------ Selectors -------------------------------------------------------------

export const getTreeItem = (state, treeItemId) => state.getIn(['entities', 'treeItems']).get(treeItemId)

// ------ Helpers -------------------------------------------------------------

/**
 * Returns tag ids of tree item all parents
 * @param {Object} state
 * @param {String} treeItemId
 */
const getTagIdsOfAllParents = (state, treeItemId) => {
  const treeItem = getTreeItem(state, treeItemId)

  if (!treeItem.tagId) {
    return List()
  }

  const parents = List([treeItem.tagId])

  if (!treeItem.parentId) {
    return parents
  }

  return parents.push(...getTagIdsOfAllParents(state, treeItem.parentId))
}

// ------ Selectors -------------------------------------------------------------

export const getTreeStore = state => state.getIn(['tree'])

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
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;

    return 0;
  })

  return items.map(item => {
    const { id, tagId } = item

    return item
      .set('collapsed', state.getIn(['tree', 'collapsedItems']).has(id))
      .set('childItems', getTree(state, id))
      .set('tag', state.getIn(['entities', 'tags']).get(tagId))
  })
}

export const getFetchTree = (state) => {
  return state.getIn(['tree', 'isFetching'])
}

export const getSections = state => {
  const sectionIds = state.getIn(['tree', 'itemsByParent']).get(null)
  if (!sectionIds) {
    return null
  }

  let sections = sectionIds.map(id => {
    return state.getIn(['entities', 'treeItems']).get(id)
  })

  // sort sections by order
  sections = sections.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;

    return 0;
  })

  return sections
}

export const getTreeItemsByParent = (state) => {
  return state.getIn(['tree', 'itemsByParent'])
}

export const getSelectionTree = (state) => {
  return state.getIn(['tree', 'selection'])
}

export const getAddControlParentId = (state) => {
  return state.getIn(['tree', 'addControlParentId'])
}

export const getTagsReferences = (state) =>
  state.getIn(['entities', 'treeItems']).map(treeItem => treeItem.tagId).toSet()

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
  const tagIdsOfChilds = getTagIdsOfChilds(state, updatedTreeItem ? updatedTreeItem.treeItemId : parentId)

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

// ------ Helpers -------------------------------------------------------------

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
