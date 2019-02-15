import React from 'react'
import PropTypes from 'prop-types'

// components
import Avatar from 'react-avatar'
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

// styles
import styled from 'styled-components'
import {
  boxShadow,
  borderRadius,
  transition,
} from 'components/styled-components-mixins'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  pointer-events: none;
  width: ${props => (props.isAssignee ? '48px' : '35px')};
  height: 30px;
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  ${transition(props => (props.animation ? 'opacity 400ms ease-out' : 'none'))}
`

const IconStatus = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  ${borderRadius('7px')}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

const IconAccount = styled.div`
  margin-right: ${props => (props.isAssignee ? '5px' : '0')};
`

const FollowerIcon = ({
  status,
  nickname,
  animation,
  assigneeInbox,
  isCompleted,
}) => {
  let followerStatus = status === null ? 'new' : status
  followerStatus = assigneeInbox ? 'assigneeInbox' : followerStatus

  const color = {
    new: ['#8C9DA9'],
    assigneeInbox: ['#e1e4e5'],
    pending: ['#fff', '#8C9DA9', '#fff'],
    accepted: ['#fff', '#44FFB1', '#fff'],
    rejected: ['#fff', '#FF6A6A', '#fff'],
  }

  const icons = {
    new: 'FOLLOWER_NEW',
    assigneeInbox: 'INBOX',
    pending: 'FOLLOWER_PENDING',
    accepted: 'FOLLOWER_ACCEPTED',
    rejected: 'FOLLOWER_REJECTED',
  }

  const isAssignee = followerStatus === 'assigneeInbox'
  const isFollower = followerStatus !== 'new'

  return (
    <Wrapper
      isCompleted={isCompleted}
      animation={animation}
      isAssignee={isAssignee}
    >
      <IconAccount isAssignee={isAssignee}>
        <Avatar
          name={nickname}
          size={isAssignee ? '20' : '30'}
          textSizeRatio={2}
          round
        />
      </IconAccount>
      {isAssignee && (
        <Icon
          icon={ICONS[icons[followerStatus]]}
          width={22}
          height={15}
          scale={0.68}
          color={color[followerStatus]}
        />
      )}
      {isFollower && !isAssignee && (
        <IconStatus>
          <Icon
            icon={ICONS[icons[followerStatus]]}
            width={16}
            height={16}
            color={color[followerStatus]}
          />
        </IconStatus>
      )}
    </Wrapper>
  )
}

FollowerIcon.propTypes = {
  status: PropTypes.string,
  nickname: PropTypes.string,
  animation: PropTypes.bool,
  assigneeInbox: PropTypes.bool,
  isCompleted: PropTypes.bool,
}

export default FollowerIcon
