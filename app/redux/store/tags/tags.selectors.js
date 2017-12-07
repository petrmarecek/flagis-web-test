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
  isFetching: state.tags.all.isFetching,
  items: state.tags.all.items.map(tagId => state.entities.getIn(['tags', tagId]))
})

export const getVisibleTags = state => {
  let ids = state.tags.all.items.toArray()

  // apply search filter
  if (state.tags.search) {
    const foundIds = search.tags.get(state.tags.search).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  return {
    isFetching: state.tags.all.isFetching,
    items: ids.map(tagId => state.entities.getIn(['tags', tagId])).sort(compareTagByTitle)
  }
}

export const getTag = (state, tagId) => state.entities.tags.get(tagId)

export const getCurrentTag = state => {
  const tagId = state.tags.current
  if (!tagId) {
    return null
  }

  return state.entities.tags.get(tagId)
}

export const getNextTag = state => {
  if (!state.appState.taskTagDetail.tag) {
    return null
  }

  const tagId = state.tags.current
  if (!tagId) {
    return null
  }

  const sizeListOfTags = state.tags.all.items.size
  if (sizeListOfTags === 1) {
    return null
  }

  let nextIndex = state.tags.all.items.indexOf(tagId) + 1
  if (nextIndex === sizeListOfTags) {
    nextIndex = 0
  }

  const nextTagId = state.tags.all.items.get(nextIndex)
  return state.entities.tags.get(nextTagId)
}

export const getPreviousTag = state => {
  if (!state.appState.taskTagDetail.tag) {
    return null
  }

  const tagId = state.tags.current
  if (!tagId) {
    return null
  }

  const sizeListOfTags = state.tags.all.items.size
  if (sizeListOfTags === 1) {
    return null
  }

  let prevIndex = state.tags.all.items.indexOf(tagId) - 1
  if (prevIndex < 0) {
    prevIndex = sizeListOfTags - 1
  }

  const prevTagId = state.tags.all.items.get(prevIndex)
  return state.entities.tags.get(prevTagId)
}

export const getActiveTags = state =>
  state.tags.activeTags.map(tagId => state.getIn(['entities', 'tags', tagId])).reverse()

export const getActiveTagIds = state => state.getIn(['tags', 'activeTags'])
