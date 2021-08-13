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
  width: 35px;
  height: 30px;
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  ${transition(props => (props.animation ? 'opacity 400ms ease-out' : 'none'))}
`

const IconStatus = styled.div`
  position: absolute;
  right: 0;
  top: -4px;
  background-color: ${props => (props.isAssignee ? 'white' : 'transparent')};
  ${props => (props.isAssignee ? borderRadius('3px') : borderRadius('7px'))}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

const IconAccount = styled.div`
  img {
    object-fit: cover;
  }
`

const FollowerIcon = ({
  status,
  photo,
  nickname,
  animation,
  assigneeInbox,
  isCompleted,
}) => {
  let followerStatus = status === null ? 'new' : status
  followerStatus = assigneeInbox ? 'assigneeInbox' : followerStatus
  const isAssignee = followerStatus === 'assigneeInbox'
  const isFollower = followerStatus !== 'new'

  const color = {
    new: ['#8C9DA9'],
    assigneeInbox: ['#b1b5b8', '#b1b5b8', '#b1b5b8'],
    pending: ['#fff', '#8C9DA9', '#fff'],
    accepted: ['#fff', '#00CD78', '#fff'],
    rejected: ['#fff', '#FF6A6A', '#fff'],
  }

  const icons = {
    new: 'FOLLOWER_NEW',
    assigneeInbox: 'INCOMING',
    pending: 'FOLLOWER_PENDING',
    accepted: 'FOLLOWER_ACCEPTED',
    rejected: 'FOLLOWER_REJECTED',
  }

  return (
    <Wrapper isCompleted={isCompleted} animation={animation}>
      <IconAccount>
        <Avatar src={photo} name={nickname} size="30" textSizeRatio={2} round />
      </IconAccount>
      {isFollower && (
        <IconStatus isAssignee={isAssignee}>
          <Icon
            icon={ICONS[icons[followerStatus]]}
            width={16}
            height={isAssignee ? 12 : 16}
            color={color[followerStatus]}
          />
        </IconStatus>
      )}
    </Wrapper>
  )
}

FollowerIcon.propTypes = {
  status: PropTypes.string,
  photo: PropTypes.string,
  nickname: PropTypes.string,
  animation: PropTypes.bool,
  assigneeInbox: PropTypes.bool,
  isCompleted: PropTypes.bool,
}

export default FollowerIcon
