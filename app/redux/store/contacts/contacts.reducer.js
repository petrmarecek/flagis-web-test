import typeToReducer from 'type-to-reducer'

import { CONTACTS } from './contacts.actions'
import { ContactStore } from 'redux/data/records'

export default typeToReducer({

  [CONTACTS.FETCH]: {
    PENDING: state => state.setIn(['isFetching'], true),
    FULFILLED: state => state.setIn(['isFetching'], false),
  },

  [CONTACTS.UPDATE_SEARCH]: (state, action) => state
    .setIn(['search'], action.payload.search),

}, new ContactStore())

