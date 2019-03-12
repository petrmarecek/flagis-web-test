import typeToReducer from 'type-to-reducer'
import { NOTIFICATIONS } from './notifications.actions'
import { NotificationStore } from '../../data/records'

export default typeToReducer(
  {
    [NOTIFICATIONS.FETCH]: {
      PENDING: state => state.set('isFetching', true),
      FULFILLED: state => state.set('isFetching', false),
    },

    [NOTIFICATIONS.READ_VISIBLE]: state => state.set('isReadVisible', true),

    [NOTIFICATIONS.READ_HIDE]: state => state.set('isReadVisible', false),
  },
  new NotificationStore()
)
