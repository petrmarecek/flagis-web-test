import schema from '../../data/schema'

export const TREE = {
  ADD: 'TREE/ADD',
  CREATE: 'TREE/CREATE',
  UPDATE: 'TREE/UPDATE',
  DELETE: 'TREE/DELETE',
  UNDO_DELETE: 'UNDO_TREE/DELETE',
  FETCH: 'TREE/FETCH',
  FIREBASE: 'TREE/FIREBASE',
  TOGGLE_MENU: 'TREE/TOGGLE-MENU',
  SHOW_ADD_CONTROL: 'TREE/SHOW_ADD_CONTROL',
  HIDE_ADD_CONTROL: 'TREE/HIDE_ADD_CONTROL',
  SELECT_PATH: 'TREE/SELECT_PATH',
  DESELECT_PATH: 'TREE/DESELECT_PATH',
  COLLAPSE: 'TREE/COLLAPSE',

  MOVE_TREE_ITEM: 'TREE/MOVE_TREE_ITEM',
  DROP_TREE_ITEM: 'TREE/DROP_TREE_ITEM',
  MOVE_SECTION: 'TREE/MOVE_SECTION',
  DROP_SECTION: 'TREE/DROP_SECTION',
}

export const addTreeItem = item => ({
  type: TREE.ADD,
  payload: item,
  meta: {
    schema: schema.treeItem
  }
})

// Payload format: { parentId, title, isSection }
export const createTreeItem = item => ({
  type: TREE.CREATE,
  payload: item
})

export const fetchTree = () => ({
  type: TREE.FETCH
})

export const toggleMenu = itemId => ({
  type: TREE.TOGGLE_MENU,
  payload: itemId
})

export const showTreeItemAddControl = parentTreeItemId => ({
  type: TREE.SHOW_ADD_CONTROL,
  payload: {
    parentTreeItemId
  }
})

export const hideTreeItemAddControl = () => ({
  type: TREE.HIDE_ADD_CONTROL,
})

export const selectPath = treeItems => ({
  type: TREE.SELECT_PATH,
  payload: treeItems,
})

export const deselectPath = () => ({
  type: TREE.DESELECT_PATH,
})

export const updateTreeItemTitle = (treeItem, title) => ({
  type: TREE.UPDATE,
  payload: {
    treeItem,
    title,
  }
})

export const deleteTreeItem = originalData => ({
  type: TREE.DELETE,
  payload: {
    originalData
  }
})

export const collapse = treeItem => ({
  type: TREE.COLLAPSE,
  payload: {
    treeItem
  }
})

export const dropTreeItem = dropResult => ({
  type: TREE.DROP_TREE_ITEM,
  payload: dropResult,
})

export const moveTreeItem = data => ({
  type: TREE.MOVE_TREE_ITEM,
  payload: data,
})

export const moveSection = (sectionId, order) => ({
  type: TREE.MOVE_SECTION,
  payload: {
    sectionId,
    order
  },
})

export const dropSection = (section, order) => ({
  type: TREE.DROP_SECTION,
  payload: {
    section: section,
    order: order,
  },
})
