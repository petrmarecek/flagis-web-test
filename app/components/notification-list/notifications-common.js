export const notificationText = type => {
  switch (type) {
    case 'TASKS/DATES/START':
      return `Start date`

    case 'TASKS/DATES/REMINDER':
      return `Reminder`

    case 'TASKS/DATES/DUE-DATE':
      return `Due date`

    case 'TASKS/FOLLOWERS/SEND':
      return `New Task`

    case 'TASKS/FOLLOWERS/ACCEPT':
      return `Accepted`

    case 'TASKS/FOLLOWERS/REJECT':
      return `Rejected`

    case 'TASKS/FOLLOWERS/TAKE-BACK':
      return `Task removed`

    case 'TASKS/COMPLETED':
      return `Completed`

    case 'TASKS/UNCOMPLETED':
      return `Uncompleted`

    case 'TASKS/COMMENTS/ADD':
      return `New comment`

    case 'TASKS/ATTACHMENTS/ADD':
      return `New attachment`

    default:
      return 'Task was updated'
  }
}
