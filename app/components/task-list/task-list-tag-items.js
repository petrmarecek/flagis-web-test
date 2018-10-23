import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { getWidthTagItems } from '../../redux/utils/component-helper'

import TaskListTagItem from './task-list-tag-item'
import { TagItems } from './styles'

const TaskListTagItems = ({ tags, parentWidth, onHandleTagClicked }) => {
  const width = getWidthTagItems(tags)
  const maxTagsWidth = Math.floor(parentWidth / 2)
  const isCollapse = width > maxTagsWidth

  return (
    <TagItems>
    {tags.map(tag => (
      <TaskListTagItem
        key={tag.id}
        tag={tag}
        isCollapse={isCollapse}
        onHandleTagClicked={onHandleTagClicked} />))}
    </TagItems>
  )
}

TaskListTagItems.propTypes = {
  tags: PropTypes.any,
  parentWidth: PropTypes.number,
  onTagClick: PropTypes.func,
  onHandleTagClicked: PropTypes.func,
}

export default withHandlers({
  onHandleTagClicked: props => tag => props.onTagClick(tag),
})(TaskListTagItems)