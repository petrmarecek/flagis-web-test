export const TAGS = {
  FETCH: 'TAGS/FETCH',
  CREATE: 'TAGS/CREATE',
  SET_ACTIVE_TAGS: 'TAGS/SET_ACTIVE_TAGS',
  SELECT_ACTIVE_TAGS: 'TAGS/SELECT_ACTIVE_TAGS',
  ADD: 'TAGS/ADD',
  REPLACE: 'TAGS/REPLACE',
  SELECT: 'TAGS/SELECT',
  DESELECT: 'TAGS/DESELECT',
  UPDATE: 'TAGS/UPDATE',
  UPDATE_SEARCH: 'TAGS/UPDATE_SEARCH',
  DELETE: 'TAGS/DELETE',
  UNDO_DELETE: 'UNDO_TAGS/DELETE',
  FETCH_TAGS_RELATIONS: 'TAGS/FETCH_TAGS_RELATIONS',
  ADD_TAGS_RELATIONS: 'TAGS/ADD_TAGS_RELATIONS',
  DELETE_TAGS_RELATIONS: 'TAGS/DELETE_TAGS_RELATIONS',
}

export const fetchTags = () => ({
  type: TAGS.FETCH
})

export const createTag = tag => ({
  type: TAGS.CREATE,
  payload: {
    tag
  },
})

export const selectActiveTags = tagIds => ({
  type: TAGS.SELECT_ACTIVE_TAGS,
  payload: {
    tagIds
  },
})

export const setActiveTags = (tagIds, isArchivedTasks) => ({
  type: TAGS.SET_ACTIVE_TAGS,
  payload: {
    tagIds,
    isArchivedTasks,
  },
})

export const addTag = tag => ({
  type: TAGS.ADD,
  payload: {
    tag
  }
})

export const replaceTag = (originalTagId, tag, relatedTaskId) => ({
  type: TAGS.REPLACE,
  payload: {
    originalTagId,
    tag,
    relatedTaskId,
  }
})

export const selectTag = tagId => ({
  type: TAGS.SELECT,
  payload: { tagId }
})

export const deselectTags = () => ({
  type: TAGS.DESELECT,
})

export const updateTag = (tag, data, type) => ({
  type: TAGS.UPDATE,
  payload: {
    tag,
    data,
    type,
  }
})

export const updateTagSearch = search => ({
  type: TAGS.UPDATE_SEARCH,
  payload: {
    search
  }
})

export const deleteTag = originalData => ({
  type: TAGS.DELETE,
  payload: {
    originalData
  }
})

export const fetchTagsRelations = () => ({
  type: TAGS.FETCH_TAGS_RELATIONS,
})

export const addTagsRelations = (tagId, taskId) => ({
  type: TAGS.ADD_TAGS_RELATIONS,
  payload: {
    tagId,
    taskId,
  }
})

export const deleteTagsRelations = (tagId, taskId) => ({
  type: TAGS.DELETE_TAGS_RELATIONS,
  payload: {
    tagId,
    taskId,
  }
})
