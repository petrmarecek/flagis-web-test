import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import { ICONS } from '../../icons/icon-constants'
import { Button } from './styles'

const TaskDetailComplete = ({ isArchived, isUpdatable, onClick }) => {
  const actualIcon = useMemo(
    () => isArchived ? ICONS.NON_ARCHIVE : ICONS.ARCHIVE,
    [isArchived],
  )

  if (!isUpdatable) {
    return null
  }

  return (
    <Button icon={actualIcon} onClick={onClick} />
  )
}

TaskDetailComplete.defaultProps = {
  isUpdatable: true,
}

TaskDetailComplete.propTypes = {
  isArchived: PropTypes.bool.isRequired,
  isUpdatable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TaskDetailComplete
