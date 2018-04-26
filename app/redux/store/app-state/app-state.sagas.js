import { all, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as tasksMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as treeSelectors from 'redux/store/tree/tree.selectors'
import { TagInfo, HintsContext, Position } from 'redux/data/records'

export function* defaultDisplay() {
  const isArchivedTask = select(state => appStateSelectors.getArchivedTasksVisibility(state))
  if (isArchivedTask) {
    yield put(appStateActions.hideArchivedTasks())
  }

  yield put(taskActions.deselectTasks())
  yield put(tagActions.deselectTags())
  yield put(tasksMenuActions.resetTasksMenu())
  yield put(treeActions.selectPath([]))
  yield put(push('/user/tasks'))
}

export function* changeLocation(action) {
  const pathname = action.payload.pathname
  yield put(push(pathname))
}

export function* handleAutocompleteFocus(action) {
  // Get current state from store
  const allTags = (yield select(tagSelectors.getTags)).items
  const context = new HintsContext(action.payload.data.context)
  const selectedTagsIds = yield getSelectedTagIds(action.payload.autocompleteId, context)
  const tagHintsData = yield select(state => appStateSelectors.getTagHintsRaw(state))
  const search = tagHintsData.search
  const selectionIndex = tagHintsData.selectionIndex
  const isSelectOnly = action.payload.autocompleteId === 'search'

  // Compute update
  const visibilityData = { allTags, selectedTagsIds, search, selectionIndex, isSelectOnly }
  const hintsVisibility = computeHintsVisibility(visibilityData)

  // Run update
  yield put(appStateActions.showTagHints({
    autocompleteId: action.payload.autocompleteId,
    isVisible: true,
    isSelectOnly,
    search: action.payload.data.search,
    position: new Position(action.payload.data.position),
    context,
    ...hintsVisibility,
  }))
}

export function* handleAutocompleteGoPrev(action) {
  yield* setNewSelectionIndex(action.payload.autocompleteId, index => index - 1)
}

export function* handleAutocompleteGoNext(action) {
  yield* setNewSelectionIndex(action.payload.autocompleteId, index => index + 1)
}

export function* handleAutocompleteTextChange(action) {
  const allTags = (yield select(tagSelectors.getTags)).items
  const context = (yield select(state => appStateSelectors.getTagHintsRaw(state))).context
  const selectedTagsIds = yield getSelectedTagIds(action.payload.autocompleteId, context)
  const isSelectOnly = yield select(state => appStateSelectors.getTagHintsSelectOnly(state))

  const hintsVisibility = computeHintsVisibility({
    allTags,
    selectedTagsIds,
    search: action.payload.text,
    selectionIndex: 0,
    isSelectOnly,
  })

  // Run update
  yield put(appStateActions.updateTagHints({
    autocompleteId: action.payload.autocompleteId,
    search: action.payload.text,
    position: new Position(action.payload.position),
    ...hintsVisibility,
  }))
}

export function* handleAutocompletePositionChange(action) {
  yield put(appStateActions.updateTagHints({
    position: new Position(action.payload.position),
  }))
}

export function* handleAutocompleteBlur() {
  yield put(appStateActions.hideTagHints())
}


export function* handleAutocompleteSubmit(action) {
  const { context, tag, autocompleteId } = action.payload

  // We allow multiple selections in the task detail
  if (autocompleteId !== 'task') {
    yield put(appStateActions.hideTagHints())
  }

  // Tag create in MainSearch component is not allowed
  if (autocompleteId === 'search' && tag.isNew) {
    return
  }

  yield put(appStateActions.tagAutocompleteReset(autocompleteId))
  yield put(appStateActions.tagHintSelected(autocompleteId, context, tag))
}

export function* selectHint(action) {

  const { payload } = action

  // Hint selected in main search
  if (payload.autocompleteId === 'search') {
    const tagId = action.payload.tag.id
    const activeTags = yield select(state => tagSelectors.getActiveTagsIds(state))

    yield put(tagActions.selectActiveTags(activeTags.unshift(tagId)))
    yield put(appStateActions.hideTagHints())
    return
  }

  // Hint selected within tree context
  if (payload.autocompleteId === 'tree') {
    yield put(treeActions.createTreeItem({
      title: payload.tag.title,
      parentId: payload.context.parentId,
      order: Date.now()
    }))
    return
  }

  // Hint selected within tree context
  if (payload.autocompleteId === 'treeUpdate') {
    yield put(treeActions.updateTreeItemTitle(
      yield select(treeSelectors.getTreeItem, payload.context.updatedTreeItem.treeItemId),
      payload.tag.title
    ))
    return
  }

  // Hint selected within task detail context
  if (payload.autocompleteId === 'task') {
    yield* selectTaskDetailHint(action)
  }
}

export function* handleHintsOutsideClick(action) {

  if (action.payload.context.source === 'tree') {
    yield put(treeActions.hideTreeItemAddControl())
  }

  yield put(appStateActions.hideTagHints())
}

// ------ Private methods -----------------------------------------------------

function* selectTaskDetailHint(action) {
  const taskId = action.payload.context.parentId

  // If tag is not yet defined, add it to the app
  if (action.payload.tag.isNew) {
    yield put(tagActions.addTag(action.payload.tag))
  }

  yield put(taskActions.addTaskTag(taskId, action.payload.tag))

  // Update hints visibility
  const allTags = (yield select(tagSelectors.getTags)).items
  const selectedTagsIds = yield select(state => taskSelectors.getCurrentTaskTags(state))
  const tagHintsData = yield select(state => appStateSelectors.getTagHintsRaw(state))
  const newSearchText = ''
  const hintsVisibility = computeHintsVisibility({
    allTags,
    selectedTagsIds,
    search: newSearchText,
    selectionIndex: tagHintsData.selectionIndex,
  })
  yield all([
    put(appStateActions.updateTagHints({
      search: newSearchText,
      ...hintsVisibility,
    })),
    put(appStateActions.tagAutocompleteSetFocus(action.payload.autocompleteId)),
  ])
}

function* setNewSelectionIndex(autocompleteId, updateFunc) {
  const tagHintsData = yield select(state => appStateSelectors.getTagHintsRaw(state))
  const newSelectionIndex = updateFunc(tagHintsData.selectionIndex)

  // Compute selection
  const selection = getSelection(newSelectionIndex, tagHintsData.visibleTags.size, tagHintsData.newItemVisible)
  let selectedItem
  if (selection.newItemSelected) {
    selectedItem = new TagInfo({ isNew: true, id: null, title: tagHintsData.search })
  } else {
    const targetItemId = tagHintsData.visibleTags.get(selection.hintsSelectionIndex)
    const targetTag = yield select(state => tagSelectors.getTag(state, targetItemId))
    selectedItem = new TagInfo({ isNew: false, id: targetItemId, title: targetTag.title })
  }

  // Update
  yield put(appStateActions.updateTagHints({
    autocompleteId,
    selectionIndex: selection.hintsSelectionIndex,
    newItemSelected: selection.newItemSelected,
    selectedItem,
  }))
}

function getSelection(newSelectionIndex, visibleTagsCount, newItemVisible) {

  // No tags available (new user)
  if (visibleTagsCount === 0) {
    return { newItemSelected: true, hintsSelectionIndex: -1 }
  }

  // Number of displayed items
  let itemsCount = visibleTagsCount
  if (newItemVisible) {
    itemsCount++
  }

  // Compute index
  let index = newSelectionIndex % itemsCount
  if (index < 0) {
    index += itemsCount
  }

  return (index >= visibleTagsCount && newItemVisible)
    ? { newItemSelected: true, hintsSelectionIndex: -1 }
    : { newItemSelected: false, hintsSelectionIndex: index }
}

function computeHintsVisibility(visibilityData) {

  const {
    allTags,
    selectedTagsIds,
    search,
    selectionIndex,
    isSelectOnly,
  } = visibilityData

  // filter items that are already selected
  const availableTags = allTags
    .filter(tag => {

      const isAlreadySelected = selectedTagsIds.some(selectedTagId => tag.id === selectedTagId)
      return !isAlreadySelected
    })

  // find search matches
  const visibleTags = availableTags
    .filter(tag => tag.title.toLowerCase().startsWith(search.toLowerCase()))
    .map(tag => new TagInfo(tag))

  // text written and no matching tag found -> show create a new tag section
  const isMatch = availableTags.some(tag => tag.title.toLowerCase() === search.toLowerCase())
  const searchNotEmpty = search !== null && search.length > 0
  const newItemVisible = !isMatch && searchNotEmpty && !isSelectOnly

  const selection = getSelection(selectionIndex, visibleTags.size, newItemVisible)
  let selectedItem
  if (selection.newItemSelected) {
    selectedItem = new TagInfo({ isNew: true, id: null, title: search })
  } else {
    const targetItem = visibleTags.get(selection.hintsSelectionIndex)
    selectedItem = new TagInfo({ isNew: false, id: targetItem.id, title: targetItem.title })
  }

  // update state
  return {
    newItemVisible,
    newItemSelected: selection.newItemSelected,
    selectionIndex: selection.hintsSelectionIndex,
    visibleTags: visibleTags.map(tag => tag.id),
    selectedItem,
  }
}

function* getSelectedTagIds(autocompleteId, context) {
  const selectedTagsSelector = {
    'task': {
      selector: taskSelectors.getCurrentTaskTags,
      params: []
    },
    'tree': {
      selector: treeSelectors.getDisabledTagIds,
      params: [
        context.parentId
      ]
    },
    'treeUpdate': {
      selector: treeSelectors.getDisabledTagIds,
      params: [
        context.parentId,
        context.updatedTreeItem
      ]
    },
    'search': {
      selector: tagSelectors.getActiveTagsIds,
      params: []
    },
  }

  const actualSelector = selectedTagsSelector[autocompleteId]
  return yield select(actualSelector.selector, ...actualSelector.params)
}
