import PropTypes from 'prop-types'
import React from 'react'

import { Item, ItemDelete, ItemFile, ItemIcon, ItemTitle } from './styles'

const TaskDetailAttachmentsItem = ({ attachment, onDelete }) => (
  <Item>
    <ItemFile href={attachment.url}>
      <ItemIcon />
      <ItemTitle>{attachment.fileName}</ItemTitle>
    </ItemFile>
    <ItemDelete onClick={onDelete} />
  </Item>
)

TaskDetailAttachmentsItem.propTypes = {
  attachment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default TaskDetailAttachmentsItem
