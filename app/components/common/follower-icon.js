import React from 'react'
import PropTypes from 'prop-types'
import constants from '../../utils/constants'

import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

const FollowerIcon = ({ status, scale, defaultIcon }) => {
  const followerStatus = (defaultIcon || status === null) ? 'new' : status
  const width = followerStatus === 'new'
    ? Number(constants.NEW_FOLLOWER_ICON_WIDTH * scale)
    : Number(constants.FOLLOWER_ICON_WIDTH * scale)

  const height = followerStatus === 'new'
    ? Number(constants.NEW_FOLLOWER_ICON__HEIGHT * scale)
    : Number(constants.FOLLOWER_ICON_HEIGHT * scale)

  const color = {
    new: '#8C9DA9',
    pending: '#293034',
    accepted: '#44FFB1',
    rejected: '#FF6A6A',
  }

  return (
    <Icon
      icon={ICONS[`FOLLOWER_${followerStatus.toUpperCase()}`]}
      width={width}
      height={height}
      scale={scale}
      color={[color[followerStatus]]} />
  )
}

FollowerIcon.defaultProps = {
  scale: 1,
}

FollowerIcon.propTypes = {
  status: PropTypes.string,
  defaultIcon: PropTypes.bool,
  scale: PropTypes.number,
}

export default FollowerIcon
