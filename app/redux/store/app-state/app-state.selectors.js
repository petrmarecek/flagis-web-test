
export const getTagHints = state => {
  const tagHintsData = state.appState.tagHints
  const visibleTags = state.appState
    .getIn(['tagHints', 'visibleTags'])
    .map(tagId => state.entities.getIn(['tags', tagId]))

  return tagHintsData.setIn(['visibleTags'], visibleTags)
}

export const getTagHintsRaw = state => state.appState.get('tagHints')

export const getAppStateItem = (state, type) => {
  return state.getIn(['appState', type])
}

export const getMultiSelectVisibility = (state) => {
  return state.getIn(['appState', 'multiSelect', 'isVisible'])
}

export const getDialog = (state) => {
  const dialog = state.appState.currentDialog

  if (!dialog) {
    return false
  }

  return true
}

export const getTasksListVisibility = (state) => {
  return state.appState.tasksList.isVisible
}

export const getArchivedTasksVisibility = (state) => {
  return state.getIn(['appState', 'archivedTasks', 'isVisible'])
}

export const getTaskTagDetail = (state) => {
  return state.getIn(['appState', 'taskTagDetail'])
}


