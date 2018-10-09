import { schema } from 'normalizr';

const contact = new schema.Entity('contacts', {}, { idAttribute: 'id' })
const contactList = new schema.Array(contact)

const profile = new schema.Entity('profile', {}, { idAttribute: 'id' })
const follower = new schema.Entity('followers', {}, { idAttribute: 'id' })

follower.define({ profile })

const tag = new schema.Entity('tags', {}, { idAttribute: 'id' })
const tagList = new schema.Array(tag)

const task = new schema.Entity('tasks', {}, { idAttribute: 'id' })
const taskList = new schema.Array(task)

task.define({
  tags: new schema.Array(tag),
  followers: new schema.Array(follower),
})

const treeItem = new schema.Entity('treeItem', {}, { idAttribute: 'id' })

treeItem.define({
  tag
})

const tree = new schema.Entity('tree', {}, { idAttribute: 'parentId' })
const treeList = new schema.Array(tree)

tree.define({
  items: new schema.Array(treeItem)
})

const comment = new schema.Entity('comment', {}, { idAttribute: 'id' })
const commentList = new schema.Array(comment)

comment.define({
  items: new schema.Array(comment)
})

const attachment = new schema.Entity('attachment', {}, { idAttribute: 'id' })
const attachmentList = new schema.Array(attachment)

attachment.define({
  items: new schema.Array(attachment)
})

export default {
  contact,
  contactList,
  follower,
  tag,
  tagList,
  task,
  taskList,
  treeItem,
  tree,
  treeList,
  comment,
  commentList,
  attachment,
  attachmentList,
}
