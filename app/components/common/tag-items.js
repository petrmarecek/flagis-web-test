import React from 'react'
import PropTypes from 'prop-types'
import { getColorIndex, getTagColor } from 'redux/utils/component-helper'

import styled from 'styled-components'
import { borderRadius, fontMain } from '../styled-components-mixins'

const Item = styled.li`
  ${borderRadius('12px')}
  margin: 0 6px 6px 0;
  border: none;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  float: left;
  height: 23px;
  background-color: ${props => props.bgColor};
`;

const Text = styled.div`
  ${fontMain}
  font-size: 14px;
  line-height: 23px;
  color: #fff;
`;

const TagItems = ({ tags }) => tags.map(tag => {
  const { id, title, colorIndex } = tag
  const tagColorIndex = getColorIndex(colorIndex, title)
  const tagColor = getTagColor(tagColorIndex)

  return(
    <Item
      key={id}
      bgColor={tagColor}>
      <Text bgColor={tagColor}>{title}</Text>
    </Item>
  )
})

TagItems.propTypes = {
  tags: PropTypes.object
}

export default TagItems
