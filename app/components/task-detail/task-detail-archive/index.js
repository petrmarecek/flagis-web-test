import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import { ICONS } from '../../icons/icon-constants'
import { Button } from './styles'

const TaskDetailArchive = ({
  isArchived,
  isCompleted,
  isUpdatable,
  onClick,
}) => {
  const actualIcon = useMemo(
    () => (isArchived ? ICONS.NON_ARCHIVE : ICONS.ARCHIVE),
    [isArchived]
  )

  if (!isUpdatable) {
    return null
  }

  return (
    <Button
      icon={actualIcon}
      onClick={onClick}
      animation={
        !isCompleted
          ? null
          : {
              action: 'transition.expandIn',
              duration: 1000,
            }
      }
    />
  )
}

TaskDetailArchive.defaultProps = {
  isUpdatable: true,
}

TaskDetailArchive.propTypes = {
  isArchived: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isUpdatable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TaskDetailArchive
