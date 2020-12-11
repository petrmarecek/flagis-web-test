import { toast } from 'react-toastify'

export const position = {
  DEFAULT: toast.POSITION.TOP_RIGHT,
}

export const duration = {
  ERROR_DURATION: 12000,
  SUCCESS_DURATION: 10000,
  INFO_DURATION: 10000,
}

export const errorMessages = {
  signIn: {
    unauthorized: 'Incorrect email or Password.',
    passwordResetRequired:
      'Please, reset your password. Click on forgot your password?',
  },

  signUp: {
    conflict: 'This email has already been used.',
  },

  contact: {
    userEmailConflict: 'This is your email.',
  },

  changePassword: {
    badRequest: 'Incorrect old password.',
  },

  resetPassword: {
    linkExpired: 'Link has expired. Please ask for a new one.',
  },

  tasks: {
    waitingResponse:
      'Wait for the response from the recipient or take the task back.',
  },

  tags: {
    createConflict: 'This tag has already been created.',
    titleConflict: 'This title has already been used.',
    referenceDeleteConflict:
      'This tag cannot be deleted because it is used ' +
      'in the tag tree. Please delete this tag from the tag tree first.',
  },

  relations: {
    relationDeleteConflict: (target, list) =>
      `This ${target} cannot be deleted because it has relations ` +
      `in ${list}. Please delete the relations first.`,
  },

  treeItems: {
    duplicatePathConflict:
      'Cannot perform this move. ' +
      'Tag duplication found in the result tree path.',
    duplicateLevelConflict:
      'Cannot perform this move. ' +
      'The same tag found on the same tree level.',
  },

  treeSections: {
    notAllowedDelete:
      'Not allowed to delete. You must have at least one section!',
  },

  createEntity: {
    createConflict: item => `This ${item} has already been created.`,
    notAllowedCreate: (item, location) =>
      `Not allowed to create ${item} in ${location}.`,
  },

  sessionExpired: 'Your session has expired.',

  somethingWrong: 'Sorry, something went wrong. Please try again.',

  files: {
    sizeValidation: 'File is too big.',
  },
}

export const successMessages = {
  emailResetPassword: email => {
    return `If Flagis account exists for ${email}, an e-mail will be sent with further instructions.`
  },

  tasks: {
    archive: 'Task has been archived.',
    cancelArchive: 'Task has been returned to My Tasks as completed task.',
    accepted: 'Task has been moved into your tasks.',
  },

  multiSelect: {
    archive: 'Tasks have been archived.',
  },

  contacts: {
    create: 'Contact was created.',
    sendInvitation: 'Invitation has been sent to the contact.',
  },

  changePassword: 'Password has successfully been changed.',

  changeName: 'Name has successfully been changed.',

  contactUs: 'Thank you for your message.',
}

export const infoMessages = {
  treeItems: {
    edit: 'You are editing the tag.',
  },

  collaboration: {
    removeFollower:
      'Sender has just removed you from a task. Check your notifications.',
    deletedTask: 'Sender has just deleted a task. Check your notifications.',
  },

  taskDetail: {
    acceptedRules: 'Not allowed to edit subject, due date and description.',
    inboxRules:
      'Allowed to accept, reject and add comments and attachments only.',
    completedRules:
      'Allowed to uncomplete, archive and add comments and attachments only.',
  },
}
