import { reset } from 'redux-form'

export const afterSubmitChangePassword = (result, dispatch) => {
  dispatch(reset('changePassword'))
}

export const afterSubmitChangeName = (result, dispatch) => {
  dispatch(reset('changeName'))
}

export const afterSubmitContacts = (result, dispatch) => {
  dispatch(reset('addContactForm'))
}
