import { List } from "immutable"
import search from 'redux/services/search'
import intersection from 'lodash/intersection'
import { getTagDetail } from '../app-state/app-state.selectors'
import { getEntitiesTags } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Compares title two tag and sorts it
 * @param {Object} tagA Tag record
 * @param {Object} tagB Tag record
 * @return {Number}
 */

export const compareTagByTitle = (tagA, tagB) => {

  const titleA = tagA.title.toLowerCase()
  const titleB = tagB.title.toLowerCase()

  if (titleA > titleB) {
    return 1
  } else if (titleA < titleB) {
    return -1
  } else {
    return 0
  }
}

/**
 * Loads tags entities for given tags IDs
 * @param {Object} ids Array of tags
 * @param {Object} data Object of tagsSearch and entitiesTags
 * @returns {Array} array of tags
 */

function loadTags(ids, data) {
  const { tagsSearch, entitiesTags } = data

  // apply search filter
  if (tagsSearch) {
    const foundIds = search.tags.get(tagsSearch).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  return ids
    .map(tagId => entitiesTags.getIn([tagId]))
    .sort(compareTagByTitle)
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTagsIsFetching = state => state.getIn(['tags', 'all', 'isFetching'])

// Export selectors
export const getCurrentTagId = state => state.getIn(['tags', 'current'])
export const getTagsItems = state => state.getIn(['tags', 'all', 'items'])
export const getActiveTagsIds = state => state.getIn(['tags', 'activeTags'])
export const getTagsSearch = state => state.getIn(['tags', 'search'])
export const getTagsRelations = state => state.getIn(['tags', 'relations'])
export const getTag = (state, tagId) => getEntitiesTags(state).get(tagId)

// ------ Reselect selectors ----------------------------------------------------

export const getTags = createSelector(
  getTagsIsFetching,
  getTagsItems,
  getEntitiesTags,
  (tagsIsFetching, tagsItems, entitiesTags) => {
    return ({
      isFetching: tagsIsFetching,
      items: tagsItems
        .map(tagId => entitiesTags.getIn([tagId]))
        .sort(compareTagByTitle)
        .toArray()
    })
  }
)

export const getVisibleTags = createSelector(
  getTagsIsFetching,
  getTagsItems,
  getTagsSearch,
  getEntitiesTags,
  (tagsIsFetching, tagsItems, tagsSearch, entitiesTags) => {
    const data = { tagsSearch, entitiesTags }

    return ({
      isFetching: tagsIsFetching,
      items: loadTags(tagsItems.toArray(), data)
    })
  }
)

export const getActiveTagsId = createSelector(
  getActiveTagsIds,
  (activeTagsIds) => {

    return activeTagsIds.map(tagId => ({ id: tagId }))
  }
)

export const getTagsTitle = createSelector(
  getTagsItems,
  getEntitiesTags,
  (tagsItems, entitiesTags) => {

    return tagsItems.map(tagId => entitiesTags.getIn([tagId]).title.toLowerCase())
  }
)

export const getActiveTags = createSelector(
  getActiveTagsIds,
  getEntitiesTags,
  (activeTagsIds, entitiesTags) => {

    return activeTagsIds.map(tagId => entitiesTags.getIn([tagId])).reverse()
  }
)

export const getCurrentTag = createSelector(
  getCurrentTagId,
  getEntitiesTags,
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
  getEntitiesTags,
  (isTagDetail, tagId, tagsItems, tagsSearch, entitiesTags) => {

    if (!isTagDetail) {
      return null
    }

    if (!tagId) {
      return null
    }

    const data = { tagsSearch, entitiesTags }
    let tags = loadTags(tagsItems.toArray(), data)
    tags = List(tags.map(tag => tag.id))
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
  getEntitiesTags,
  (isTagDetail, tagId, tagsItems, tagsSearch, entitiesTags) => {

    if (!isTagDetail) {
      return null
    }

    if (!tagId) {
      return null
    }

    const data = { tagsSearch, entitiesTags }
    let tags = loadTags(tagsItems.toArray(), data)
    tags = List(tags.map(tag => tag.id))
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
