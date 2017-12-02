import { Schema, arrayOf } from 'normalizr';

const tag = new Schema('tags', { idAttribute: 'id' })
const tagList = arrayOf(tag)

const task = new Schema('tasks', { idAttribute: 'id' })
const taskList = arrayOf(task)

task.define({
  tags: arrayOf(tag),
})

const treeItem = new Schema('treeItem', { idAttribute: 'id' })
treeItem.define({
  tag
})

const tree = new Schema('tree', { idAttribute: 'parentId' })
const treeList = arrayOf(tree)

tree.define({
  items: arrayOf(treeItem)
})

const comment = new Schema('comment', { idAttribute: 'id' })
const commentList = arrayOf(comment)

comment.define({
  items: arrayOf(comment)
})

const attachment = new Schema('attachment', { idAttribute: 'id' })
const attachmentList = arrayOf(attachment)

attachment.define({
  items: arrayOf(attachment)
})

export default {
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
