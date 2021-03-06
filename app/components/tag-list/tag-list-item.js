import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import { getColorIndex, getTagColor } from '../../redux/utils/component-helper'

import { ICONS } from '../icons/icon-constants'
import Icon from '../icons/icon'

import { Item, ItemIcon, ItemTitle, ItemTagRelations } from './styles'

const TagItem = ({ tag, selected, tagRelations, onHandleClick }) => {
  const colorIndex = getColorIndex(tag.colorIndex, tag.title)
  const tagColor = getTagColor(colorIndex)

  return (
    <Item key={tag.id} onClick={onHandleClick} selected={selected}>
      <ItemIcon>
        <Icon
          icon={ICONS.TAG}
          width={37}
          height={20}
          scale={1.81}
          color={[tagColor]}
        />
      </ItemIcon>
      <ItemTitle>{tag.title}</ItemTitle>
      {tagRelations > 0 && (
        <ItemTagRelations count={tagRelations} title="Number of tasks" />
      )}
    </Item>
  )
}

TagItem.propTypes = {
  tag: PropTypes.object,
  selected: PropTypes.bool,
  tagRelations: PropTypes.any,
  onClick: PropTypes.func,
  onHandleClick: PropTypes.func,
}

export default withHandlers({
  onHandleClick: props => () => props.onClick(props.tag.id),
})(TagItem)
