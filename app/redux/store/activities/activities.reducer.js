import typeToReducer from 'type-to-reducer'
import { ACTIVITIES } from './activities.actions'
import { ActivitiesStore } from '../../data/records'

export default typeToReducer(
  {
    [ACTIVITIES.FETCH]: {
      PENDING: state => state.setIn(['isFetching'], true),
      FULFILLED: state => state.setIn(['isFetching'], false),
    },
  },
  new ActivitiesStore()
)
