import { reset } from 'redux-form'

export const afterSubmit = (result, dispatch) => {
  dispatch(reset('changePassword'))
}
