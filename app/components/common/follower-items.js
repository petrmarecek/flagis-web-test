import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { textOverflow } from '../styled-components-mixins'

const Item = styled.li`
  font-size: 14px;
  line-height: 15px;
  color: #293034;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`;

const FollowerItems = ({ followers }) => followers.map(follower => {
  const { id, profile } = follower
  const { nickname, email } = profile
  const title = !nickname ? email : nickname

  return(
    <Item key={id}>
      {title}
    </Item>
  )
})

FollowerItems.propTypes = {
  followers: PropTypes.object,
}

export default FollowerItems
