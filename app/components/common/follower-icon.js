import React from 'react'
import PropTypes from 'prop-types'
import constants from '../../utils/constants'

import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

import styled from 'styled-components'

const Container = styled.div`
  pointer-events: none;
`;

const FollowerIcon = ({ status, iconScale, defaultIcon }) => {
  let scale = iconScale
  let followerStatus = status === null ? 'new' : status
  let width = followerStatus === 'new'
    ? Number(constants.NEW_FOLLOWER_ICON_WIDTH * scale)
    : Number(constants.FOLLOWER_ICON_WIDTH * scale)
  let height = followerStatus === 'new'
    ? Number(constants.NEW_FOLLOWER_ICON__HEIGHT * scale)
    : Number(constants.FOLLOWER_ICON_HEIGHT * scale)

  if (defaultIcon) {
    scale = 1.33
    followerStatus = 'contact_exist'
    width = Number(constants.CONTACT_EXIST * scale)
    height = Number(constants.CONTACT_EXIST * scale)
  }

  const color = {
    contact_exist: ['#8C9DA9', '#fff'],
    new: ['#8C9DA9'],
    pending: ['#293034'],
    accepted: ['#44FFB1'],
    rejected: ['#FF6A6A'],
  }

  const icons = {
    contact_exist: 'CONTACT_EXIST',
    new: 'FOLLOWER_NEW',
    pending: 'FOLLOWER_PENDING',
    accepted: 'FOLLOWER_ACCEPTED',
    rejected: 'FOLLOWER_REJECTED',
  }

  return (
    <Container>
      <Icon
        icon={ICONS[icons[followerStatus]]}
        width={width}
        height={height}
        scale={scale}
        color={color[followerStatus]} />
    </Container>
  )
}

FollowerIcon.defaultProps = {
  iconScale: 1,
}

FollowerIcon.propTypes = {
  status: PropTypes.string,
  defaultIcon: PropTypes.bool,
  iconScale: PropTypes.number,
}

export default FollowerIcon
