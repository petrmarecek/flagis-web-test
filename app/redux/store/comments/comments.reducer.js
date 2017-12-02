import { List } from 'immutable'
import typeToReducer from 'type-to-reducer'
import { COMMENTS } from './comments.action'
import { CommentStore } from '../../data/records'

export default typeToReducer({

  [COMMENTS.FETCH]: {
    PENDING: state =>
      state.setIn(['isFetching'], true),

    FULFILLED: (state, action) => {
      const commentIds = List(action.payload.result)
      return state
        .setIn(['isFetching'], false)
        .setIn(['items'], commentIds)
    }
  },

  [COMMENTS.ADD]: (state, action) =>
    state.updateIn(['items'], list => list.push(action.payload.result)),

  [COMMENTS.DELETE]: (state, action) =>
    state.updateIn(['items'], list => list.delete(list.indexOf(action.payload.commentId))),

}, new CommentStore())
