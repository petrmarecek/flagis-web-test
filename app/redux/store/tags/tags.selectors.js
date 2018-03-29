import search from 'redux/services/search'
import intersection from 'lodash/intersection'
import { List } from "immutable"

// ------ Helpers -------------------------------------------------------------

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

function loadTags(ids, state) {

  // apply search filter
  if (state.getIn(['tags', 'search'])) {
    const foundIds = search.tags.get(state.getIn(['tags', 'search'])).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  return ids
    .map(tagId => state.getIn(['entities', 'tags', tagId]))
    .sort(compareTagByTitle)
}

// ------ Selectors -------------------------------------------------------------
export const getTags = state => ({
  isFetching: state.getIn(['tags', 'all', 'isFetching']),
  items: state.getIn(['tags', 'all', 'items']).map(tagId => state.getIn(['entities', 'tags', tagId]))
})

export const getVisibleTags = state => {
  return ({
    isFetching: state.getIn(['tags', 'all', 'isFetching']),
    items: loadTags(state.getIn(['tags', 'all', 'items']).toArray(), state)
  })
}

export const getTag = (state, tagId) => state.getIn(['entities', 'tags']).get(tagId)

export const getCurrentTag = state => {
  const tagId = state.getIn(['tags', 'current'])
  if (!tagId) {
    return null
  }

  return state.getIn(['entities', 'tags']).get(tagId)
}

export const getCurrentTagId = state => {
  return state.getIn(['tags', 'current'])
}

export const getNextTag = state => {
  if (!state.getIn(['appState', 'taskTagDetail', 'tag'])) {
    return null
  }

  const tagId = state.getIn(['tags', 'current'])
  if (!tagId) {
    return null
  }

  const sizeListOfTags = state.getIn(['tags', 'all', 'items']).size
  if (sizeListOfTags === 1) {
    return null
  }

  let tags = loadTags(state.getIn(['tags', 'all', 'items']).toArray(), state)
  tags = List(tags.map(tag => tag.id))

  let nextIndex = tags.indexOf(tagId) + 1
  if (nextIndex === sizeListOfTags) {
    nextIndex = 0
  }

  const nextTagId = tags.get(nextIndex)
  return state.getIn(['entities', 'tags']).get(nextTagId)
}

export const getPreviousTag = state => {
  if (!state.getIn(['appState', 'taskTagDetail', 'tag'])) {
    return null
  }

  const tagId = state.getIn(['tags', 'current'])
  if (!tagId) {
    return null
  }

  const sizeListOfTags = state.getIn(['tags', 'all', 'items']).size
  if (sizeListOfTags === 1) {
    return null
  }

  let tags = loadTags(state.getIn(['tags', 'all', 'items']).toArray(), state)
  tags = List(tags.map(tag => tag.id))

  let prevIndex = tags.indexOf(tagId) - 1
  if (prevIndex < 0) {
    prevIndex = sizeListOfTags - 1
  }

  const prevTagId = tags.get(prevIndex)
  return state.getIn(['entities', 'tags']).get(prevTagId)
}

export const getActiveTags = state =>
  state.getIn(['tags', 'activeTags']).map(tagId => state.getIn(['entities', 'tags', tagId])).reverse()

export const getActiveTagsId = state => {
  return state.getIn(['tags', 'activeTags']).map(tagId => ({ id: tagId }))
}

export const getTagsTitle = state => {
  return state.getIn(['tags', 'all', 'items']).map(tagId => state.getIn(['entities', 'tags', tagId]).title)
}

export const getTagsItems = state => state.getIn(['tags', 'all', 'items'])

export const getActiveTagsIds = state => state.getIn(['tags', 'activeTags'])

export const getTagsSearch = state => state.getIn(['tags', 'search'])

export const getTagsRelations = state => state.getIn(['tags', 'relations'])
