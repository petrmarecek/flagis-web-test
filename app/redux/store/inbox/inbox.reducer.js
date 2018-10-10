import typeToReducer from 'type-to-reducer'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import * as records from 'redux/data/records'

export default typeToReducer({
  [TASKS.FETCH]: {
    PENDING: state => state.withMutations(taskStore => { taskStore.setIn(['isFetching'], true)}),
    FULFILLED: state => state.withMutations(taskStore => { taskStore.setIn(['isFetching'], false)}),
  },
}, new records.InboxStore())
