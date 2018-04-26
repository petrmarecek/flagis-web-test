import typeToReducer from 'type-to-reducer'
import { ATTACHMENTS } from './attachments.actions'
import { AttachmentStore } from '../../data/records'

export default typeToReducer({

  [ATTACHMENTS.FETCH]: {
    PENDING: state => state.setIn(['isFetching'], true),
    FULFILLED: state => state.setIn(['isFetching'], false),
  },

}, new AttachmentStore())
