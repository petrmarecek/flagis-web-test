import { reset } from 'redux-form'

export const afterSubmit = (result, dispatch) => {
  dispatch(reset('changePassword'))
}

export const afterSubmitContacts = (result, dispatch) => {
  dispatch(reset('addContactForm'))
}
