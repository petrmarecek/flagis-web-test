import { put, select } from 'redux-saga/effects'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as taskMenuSelectros from 'redux/store/tasks-menu/tasks-menu.selectors'

export function* changeRangeFilter(action) {
  const activeFilters = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'active'))
  const range = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'range'))
  const value = action.value

  if (range) {
    if (activeFilters.includes('today')) {
      yield put(taskMenuActions.deleteActiveFilter('today'))
    }

    if (activeFilters.includes('week')) {
      yield put(taskMenuActions.deleteActiveFilter('week'))
    }

    if (activeFilters.includes('month')) {
      yield put(taskMenuActions.deleteActiveFilter('month'))
    }

    yield put(taskMenuActions.addActiveFilter(value))
  } else {
    yield put(taskMenuActions.deleteActiveFilter(value))
  }

}

export function* toggleImportantFilter() {
  const activeFilters = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'active'))
  const important = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'important'))

  if (important) {
    if (activeFilters.includes('unimportant')) {
      yield put(taskMenuActions.deleteActiveFilter('unimportant'))
    }

    yield put(taskMenuActions.addActiveFilter('important'))
  } else {
    yield put(taskMenuActions.deleteActiveFilter('important'))
  }
}

export function* toggleUnimportantFilter() {
  const activeFilters = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'active'))
  const unimportant = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'unimportant'))

  if (unimportant) {
    if (activeFilters.includes('important')) {
      yield put(taskMenuActions.deleteActiveFilter('important'))
    }

    yield put(taskMenuActions.addActiveFilter('unimportant'))
  } else {
    yield put(taskMenuActions.deleteActiveFilter('unimportant'))
  }
}

export function* toggleNoTagsFilter() {
  const noTags = yield select(state => taskMenuSelectros.getTaskMenuFiltersItem(state, 'noTags'))

  if (noTags) {
    yield put(taskMenuActions.addActiveFilter('noTags'))
  } else {
    yield put(taskMenuActions.deleteActiveFilter('noTags'))
  }
}

export function* deleteFilter(action) {
  yield put(taskMenuActions.deleteActiveFilter(action.payload.filter))
}
