import typeToReducer from 'type-to-reducer'
import { STATS } from './stats.actions'
import { StatsStore } from '../../data/records'

export default typeToReducer(
  {
    [STATS.FETCH]: {
      PENDING: state => state.setIn(['isFetching'], true),

      FULFILLED: (state, action) =>
        state.setIn(['isFetching'], false).setIn(['data'], action.payload),
    },
  },
  new StatsStore()
)
