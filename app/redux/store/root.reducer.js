/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer} from 'redux-form'

import languageProviderReducer from 'containers/language-provider/reducer';
import appState from 'redux/store/app-state/app-state.reducer'
import auth from 'redux/store/auth/auth.reducer'
import entities from 'redux/store/entities/entities.reducer'
import tasksMenu from 'redux/store/tasks-menu/tasks-menu.reducer'
import tasks from 'redux/store/tasks/tasks.reducer'
import comments from 'redux/store/comments/comments.reducer'
import attachments from 'redux/store/attachments/attachments.reducer'
import tree from 'redux/store/tree/tree.reducer'
import tags from 'redux/store/tags/tags.reducer'
import contacts from 'redux/store/contacts/contacts.reducer'
import multiSelect from 'redux/store/multi-select/multi-select.reducer'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    appState,
    auth,
    entities,
    tasks,
    comments,
    attachments,
    tasksMenu,
    multiSelect,
    tree,
    tags,
    contacts,
    form: formReducer,
    route: routeReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
