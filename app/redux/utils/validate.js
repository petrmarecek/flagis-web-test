const messages = {
  requiredFirstName: 'The First name field is required',
  requiredLastName: 'The Last name field is required',
  requiredEmail: 'The E-mail field is required',
  requiredPassword: 'The Password field is required',
  badEmail: 'Email is incorrect',
  shortPassword: 'Password is short',
  passwordNotMatch: 'Passwords do not match'
}

const isEmail = text => (typeof text === 'string') && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)

export const validateChangePassword = values => {
  const errors = {}

  if (!values.oldPassword) {
    errors.oldPassword = messages.requiredEmail
  }

  if (!values.newPassword) {
    errors.newPassword = messages.requiredPassword
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.shortPassword
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  }

  return errors
}

export const validateSignIn = values => {
  const errors = {}

  if (!values.email) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.email)) {
    errors.email = messages.badEmail
  }

  if (!values.password) {
    errors.password = messages.requiredPassword
  } else if (values.password.length < 6) {
    errors.password = messages.shortPassword
  }

  return errors
}

export const validateSignUp = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.requiredFirstName
  }

  if (!values.lastName) {
    errors.lastName = messages.requiredLastName
  }

  if (!values.email) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.email)) {
    errors.email = messages.badEmail
  }

  if (!values.password) {
    errors.password = messages.requiredPassword
  } else if (values.password.length < 8) {
    errors.password = messages.shortPassword
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  }

  return errors
}

export const validateEmailResetPassword = values => {
  const errors = {}

  if (!values.email) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.email)) {
    errors.email = messages.badEmail
  }

  return errors
}

export const validateResetPassword = values => {
  const errors = {}

  if (!values.newPassword) {
    errors.newPassword = messages.requiredPassword
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.shortPassword
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = messages.passwordNotMatch
  }

  return errors
}

export const validateEmail = values => {
  const errors = {}

  if (!values.email) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.email)) {
    errors.email = messages.badEmail
  }

  return errors
}
