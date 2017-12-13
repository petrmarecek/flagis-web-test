import search from 'redux/services/search'
import intersection from 'lodash/intersection'

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

// ------ Selectors -------------------------------------------------------------

export const getTags = state => ({
  isFetching: state.getIn(['tags', 'all', 'isFetching']),
  items: state.getIn(['tags', 'all', 'items']).map(tagId => state.getIn(['entities', 'tags', tagId]))
})

export const getVisibleTags = state => {
  let ids = state.getIn(['tags', 'all', 'items']).toArray()

  // apply search filter
  if (state.tags.search) {
    const foundIds = search.getIn(['tags']).get(state.getIn(['tags', 'search'])).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  return {
    isFetching: state.tags.all.isFetching,
    items: ids.map(tagId => state.getIn(['entities', 'tags', tagId])).sort(compareTagByTitle)
  }
}

export const getTag = (state, tagId) => state.getIn(['entities', 'tags']).get(tagId)

export const getCurrentTag = state => {
  const tagId = state.getIn(['tags', 'current'])
  if (!tagId) {
    return null
  }

  return state.getIn(['entities', 'tags']).get(tagId)
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

  let nextIndex = state.getIn(['tags', 'all', 'items']).indexOf(tagId) + 1
  if (nextIndex === sizeListOfTags) {
    nextIndex = 0
  }

  const nextTagId = state.getIn(['tags', 'all', 'items']).get(nextIndex)
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

  let prevIndex = state.getIn(['tags', 'all', 'items']).indexOf(tagId) - 1
  if (prevIndex < 0) {
    prevIndex = sizeListOfTags - 1
  }

  const prevTagId = state.getIn(['tags', 'all', 'items']).get(prevIndex)
  return state.getIn(['entities', 'tags']).get(prevTagId)
}

export const getActiveTags = state =>
  state.getIn(['tags', 'activeTags']).map(tagId => state.getIn(['entities', 'tags', tagId])).reverse()

export const getActiveTagIds = state => state.getIn(['tags', 'activeTags'])
