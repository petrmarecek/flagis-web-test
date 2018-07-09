const messages = {
  requiredFirstName: 'The First name field is required',
  requiredLastName: 'The Last name field is required',
  requiredEmail: 'The E-mail field is required',
  requiredPassword: 'The Password field is required',
  badEmail: 'Email is incorrect',
  badFirstName: 'First name is incorrect',
  badLastName: 'Last name is incorrect',
  shortPassword: 'Password is short',
  passwordNotMatch: 'Passwords do not match'
}

// Validations
const isEmail = text => (typeof text === 'string') && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)
const isName = text => (typeof text === 'string') && /^[A-Za-z]{1,32}$/i.test(text)

const validateEmail = values => {
  const errors = {}

  if (!values.email) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.email)) {
    errors.email = messages.badEmail
  }

  return errors
}

const validatePassword = values => {
  const errors = {}

  if (!values.password) {
    errors.password = messages.requiredPassword
  } else if (values.password.length < 8) {
    errors.password = messages.shortPassword
  }

  return errors
}

const validateConfirmPassword = values => {
  const errors = {}

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  }

  return errors
}

const validateNewPassword = values => {
  const errors = {}

  if (!values.newPassword) {
    errors.newPassword = messages.requiredPassword
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.shortPassword
  }

  return errors
}

const validateOldPassword = values => {
  const errors = {}

  if (!values.oldPassword) {
    errors.oldPassword = messages.requiredEmail
  }

  return errors
}

const validateFirstName = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.requiredFirstName
  } else if (!isName(values.firstName)) {
    errors.email = messages.badFirstName
  }

  return errors
}

const validateLastName = values => {
  const errors = {}

  if (!values.lastName) {
    errors.lastName = messages.requiredLastName
  } else if (!isName(values.lastName)) {
    errors.email = messages.badLastName
  }

  return errors
}

// Forms
export const validateSignIn = values => ({
  ...validateEmail(values),
  ...validatePassword(values)
})

export const validateSignUp = values => ({
  ...validateFirstName(values),
  ...validateLastName(values),
  ...validateEmail(values),
  ...validatePassword(values),
  ...validateConfirmPassword(values)
})

export const validateEmailResetPassword = values => ({
  ...validateEmail(values)
})

export const validateResetPassword = values => ({
  ...validateNewPassword(values),
  ...validateConfirmPassword(values)
})

export const validateChangePassword = values => ({
  ...validateOldPassword(values),
  ...validateNewPassword(values),
  ...validateConfirmPassword(values)
})

export const validateAddContact = values => ({
  ...validateEmail(values)
})

export const validateChangeName = values => ({
  ...validateFirstName(values),
  ...validateLastName(values)
})
