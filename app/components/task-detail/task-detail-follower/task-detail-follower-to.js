import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import { FOLLOWER_STATUS } from '../../../utils/constants'

import FollowerIcon from '../../common/follower-icon'
import {
  Body, BodyButton, BodyStatus, Header, HeaderDelete, HeaderDeleteIcon, HeaderLeft,
  HeaderLock, HeaderTitle, HeaderTitleName, Wrapper,
} from './styles'
import AddFollower from './task-detail-follower-to-add'

const TaskDetailFollowerTo = props => {
  const {
    followers, isAddAllowed, isDeleteAllowed, isSendAllowed, isTakeBackAllowed,
    onDelete, onSend, taskId,
  } = props

  // Get actual follower - now only one follower on one task
  const actualFollower = useMemo(() => followers[0] || null, [followers])

  // Prepare handler for deleting follower
  const handleDelete = useCallback(
    () => onDelete(actualFollower.id, actualFollower.profile.id),
    [actualFollower, onDelete],
  )

  // Does not display when there is no follower and action for adding follower is not allowed
  if (!actualFollower && !isAddAllowed) {
    return null
  }

  if (!actualFollower) {
    return <AddFollower followers={followers} askId={taskId} />
  }

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <FollowerIcon
            status={actualFollower.status}
            photo={actualFollower.profile.photo}
            nickname={actualFollower.profile.nickname}
          />
        </HeaderLeft>
        <HeaderTitle title={actualFollower.profile.email} withContact>
          {'To: '}
          <HeaderTitleName>
            {actualFollower.profile.nickname || actualFollower.profile.email}
          </HeaderTitleName>
        </HeaderTitle>
        <HeaderLock>
          {isDeleteAllowed && (
            <HeaderDelete onClick={handleDelete}>
              <HeaderDeleteIcon />
            </HeaderDelete>
          )}
        </HeaderLock>
      </Header>
      <Body>
        <BodyStatus>
          {actualFollower.status === FOLLOWER_STATUS.PENDING && 'Waiting for response'}
          {actualFollower.status === FOLLOWER_STATUS.ACCEPTED && 'Accepted'}
          {actualFollower.status === FOLLOWER_STATUS.REJECTED && 'Rejected'}
        </BodyStatus>
        {isSendAllowed && (
          <BodyButton green onClick={onSend}>
            Send task
          </BodyButton>
        )}
        {isTakeBackAllowed && (
          <BodyButton onClick={handleDelete}>
            Take back
          </BodyButton>
        )}
      </Body>
    </Wrapper>
  )
}

TaskDetailFollowerTo.propTypes = {
  followers: PropTypes.array.isRequired,
  isAddAllowed: PropTypes.bool.isRequired,
  isDeleteAllowed: PropTypes.bool.isRequired,
  isSendAllowed: PropTypes.bool.isRequired,
  isTakeBackAllowed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
}

export default TaskDetailFollowerTo
