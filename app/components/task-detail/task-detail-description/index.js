import PropTypes from 'prop-types'
import React from 'react'

import { MarkdownEditableContainer, Wrapper } from './styles'

const TaskDetailDescription = ({ description, isUpdatable, onUpdate, onUpload, taskId }) => {
  if (!description && !isUpdatable) {
    return null
  }

  return (
    <Wrapper>
      <MarkdownEditableContainer
        componentId={taskId}
        content={description}
        editorHeight={500}
        setDescription={onUpdate}
        disabled={!isUpdatable}
        onInsertImage={onUpload}
        view='full'
      />
    </Wrapper>
  )
}

TaskDetailDescription.defaultProps = {
  description: null,
  isUpdatable: true,
}

TaskDetailDescription.propTypes = {
  description: PropTypes.string,
  isUpdatable: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
}

export default TaskDetailDescription
