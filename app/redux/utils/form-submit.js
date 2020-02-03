import { reset } from 'redux-form'

export const afterSubmitChangePassword = (result, dispatch) => {
  dispatch(reset('changePassword'))
}

export const afterSubmitContacts = (result, dispatch) => {
  dispatch(reset('addContactForm'))
}

export const afterSubmitContactUs = (result, dispatch) => {
  dispatch(reset('contactUs'))
}
