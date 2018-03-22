export const errorMessages = {

  signIn: {
    unauthorized: 'Incorrect E-mail or Password',
    passwordResetRequired: 'Please, reset your password. Click on the Forgot your password?',
  },

  signUp: {
    conflict: 'This E-mail is already in use.',
  },

  changePassword: {
    badRequest: 'Incorrect old password.',
  },

  resetPassword: {
    linkExpired: 'Link is expired. Please ask for a new one.',
  },

  tags: {
    createConflict: 'Cannot create tag.',
    referenceDeleteConflict: 'The target tag cannot be deleted because it is referenced ' +
    'in the filter tree. Please delete the referencing tree item first.',
    relationDeleteConflict: 'The target tag cannot be deleted because it has ' +
    'relations in tasks list. Please delete the relations first.',
  },

  treeItems: {
    duplicatePathConflict: 'Cannot perform this move tree validation failed. ' +
    'Tag duplication found in the result tree path.',
    duplicateLevelConflict: 'Cannot perform this move tree validation failed. ' +
    'The same tag found on the same tree level.',
  },

  sessionExpired: 'Your session has expired.'
}

export const successMessages = {
  emailResetPassword: email => {
    return `If Flagis account exists for ${email}, an e-mail will be sent with further instructions.`
  },

  tasks: {
    archive: 'Task was archived.',
    cancelArchive: 'Task was returned to the main list as completed task.',
  },

  multiSelect: {
    archive: 'Tasks were archived.',
  },

  changePassword: 'Password has successfully been changed.',
}

export const infoMessages = {
  treeItems: {
    edit: 'You are editing tag properties (not the filter).',
  },
}
