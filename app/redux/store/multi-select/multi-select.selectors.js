import { getActiveEntitiesTags } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getMultiSelectActiveTags = state =>
  state.getIn(['multiSelect', 'tasks', 'activeTags'])
export const getMultiSelectInactiveTags = state =>
  state.getIn(['multiSelect', 'tasks', 'inactiveTags'])
export const getMultiSelectOtherTags = state =>
  state.getIn(['multiSelect', 'tasks', 'otherTags'])
export const getMultiSelectAddTagsIds = state =>
  state.getIn(['multiSelect', 'tasks', 'addTags'])
export const getMultiSelectRemoveTagsIds = state =>
  state.getIn(['multiSelect', 'tasks', 'removeTags'])

// ------ Reselect selectors ----------------------------------------------------

export const getMultiSelectAddTags = createSelector(
  getMultiSelectAddTagsIds,
  getActiveEntitiesTags,
  (multiSelectAddTagsIds, entitiesTags) => {
    return multiSelectAddTagsIds.map(tagId => entitiesTags.getIn([tagId]))
  }
)

export const getMultiSelectRemoveTags = createSelector(
  getMultiSelectRemoveTagsIds,
  getActiveEntitiesTags,
  (multiSelectRemoveTagsIds, entitiesTags) => {
    return multiSelectRemoveTagsIds.map(tagId => entitiesTags.getIn([tagId]))
  }
)
