export const MULTI_SELECT = {
  ADD_TO_LIST: 'MULTI-SELECT/ADD-TO-LIST',
  DELETE_FROM_LIST: 'MULTI-SELECT/DELETE-FROM-LIST',
  CLEAR_LISTS: 'MULTI-SELECT/CLEAR-LISTS',
}

// ------ Tasks ---------------------------------------------------------------
export const addToList = (item, typeList) => ({
  type: MULTI_SELECT.ADD_TO_LIST,
  payload: {
    item,
    typeList,
  },
})

export const deleteFromList = (item, typeList) => ({
  type: MULTI_SELECT.DELETE_FROM_LIST,
  payload: {
    item,
    typeList,
  },
})

export const clearLists = () => ({
  type: MULTI_SELECT.CLEAR_LISTS,
})
