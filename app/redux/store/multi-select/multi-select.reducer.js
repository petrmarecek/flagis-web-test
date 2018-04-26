import typeToReducer from 'type-to-reducer'

import { MULTI_SELECT } from './multi-select.actions'
import { MultiSelectStore } from '../../data/records'

export default typeToReducer({

  [MULTI_SELECT.ADD_TO_LIST]: (state, action) =>
    state.updateIn(['tasks', action.payload.typeList], list => list.push(action.payload.item)),

  [MULTI_SELECT.DELETE_FROM_LIST]: (state, action) =>
    state.updateIn(['tasks', action.payload.typeList], list => list.delete(list.indexOf(action.payload.item))),

  [MULTI_SELECT.CLEAR_LISTS]: (state) => state
    .updateIn(['tasks', 'activeTags'], list => list.clear())
    .updateIn(['tasks', 'inactiveTags'], list => list.clear())
    .updateIn(['tasks', 'otherTags'], list => list.clear())
    .updateIn(['tasks', 'addTags'], list => list.clear())
    .updateIn(['tasks', 'removeTags'], list => list.clear())
  ,

}, new MultiSelectStore())
