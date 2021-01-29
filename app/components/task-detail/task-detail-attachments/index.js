import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'

import {
  Body,
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderTitle,
  Wrapper,
} from './styles'
import TaskDetailAttachmentsItem from './task-detail-attachments-item'

const TaskDetailAttachments = props => {
  const { attachments, onDelete, onFetch } = props

  // Start fetching attachments
  useEffect(() => {
    onFetch()
  }, [onFetch])

  // Prepare handler for deleting attachment
  const handleDeleteItem = useCallback(
    attachmentId => () => onDelete(attachmentId),
    [onDelete]
  )

  // Hide when no attachments found
  if (isEmpty(attachments)) {
    return null
  }

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <HeaderIcon />
        </HeaderLeft>
        <HeaderTitle>Attachments</HeaderTitle>
      </Header>
      <Body>
        {attachments.map(item => (
          <TaskDetailAttachmentsItem
            attachment={item}
            key={item.id}
            onDelete={handleDeleteItem(item.id)}
          />
        ))}
      </Body>
    </Wrapper>
  )
}

TaskDetailAttachments.defaultProps = {
  isFetching: false,
  isUpdatable: true,
}

TaskDetailAttachments.propTypes = {
  attachments: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  isUpdatable: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
}

export default TaskDetailAttachments
