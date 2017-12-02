import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form'

import appState from './app-state/app-state.reducer'
import auth from './auth/auth.reducer'
import entities from './entities/entities.reducer'
import tasksMenu from './tasks-menu/tasks-menu.reducer'
import tasks from './tasks/tasks.reducer'
import tree from './tree/tree.reducer'
import tags from './tags/tags.reducer'
import comments from './comments/comments.reducer'
import attachments from './attachments/attachments.reducer'
import multiSelect from './multi-select/multi-select.reducer'


export default combineReducers({
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
  routing: routerReducer,
  form: formReducer,
})
