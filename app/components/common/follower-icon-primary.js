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
  opacity: ${props => (props.isCompleted && !props.defaultIcon ? '0.4' : '1')};
  ${transition('opacity 400ms ease-out')}
`

const IconStatus = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  ${borderRadius('7px')}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

const IconAccount = styled(Icon)`
  position: absolute;
  left: 0;
  bottom: 0;
`

const FollowerIconSecondary = ({ status, isCompleted, defaultIcon }) => {
  const followerStatus = status === null ? 'new' : status

  const color = {
    pending: ['#fff', '#293034', '#fff'],
    accepted: ['#fff', '#44FFB1', '#fff'],
    rejected: ['#fff', '#FF6A6A', '#fff'],
  }

  const icons = {
    pending: 'FOLLOWER_PENDING_PRIMARY',
    accepted: 'FOLLOWER_ACCEPTED_PRIMARY',
    rejected: 'FOLLOWER_REJECTED_PRIMARY',
  }

  return defaultIcon ? (
    <Wrapper isCompleted={isCompleted} defaultIcon={defaultIcon}>
      <Icon
        icon={ICONS.INBOX}
        width={22}
        height={15}
        scale={0.7}
        color={['#E1E4E5']}
      />
    </Wrapper>
  ) : (
    <Wrapper isCompleted={isCompleted} defaultIcon={defaultIcon}>
      <IconAccount
        icon={ICONS.CONTACT_EXIST}
        width={30}
        height={30}
        scale={1.42}
        color={['#8C9DA9', '#fff']}
      />
      <IconStatus>
        <Icon
          icon={ICONS[icons[followerStatus]]}
          width={16}
          height={16}
          color={color[followerStatus]}
        />
      </IconStatus>
    </Wrapper>
  )
}

FollowerIconSecondary.propTypes = {
  status: PropTypes.string,
  isCompleted: PropTypes.bool,
  defaultIcon: PropTypes.bool,
}

export default FollowerIconSecondary
