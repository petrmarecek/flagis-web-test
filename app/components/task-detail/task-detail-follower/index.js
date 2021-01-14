import PropTypes from 'prop-types'
import React from 'react'

import From from './task-detail-follower-from'
import To from './task-detail-follower-to'

const TaskDetailFollower = props => {
  const {
    followers, isAcceptAllowed, isAddAllowed, isDeleteAllowed, isOwner, isRejectAllowed,
    isSendAllowed, isTakeBackAllowed, onAccept, onDelete, onReject, onSend, owner, taskId,
  } = props

  if (!isOwner) {
    return (
      <From
        followers={followers}
        isAcceptAllowed={isAcceptAllowed}
        isRejectAllowed={isRejectAllowed}
        onAccept={onAccept}
        onReject={onReject}
        owner={owner}
      />
    )
  }

  return (
    <To
      followers={followers}
      isAddAllowed={isAddAllowed}
      isDeleteAllowed={isDeleteAllowed}
      isSendAllowed={isSendAllowed}
      isTakeBackAllowed={isTakeBackAllowed}
      onDelete={onDelete}
      onSend={onSend}
      taskId={taskId}
    />
  )
}

TaskDetailFollower.propTypes = {
  followers: PropTypes.array.isRequired,
  isAcceptAllowed: PropTypes.bool.isRequired,
  isAddAllowed: PropTypes.bool.isRequired,
  isDeleteAllowed: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isRejectAllowed: PropTypes.bool.isRequired,
  isSendAllowed: PropTypes.bool.isRequired,
  isTakeBackAllowed: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
  taskId: PropTypes.string.isRequired,
}

export default TaskDetailFollower
