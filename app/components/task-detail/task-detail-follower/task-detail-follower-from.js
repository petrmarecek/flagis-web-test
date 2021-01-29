import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import {
  Body, BodyButton, BodyStatus,
  Header,
  HeaderLeft,
  HeaderTitle,
  HeaderTitleName,
  Wrapper,
} from './styles'
import FollowerIcon from 'components/common/follower-icon'

const TaskDetailFollowerFrom = props => {
  const { followers, isAcceptAllowed, isRejectAllowed, onAccept, onReject, owner } = props

  // Get actual follower - now only one follower on one task
  const actualFollower = useMemo(() => followers[0] || null, [followers])

  // Prepare handler for accepting task
  const handleAccept = useCallback(
    () => onAccept(actualFollower.id),
    [actualFollower.id, onAccept],
  )

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <FollowerIcon
            status='assigneeInbox'
            photo={owner.photo}
            nickname={owner.nickname}
          />
        </HeaderLeft>
        <HeaderTitle title={owner.email} withContact>
          {'From: '}
          <HeaderTitleName>
            {owner.nickname || owner.email}
          </HeaderTitleName>
        </HeaderTitle>
      </Header>
      {isAcceptAllowed && isRejectAllowed && (
        <Body flexEnd>
          <BodyButton onClick={handleAccept} green>
            Accept
          </BodyButton>
          <BodyButton onClick={onReject} red>
            Reject
          </BodyButton>
        </Body>
      )}
      {!isAcceptAllowed && isRejectAllowed && (
        <Body>
          <BodyStatus />
          <BodyButton onClick={onReject} red>
            Reject
          </BodyButton>
        </Body>
      )}
    </Wrapper>
  )
}

TaskDetailFollowerFrom.propTypes = {
  followers: PropTypes.array.isRequired,
  isAcceptAllowed: PropTypes.bool.isRequired,
  isRejectAllowed: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
}

export default TaskDetailFollowerFrom
