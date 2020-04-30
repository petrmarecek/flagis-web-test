import { List } from 'immutable'
import { createSelector } from 'reselect'
import { getTagDetail } from '../app-state/app-state.selectors'
import { getActiveEntitiesTags } from '../entities/entities.selectors'
import { compareTagByTitle } from '../../utils/component-helper'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads tags entities for given tags IDs
 * @param {Object} ids Array of tags
 * @param {Object} data Object of tagsSearch and entitiesTags
 * @returns {Array} array of tags
 */

function loadTags(ids, data) {
  const { tagsSearch, entitiesTags } = data
  let tags = ids.map((tagId) => entitiesTags.getIn([tagId]))

  // full text search
  if (tagsSearch) {
    const termLowerCase = tagsSearch.toLowerCase()

    tags = tags.filter((tag) => {
      const titleLowerCase = tag.title.toLowerCase()
      return titleLowerCase.includes(termLowerCase)
    })
  }

  // sort by title
  tags.sort(compareTagByTitle)

  return tags
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTagsIsFetching = (state) => state.getIn(['tags', 'all', 'isFetching'])

// Export selectors
export const getCurrentTagId = (state) => state.getIn(['tags', 'current'])
export const getTagsItems = (state) => state.getIn(['tags', 'all', 'items'])
export const getActiveTagsIds = (state) => state.getIn(['tags', 'activeTags'])
export const getTagsSearch = (state) => state.getIn(['tags', 'search'])
export const getTagsRelations = (state) => state.getIn(['tags', 'relations'])
export const getTag = (state, tagId) => getActiveEntitiesTags(state).get(tagId)
export const getTagsByIds = (state, tagIds) => {
  const entities = getActiveEntitiesTags(state)
  const result = tagIds.map(tagId => entities.get(tagId))
  return result
}

// ------ Reselect selectors ----------------------------------------------------

export const getTags = createSelector(
  getTagsIsFetching,
  getTagsItems,
  getActiveEntitiesTags,
  (tagsIsFetching, tagsItems, entitiesTags) => {
    return {
      isFetching: tagsIsFetching,
      items: tagsItems
        .map((tagId) => entitiesTags.getIn([tagId]))
        .sort(compareTagByTitle)
        .toArray(),
    }
  }
)

export const getVisibleTags = createSelector(
  getTagsIsFetching,
  getTagsItems,
  getTagsSearch,
  getActiveEntitiesTags,
  (tagsIsFetching, tagsItems, tagsSearch, entitiesTags) => {
    const data = { tagsSearch, entitiesTags }

    return {
      isFetching: tagsIsFetching,
      items: loadTags(tagsItems.toArray(), data),
    }
  }
)

export const getActiveTagsId = createSelector(
  getActiveTagsIds,
  (activeTagsIds) => {
    return activeTagsIds.map((tagId) => ({ id: tagId }))
  }
)

export const getTagsTitle = createSelector(
  getTagsItems,
  getActiveEntitiesTags,
  (tagsItems, entitiesTags) => {
    return tagsItems.map((tagId) =>
      entitiesTags.getIn([tagId]).title.toLowerCase()
    )
  }
)

export const getActiveTags = createSelector(
  getActiveTagsIds,
  getActiveEntitiesTags,
  (activeTagsIds, entitiesTags) => {
    return activeTagsIds
      .map((tagId) => entitiesTags.getIn([tagId]))
      .sort(compareTagByTitle)
  }
)

export const getCurrentTag = createSelector(
  getCurrentTagId,
  getActiveEntitiesTags,
  (currentTagId, entitiesTags) => {
    if (!currentTagId) {
      return null
    }

    return entitiesTags.get(currentTagId)
  }
)

export const getNextTag = createSelector(
  getTagDetail,
  getCurrentTagId,
  getTagsItems,
  getTagsSearch,
  getActiveEntitiesTags,
  (isTagDetail, tagId, tagsItems, tagsSearch, entitiesTags) => {
    if (!isTagDetail) {
      return null
    }

    if (!tagId) {
      return null
    }

    const data = { tagsSearch, entitiesTags }
    let tags = loadTags(tagsItems.toArray(), data)
    tags = List(tags.map((tag) => tag.id))
    const sizeListOfTags = tags.size
    if (sizeListOfTags === 1) {
      return null
    }

    let nextIndex = tags.indexOf(tagId) + 1
    if (nextIndex === sizeListOfTags) {
      nextIndex = 0
    }

    const nextTagId = tags.get(nextIndex)
    return entitiesTags.get(nextTagId)
  }
)

export const getPreviousTag = createSelector(
  getTagDetail,
  getCurrentTagId,
  getTagsItems,
  getTagsSearch,
  getActiveEntitiesTags,
  (isTagDetail, tagId, tagsItems, tagsSearch, entitiesTags) => {
    if (!isTagDetail) {
      return null
    }

    if (!tagId) {
      return null
    }

    const data = { tagsSearch, entitiesTags }
    let tags = loadTags(tagsItems.toArray(), data)
    tags = List(tags.map((tag) => tag.id))
    const sizeListOfTags = tags.size
    if (sizeListOfTags === 1) {
      return null
    }

    let prevIndex = tags.indexOf(tagId) - 1
    if (prevIndex < 0) {
      prevIndex = sizeListOfTags - 1
    }

    const prevTagId = tags.get(prevIndex)
    return entitiesTags.get(prevTagId)
  }
)
