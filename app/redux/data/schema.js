import _ from 'lodash'
import { schema } from 'normalizr'
import { getAssigneeOfTask } from '../utils/component-helper'

const contact = new schema.Entity('contacts', {}, { idAttribute: 'id' })
const contacts = new schema.Array(contact)

const profile = new schema.Entity('profile', {}, { idAttribute: 'id' })
const createdBy = new schema.Entity('createdBy', {}, { idAttribute: 'id' })

const follower = new schema.Entity(
  'followers',
  { profile },
  {
    idAttribute: 'id',
    processStrategy: entity => {
      if (_.has(entity, 'userId')) {
        return entity
      }

      const userId = entity.profile.id
      return _.assign({ userId }, entity)
    },
  }
)
const followers = new schema.Array(follower)

const tag = new schema.Entity('tags', {}, { idAttribute: 'id' })
const tags = new schema.Array(tag)

const treeItem = new schema.Entity('treeItem', { tag }, { idAttribute: 'id' })
const treeItems = new schema.Array(treeItem)

const tree = new schema.Entity(
  'tree',
  { items: treeItems },
  { idAttribute: 'parentId' }
)
const trees = new schema.Array(tree)

const task = new schema.Entity(
  'tasks',
  { tags, followers, createdBy },
  {
    idAttribute: 'id',
    processStrategy: entity => {
      if (entity.userId) {
        const { createdById, userId } = entity
        const assignee = getAssigneeOfTask(entity.followers)
        if (createdById !== userId && assignee !== null) {
          const { isArchived, isImportant, order, reminderDate } = assignee

          _.set(entity, 'isArchived', isArchived)
          _.set(entity, 'isImportant', isImportant)
          _.set(entity, 'order', order)
          _.set(entity, 'reminderDate', reminderDate)
        }
      }

      return _.omit(entity, ['followerIds', 'userId'])
    },
  }
)
const tasks = new schema.Array(task)

const activitie = new schema.Entity('activitie', {}, { idAttribute: 'id' })
const activities = new schema.Array(activitie)

const notification = new schema.Entity(
  'notification',
  {},
  { idAttribute: 'id' }
)
const notifications = new schema.Array(notification)

const comment = new schema.Entity('comment', {}, { idAttribute: 'id' })
const comments = new schema.Array(comment)

comment.define({
  items: comments,
})

const attachment = new schema.Entity('attachment', {}, { idAttribute: 'id' })
const attachments = new schema.Array(attachment)

attachment.define({
  items: attachments,
})

export default {
  contact,
  contacts,
  follower,
  tag,
  tags,
  task,
  tasks,
  treeItem,
  tree,
  trees,
  activitie,
  activities,
  notification,
  notifications,
  comment,
  comments,
  attachment,
  attachments,
}
