import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

const FollowerIcon = ({ status, styles }) => {
  const iconName = status === 'new' ? 'CONTACTS' : `FOLLOWER_${status.toUpperCase()}`

  return (
    <Icon
      icon={ICONS[iconName]}
      width={styles.width}
      height={styles.height}
      scale={styles.scale}
      color={styles.color} />
  )
}

FollowerIcon.propTypes = {
  status: PropTypes.string,
  styles: PropTypes.object,
}

export default FollowerIcon
