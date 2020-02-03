const messages = {
  requiredFirstName: 'First name field is required',
  requiredLastName: 'Subject field is required',
  requiredEmail: 'E-mail field is required',
  requiredPassword: 'Password field is required',
  requiredSubject: 'Last name field is required',
  requiredMessage: 'Message field is required',
  badEmail: 'Email is incorrect',
  badFirstName: 'First name is incorrect',
  badLastName: 'Last name is incorrect',
  badSubject: 'Subject is incorrect',
  badMessage: 'Message is long',
  shortPassword: 'Password is short',
  passwordNotMatch: 'Passwords do not match',
}

// Regex variables
export const nameRegex = /^[A-ZÁ-Ža-za-ž]{1,32}$/i
export const textNumberRegex = /^[A-ZÁ-Ža-za-ž0-9 ]{1,256}$/i
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

// Validations
const isEmail = text => typeof text === 'string' && emailRegex.test(text)
const isName = text => typeof text === 'string' && nameRegex.test(text)
const isTextAndNumber = text =>
  typeof text === 'string' && textNumberRegex.test(text)

const validateEmail = values => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = messages.requiredEmail
  } else if (!isEmail(values.get('email'))) {
    errors.email = messages.badEmail
  }

  return errors
}

const validatePassword = values => {
  const errors = {}

  if (!values.get('password')) {
    errors.password = messages.requiredPassword
  } else if (values.get('password').length < 8) {
    errors.password = messages.shortPassword
  }

  return errors
}

const validateConfirmPassword = values => {
  const errors = {}

  if (!values.get('confirmPassword')) {
    errors.confirmPassword = messages.passwordNotMatch
  } else if (values.get('newPassword') !== values.get('confirmPassword')) {
    errors.confirmPassword = messages.passwordNotMatch
  }

  return errors
}

const validateNewPassword = values => {
  const errors = {}

  if (!values.get('newPassword')) {
    errors.newPassword = messages.requiredPassword
  } else if (values.get('newPassword').length < 8) {
    errors.newPassword = messages.shortPassword
  }

  return errors
}

const validateOldPassword = values => {
  const errors = {}

  if (!values.get('oldPassword')) {
    errors.oldPassword = messages.requiredEmail
  }

  return errors
}

const validateFirstName = values => {
  const errors = {}

  if (!values.get('firstName')) {
    errors.firstName = messages.requiredFirstName
  } else if (!isName(values.get('firstName'))) {
    errors.firstName = messages.badFirstName
  }

  return errors
}

const validateLastName = values => {
  const errors = {}

  if (!values.get('lastName')) {
    errors.lastName = messages.requiredLastName
  } else if (!isName(values.get('lastName'))) {
    errors.lastName = messages.badLastName
  }

  return errors
}

const validateSubject = values => {
  const errors = {}

  if (!values.get('subject')) {
    errors.subject = messages.requiredSubject
  } else if (!isTextAndNumber(values.get('subject'))) {
    errors.subject = messages.badSubject
  }

  return errors
}

const validateMessage = values => {
  const errors = {}

  if (!values.get('message')) {
    errors.message = messages.requiredMessage
  } else if (values.get('message').length > 2048) {
    errors.message = messages.badMessage
  }

  return errors
}

// Forms
export const validateSignIn = values => ({
  ...validateEmail(values),
  ...validatePassword(values),
})

export const validateSignUp = values => ({
  ...validateFirstName(values),
  ...validateLastName(values),
  ...validateEmail(values),
  ...validateNewPassword(values),
  ...validateConfirmPassword(values),
})

export const validateEmailResetPassword = values => ({
  ...validateEmail(values),
})

export const validateResetPassword = values => ({
  ...validateNewPassword(values),
  ...validateConfirmPassword(values),
})

export const validateChangePassword = values => ({
  ...validateOldPassword(values),
  ...validateNewPassword(values),
  ...validateConfirmPassword(values),
})

export const validateAddContact = values => ({
  ...validateEmail(values),
})

export const validateChangeName = values => ({
  ...validateFirstName(values),
  ...validateLastName(values),
})

export const validateContactUs = values => ({
  ...validateFirstName(values),
  ...validateLastName(values),
  ...validateEmail(values),
  ...validateSubject(values),
  ...validateMessage(values),
})
