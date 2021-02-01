import typeToReducer from 'type-to-reducer'

import { AUTH } from '../auth/auth.actions'
import { TASKS_MENU } from './tasks-menu.actions'
import { TasksMenuStore } from '../../data/records'

export default typeToReducer(
  {
    [TASKS_MENU.RESET]: state =>
      state
        .setIn(['filters', 'activeAssignee'], null)
        .setIn(['filters', 'assignee'], false)
        .setIn(['filters', 'range'], null)
        .setIn(['filters', 'important'], false)
        .setIn(['filters', 'unimportant'], false)
        .setIn(['filters', 'completed'], false)
        .setIn(['filters', 'uncompleted'], false)
        .setIn(['filters', 'noIncoming'], false)
        .setIn(['filters', 'noTags'], false)
        .updateIn(['filters', 'active'], list => list.clear())
        .setIn(['sort', 'defaultSort'], true)
        .setIn(['sort', 'alphabet'], false)
        .setIn(['sort', 'incomplete'], false)
        .setIn(['sort', 'dueDate'], false)
        .setIn(['sort', 'important'], false),

    // ------ FILTERS ACTIONS --------------------------------------------------

    [TASKS_MENU.TOGGLE_ASSIGNEE_FILTER]: state =>
      state.setIn(['filters', 'assignee'], !state.filters.assignee),

    [TASKS_MENU.TOGGLE_SENDER_FILTER]: state =>
      state.setIn(['filters', 'sender'], !state.filters.sender),

    [TASKS_MENU.CHANGE_RANGE_FILTER]: (state, action) => {
      // same filter --> toggle, otherwise set
      const previousValue = state.filters.range
      const value = action.value
      return previousValue === value
        ? state.setIn(['filters', 'range'], null)
        : state.setIn(['filters', 'range'], value)
    },

    [TASKS_MENU.TOGGLE_IMPORTANT_FILTER]: state =>
      state
        .setIn(['filters', 'important'], !state.filters.important)
        .setIn(['filters', 'unimportant'], false),

    [TASKS_MENU.TOGGLE_UNIMPORTANT_FILTER]: state =>
      state
        .setIn(['filters', 'unimportant'], !state.filters.unimportant)
        .setIn(['filters', 'important'], false),

    [TASKS_MENU.TOGGLE_COMPLETED_FILTER]: state =>
      state
        .setIn(['filters', 'completed'], !state.filters.completed)
        .setIn(['filters', 'uncompleted'], false),

    [TASKS_MENU.TOGGLE_UNCOMPLETED_FILTER]: state =>
      state
        .setIn(['filters', 'uncompleted'], !state.filters.uncompleted)
        .setIn(['filters', 'completed'], false),

    [TASKS_MENU.TOGGLE_NO_INCOMING_FILTER]: state =>
      state.setIn(['filters', 'noIncoming'], !state.filters.noIncoming),

    [TASKS_MENU.TOGGLE_NO_TAGS_FILTER]: state =>
      state.setIn(['filters', 'noTags'], !state.filters.noTags),

    [TASKS_MENU.DESELECT_NO_TAGS_FILTER]: state =>
      state.setIn(['filters', 'noTags'], false),

    [TASKS_MENU.SET_ACTIVE_SENDER]: (state, action) =>
      state.setIn(['filters', 'activeSender'], action.payload.sender),

    [TASKS_MENU.SET_ACTIVE_ASSIGNEE]: (state, action) =>
      state.setIn(['filters', 'activeAssignee'], action.payload.assignee),

    [TASKS_MENU.DESELECT_ACTIVE_SENDER]: state =>
      state.setIn(['filters', 'activeSender'], null),

    [TASKS_MENU.DESELECT_ACTIVE_ASSIGNEE]: state =>
      state.setIn(['filters', 'activeAssignee'], null),

    [TASKS_MENU.ADD_ACTIVE_FILTER]: (state, action) =>
      state.updateIn(['filters', 'active'], list =>
        list.push(action.payload.filter),
      ),

    [TASKS_MENU.DELETE_ACTIVE_FILTER]: (state, action) =>
      state.updateIn(['filters', 'active'], list => {
        if (!list.includes(action.payload.filter)) {
          return list
        }

        return list.delete(list.indexOf(action.payload.filter))
      }),

    [TASKS_MENU.DELETE_FILTER]: (state, action) => {
      const filter = action.payload.filter
      const resetFilter =
        filter === 'today' || filter === 'week' || filter === 'month'
          ? null
          : false
      const typeFilter = resetFilter === null ? 'range' : filter

      return state.setIn(['filters', typeFilter], resetFilter)
    },

    [TASKS_MENU.VISIBLE_MENU_FILTER]: state =>
      state.setIn(['filters', 'menu', 'isVisible'], true),

    [TASKS_MENU.HIDE_MENU_FILTER]: state =>
      state.setIn(['filters', 'menu', 'isVisible'], false),

    [TASKS_MENU.SET_USER_IDS_FILTER]: (state, { payload }) => state
      .setIn(['filters', 'userIds'], payload),

    // ------ SORT ACTIONS -----------------------------------------------------

    [TASKS_MENU.TOGGLE_SORT_ALGORITHM]: (state, action) => {
      const algorithm = action.payload.algorithm
      const isSameAlgorithm = state.getIn(['sort', algorithm])

      if (isSameAlgorithm) {
        return state
          .setIn(['sort', 'defaultSort'], true)
          .setIn(['sort', 'alphabet'], false)
          .setIn(['sort', 'incomplete'], false)
          .setIn(['sort', 'dueDate'], false)
          .setIn(['sort', 'important'], false)
      }

      return state
        .setIn(['sort', 'defaultSort'], false)
        .setIn(['sort', 'alphabet'], false)
        .setIn(['sort', 'incomplete'], false)
        .setIn(['sort', 'dueDate'], false)
        .setIn(['sort', 'important'], false)
        .setIn(['sort', algorithm], true)
    },

    [TASKS_MENU.VISIBLE_MENU_SORT]: state =>
      state.setIn(['sort', 'menu', 'isVisible'], true),

    [TASKS_MENU.HIDE_MENU_SORT]: state =>
      state.setIn(['sort', 'menu', 'isVisible'], false),

    // ------ OPTION ACTIONS ---------------------------------------------------

    [TASKS_MENU.VISIBLE_MENU_OPTION]: state =>
      state.setIn(['options', 'menu', 'isVisible'], true),

    [TASKS_MENU.HIDE_MENU_OPTION]: state =>
      state.setIn(['options', 'menu', 'isVisible'], false),

    [AUTH.LOGOUT]: () => new TasksMenuStore(),
  },
  new TasksMenuStore(),
)
