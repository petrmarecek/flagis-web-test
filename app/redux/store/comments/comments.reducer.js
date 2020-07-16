import typeToReducer from 'type-to-reducer'
import { COMMENTS } from './comments.actions'
import { CommentStore } from '../../data/records'

export default typeToReducer(
  {
    [COMMENTS.FETCH]: {
      PENDING: state => state.setIn(['isFetching'], true),
      FULFILLED: state => state.setIn(['isFetching'], false),
    },
  },
  new CommentStore()
)
