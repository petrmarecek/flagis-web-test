export const errorMessages = {
  signIn: {
    unauthorized: 'Incorrect E-mail or Password.',
    passwordResetRequired:
      'Please, reset your password. Click on forgot your password?',
  },

  signUp: {
    conflict: 'This E-mail has already been used.',
  },

  changePassword: {
    badRequest: 'Incorrect old password.',
  },

  resetPassword: {
    linkExpired: 'Link has expired. Please ask for a new one.',
  },

  tasks: {
    waitingResponse: 'Waiting for response!',
  },

  tags: {
    createConflict: 'This tag has already been created.',
    titleConflict: 'This title has already been used.',
    referenceDeleteConflict:
      'The target tag cannot be deleted because it is referenced ' +
      'in the filter tree. Please delete the referencing tree item first.',
  },

  relations: {
    relationDeleteConflict: (target, list) =>
      `The target ${target} cannot be deleted because it has relations ` +
      `in ${list} list. Please delete the relations first.`,
    emptyListDeleteConflict: list =>
      `Please, check your ${list} list if there are relations between tasks and tags.`,
  },

  treeItems: {
    duplicatePathConflict:
      'Cannot perform this move. Tree validation failed. ' +
      'Tag duplication found in the result tree path.',
    duplicateLevelConflict:
      'Cannot perform this move. Tree validation failed. ' +
      'The same tag found on the same tree level.',
  },

  createEntity: {
    createConflict: item => `This ${item} has already been created.`,
    notAllowedCreate: (item, location) =>
      `Not allowed to create ${item} in ${location}.`,
  },

  sessionExpired: 'Your session has expired.',

  somethingWrong: 'Sorry, something went wrong. Please try again.',
}

export const successMessages = {
  emailResetPassword: email => {
    return `If Flagis account exists for ${email}, an e-mail will be sent with further instructions.`
  },

  tasks: {
    archive: 'Task has been archived.',
    cancelArchive: 'Task has been returned to the main list as completed task.',
    accepted: 'Task has been moved to the main list.',
    rejected: 'Task has been returned to the owner.',
  },

  multiSelect: {
    archive: 'Tasks have been archived.',
  },

  contacts: {
    sendInvitation: 'Invitation has been sent to the Contact.',
  },

  changePassword: 'Password has successfully been changed.',

  changeName: 'Name has successfully been changed.',
}

export const infoMessages = {
  treeItems: {
    edit: 'You are editing tag properties (not the filter).',
  },

  collaboration: {
    removeFollower: 'Owner has just removed you from task.',
    deletedTask: 'Owner has just deleted task.',
  },

  taskDetail: {
    acceptedRules:
      'Not allowed to edit subject, dates and description of task!',
    inboxRules: 'Allowed to add comments and accept/reject of task!',
    completedRules: 'Allowed to only complete and archive of task!',
  },

  activities: type => {
    switch (type) {
      case 'TASKS/CREATE':
        return 'Tasks was created'

      default:
        return ''
    }
  },
}
