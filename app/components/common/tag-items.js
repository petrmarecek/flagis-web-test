import React from 'react'
import PropTypes from 'prop-types'
import { getColorIndex, getTagColor } from 'redux/utils/component-helper'

import styled from 'styled-components'
import { borderRadius, fontMain } from '../styled-components-mixins'

const Item = styled.li`
  ${fontMain}
  ${borderRadius('12px')}
  margin: 0 6px 6px 0;
  font-size: 14px;
  color: #fff;
  border: none;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  float: left;
  height: 23px;
  line-height: 23px;
  background-color: ${props => props.bgColor}
`;

const TagItems = ({ tags }) => tags.map(tag => {
  const { id, colorIndex, title } = tag
  const tagColorIndex = getColorIndex(colorIndex, title)
  const tagColor = getTagColor(tagColorIndex)

  return (
    <Item key={id} bgColor={tagColor}>
      {title}
    </Item>
  )
})

TagItems.propTypes = {
  tags: PropTypes.object,
}

export default TagItems
