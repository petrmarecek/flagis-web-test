import typeToReducer from 'type-to-reducer'

import { ACCOUNT } from 'redux/store/account/account.actions'
import { AccountStore } from '../../data/records'

export default typeToReducer({

  [ACCOUNT.SET_CONTENT]: (state, action) =>
    state.setIn(['content'], action.payload.content),

}, new AccountStore())
