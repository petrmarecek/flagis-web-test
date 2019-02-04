import React from 'react'
import PropTypes from 'prop-types'
import constants from '../../utils/constants'

// components
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

// styles
import styled from 'styled-components'

const Wrapper = styled.div`
  pointer-events: none;
`

const FollowerIconSecondary = ({ status, iconScale, defaultIcon }) => {
  let scale = iconScale
  let followerStatus = status === null ? 'new' : status
  let width =
    followerStatus === 'new'
      ? Number(constants.NEW_FOLLOWER_ICON_WIDTH * scale)
      : Number(constants.FOLLOWER_ICON_WIDTH * scale)
  let height =
    followerStatus === 'new'
      ? Number(constants.NEW_FOLLOWER_ICON__HEIGHT * scale)
      : Number(constants.FOLLOWER_ICON_HEIGHT * scale)

  if (defaultIcon) {
    scale = 0.7
    followerStatus = 'assignee_accepted'
    width = Number(constants.ASSIGNEE_ACCEPTED_WIDTH * scale)
    height = Number(constants.ASSIGNEE_ACCEPTED_HEIGHT * scale)
  }

  const color = {
    assignee_accepted: ['#E1E4E5'],
    new: ['#8C9DA9'],
    pending: ['#293034'],
    accepted: ['#44FFB1'],
    rejected: ['#FF6A6A'],
  }

  const icons = {
    assignee_accepted: 'INBOX',
    new: 'FOLLOWER_NEW',
    pending: 'FOLLOWER_PENDING',
    accepted: 'FOLLOWER_ACCEPTED',
    rejected: 'FOLLOWER_REJECTED',
  }

  return (
    <Wrapper>
      <Icon
        icon={ICONS[icons[followerStatus]]}
        width={width}
        height={height}
        scale={scale}
        color={color[followerStatus]}
      />
    </Wrapper>
  )
}

FollowerIconSecondary.defaultProps = {
  iconScale: 1,
}

FollowerIconSecondary.propTypes = {
  status: PropTypes.string,
  defaultIcon: PropTypes.bool,
  iconScale: PropTypes.number,
}

export default FollowerIconSecondary
