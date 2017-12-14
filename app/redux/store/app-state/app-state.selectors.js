
export const getAppState = state => state.getIn(['appState'])

export const getLeftPanel = state => state.getIn(['appState', 'leftPanel'])

export const getTagHints = state => {
  const tagHintsData = state.getIn(['appState', 'tagHints'])
  const visibleTags = state
    .getIn(['appState', 'tagHints', 'visibleTags'])
    .map(tagId => state.getIn(['entities', 'tags', tagId]))

  return tagHintsData.setIn(['visibleTags'], visibleTags)
}

export const getTagHintsRaw = state => state.getIn(['appState', 'tagHints'])

export const getTagAutocompletes = state => state.getIn(['appState', 'tagAutocompletes'])

export const getTagHintsVisibility = state => state.getIn(['appState', 'tagHints', 'isVisible'])

export const getAppStateItem = (state, type) => {
  return state.getIn(['appState', type])
}

export const getMultiSelectVisibility = (state) => {
  return state.getIn(['appState', 'multiSelect', 'isVisible'])
}

export const getDialog = (state) => {
  const dialog = state.getIn(['appState', 'currentDialog'])

  if (!dialog) {
    return false
  }

  return true
}

export const getCurrentDialog = state => {
  return state.getIn(['appState', 'currentDialog'])
}

export const getTasksListVisibility = state => {
  return state.getIn(['appState', 'tasksList', 'isVisible'])
}

export const getArchivedTasksVisibility = state => {
  return state.getIn(['appState', 'archivedTasks', 'isVisible'])
}

export const getTaskTagDetail = state => {
  return state.getIn(['appState', 'taskTagDetail'])
}

export const getLoader = state => {
  return state.getIn(['appState', 'loader', 'isVisible'])
}
