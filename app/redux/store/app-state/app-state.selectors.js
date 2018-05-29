import { getEntitiesTags } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Selectors ----------------------------------------------------

// Local selectors
const getTagHintsVisibleTags = state => state.getIn(['appState', 'tagHints', 'visibleTags'])

// Export selectors
export const getAppState = state => state.getIn(['appState'])
export const getLeftPanel = state => state.getIn(['appState', 'leftPanel'])
export const getTagHintsRaw = state => state.getIn(['appState', 'tagHints'])
export const getTagHintsVisibility = state => state.getIn(['appState', 'tagHints', 'isVisible'])
export const getTagHintsSelectOnly = state => state.getIn(['appState', 'tagHints', 'isSelectOnly'])
export const getTagAutocompletes = state => state.getIn(['appState', 'tagAutocompletes'])
export const getAppStateItem = (state, type) => state.getIn(['appState', type])
export const getMultiSelectVisibility = state => state.getIn(['appState', 'multiSelect', 'isVisible'])
export const getCurrentDialog = state => state.getIn(['appState', 'currentDialog'])
export const getArchivedTasksVisibility = state => state.getIn(['appState', 'archivedTasks', 'isVisible'])
export const getTaskTagDetail = state => state.getIn(['appState', 'taskTagDetail'])
export const getTaskDetail = state => state.getIn(['appState', 'taskTagDetail', 'task'])
export const getTaskArchiveDetail = state => state.getIn(['appState', 'taskTagDetail', 'archive'])
export const getLoader = state => state.getIn(['appState', 'loader', 'isVisible'])

// ------ Reselect selectors ----------------------------------------------------

export const getTagHints = createSelector(
  getTagHintsRaw,
  getTagHintsVisibleTags,
  getEntitiesTags,
  (tagHintsRaw, tagHintsVisibleTags, entitiesTags) => {
    const visibleTags = tagHintsVisibleTags.map(tagId => entitiesTags.getIn([tagId]))

    return tagHintsRaw.setIn(['visibleTags'], visibleTags)
  }
)
