import { List } from 'immutable'
import typeToReducer from 'type-to-reducer'
import { ATTACHMENTS } from './attachments.action'
import { AttachmentStore } from '../../data/records'

export default typeToReducer({

  [ATTACHMENTS.FETCH]: {
    PENDING: state =>
      state.setIn(['isFetching'], true),

    FULFILLED: (state, action) => {
      const attachmentIds = List(action.payload.result)
      return state
        .setIn(['isFetching'], false)
        .setIn(['items'], attachmentIds)
    }
  },

  [ATTACHMENTS.ADD]: (state, action) =>
    state.updateIn(['items'], list => list.push(action.payload.result)),

  [ATTACHMENTS.DELETE]: (state, action) =>
    state.updateIn(['items'], list => list.delete(list.indexOf(action.payload.attachmentId))),

}, new AttachmentStore())
