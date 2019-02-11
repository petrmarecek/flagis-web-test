import React from 'react'
import PropTypes from 'prop-types'

// components
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
  justify-content: center;
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
  right: ${props => (props.assigneeInbox ? '25px' : 0)};
  top: ${props => (props.assigneeInbox ? '6px' : 0)};
  ${borderRadius('7px')}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

const IconAccount = styled(Icon)`
  position: absolute;
  left: 0;
  bottom: 0;
`

const FollowerIcon = ({ status, animation, assigneeInbox, isCompleted }) => {
  let followerStatus = status === null ? 'new' : status
  followerStatus = assigneeInbox ? 'assigneeInbox' : followerStatus

  const color = {
    new: ['#8C9DA9'],
    assigneeInbox: ['#fff', '#293034', '#fff'],
    pending: ['#fff', '#8C9DA9', '#fff'],
    accepted: ['#fff', '#44FFB1', '#fff'],
    rejected: ['#fff', '#FF6A6A', '#fff'],
  }

  const icons = {
    new: 'FOLLOWER_NEW',
    assigneeInbox: 'FOLLOWER_INBOX',
    pending: 'FOLLOWER_PENDING',
    accepted: 'FOLLOWER_ACCEPTED',
    rejected: 'FOLLOWER_REJECTED',
  }

  return (
    <Wrapper isCompleted={isCompleted} animation={animation}>
      <IconAccount
        icon={ICONS.CONTACT_EXIST}
        width={30}
        height={30}
        scale={1.42}
        color={['#8C9DA9', '#fff']}
      />
      {followerStatus !== 'new' && (
        <IconStatus assigneeInbox={followerStatus === 'assigneeInbox'}>
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
  animation: PropTypes.bool,
  assigneeInbox: PropTypes.bool,
  isCompleted: PropTypes.bool,
}

export default FollowerIcon
