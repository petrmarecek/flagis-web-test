import PropTypes from 'prop-types'
import React from 'react'

import { Button, Icon} from './styles'

const TaskDetailComplete = ({ isCompleted, isUpdatable, onClick }) => {
  if (!isUpdatable) {
    return null
  }

  return (
    <Button isCompleted={isCompleted} onClick={onClick}>
      <Icon isCompleted={isCompleted} />
    </Button>
  )
}

TaskDetailComplete.defaultProps = {
  isUpdatable: true,
}

TaskDetailComplete.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  isUpdatable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TaskDetailComplete
