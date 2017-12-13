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

export const getTree = (state, parentId = null) => {

  const sectionIds = state.getIn(['tree', 'itemsByParent']).get(parentId)
  if (!sectionIds) {
    return List()
  }

  const sections = sectionIds.map(childId => {
    const section = state.getIn(['entities', 'treeItems']).get(childId)
    if (!section) {
      return section
    }

    return section
      .set('collapsed', state.getIn(['tree', 'collapsedItems']).has(childId))
      .set('childItems', getTree(state, childId))
      .set('tag', state.getIn(['entities', 'tags']).get(section.tagId))
  })

  return sections
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
