export const activityText = (type, data) => {
  switch (type) {
    case 'TASKS/CREATE':
      return 'Task was created'

    case 'TASKS/UPDATE': {
      switch (Object.keys(data.new)[0]) {
        case 'completedAt':
          return data.old.completedAt === null
            ? 'Task was completed'
            : 'Task was uncompleted'

        case 'archivedAt':
          return data.old.archivedAt === null
            ? 'Task was archived'
            : 'Task was dearchived'

        case 'madeImportantAt':
          return data.old.madeImportantAt === null
            ? 'Task was marked as important'
            : 'Task was marked as unimportant'

        case 'subject':
          return 'Subject was updated'

        case 'description':
          return 'Description was updated'

        case 'startDate':
          return 'Start date was updated'

        case 'dueDate':
          return 'Due date was updated'

        case 'reminderDate':
          return 'Reminder date was updated'

        case 'order':
          return 'Task was moved'

        default:
          return null
      }
    }

    case 'TASKS/UPDATE-TAGS':
      return 'Tags were updated'

    case 'TASKS/ADD-FOLLOWER':
      return `${data.profile.nickname} was added to task`

    case 'TASKS/DELETE-FOLLOWER':
      return `${data.profile.nickname} was removed from task`

    case 'TASKS/SEND-TO-FOLLOWER':
      return `Tasks was sent`

    case 'TASKS/ACCEPT-BY-FOLLOWER':
      return `Task was accepted`

    case 'TASKS/REJECT-BY-FOLLOWER':
      return `Task was rejected`

    case 'TASKS/ADD-ATTACHMENT':
      return `Attachments were updated`

    case 'TASKS/DELETE-ATTACHMENT':
      return `Attachments were updated`

    default:
      return 'Task was updated'
  }
}
