import typeToReducer from 'type-to-reducer'
import { NOTIFICATIONS } from './notifications.actions'
import { NotificationStore } from '../../data/records'

export default typeToReducer(
  {
    [NOTIFICATIONS.FETCH]: {
      PENDING: state => state.setIn(['isFetching'], true),
      FULFILLED: state => state.setIn(['isFetching'], false),
    },
  },
  new NotificationStore()
)
