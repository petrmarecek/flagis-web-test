import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { getColorIndex, getTagColor } from 'redux/utils/component-helper'

import { Item, Text } from './styles'

const TaskListTagItem = props => {
  const {
    tag,
    isCollapse,
    isCompleted,
    isMouseEnter,
    onHandleClicked,
    onHandleMouseEnter,
    onHandleMouseLeave,
  } = props

  const { id, colorIndex, title } = tag
  const tagColorIndex = getColorIndex(colorIndex, title)
  const tagColor = getTagColor(tagColorIndex)
  const collapse = isCollapse && isMouseEnter ? !isCollapse : isCollapse

  return (
    <Item
      key={id}
      onMouseDown={onHandleClicked}
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
      bgColor={tagColor}
      isCompleted={isCompleted}
      isItemCollapse={collapse}
    >
      <Text bgColor={tagColor} isItemCollapse={collapse}>
        {title}
      </Text>
    </Item>
  )
}

TaskListTagItem.propTypes = {
  tag: PropTypes.object,
  isCollapse: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isMouseEnter: PropTypes.bool,
  onHandleMouseEnter: PropTypes.func,
  onHandleMouseLeave: PropTypes.func,
  onHandleClicked: PropTypes.func,
  onHandleTagClicked: PropTypes.func,
}

export default compose(
  withStateHandlers(() => ({ isMouseEnter: false }), {
    onHandleMouseEnter: () => () => ({ isMouseEnter: true }),
    onHandleMouseLeave: () => () => ({ isMouseEnter: false }),
  }),
  withHandlers({
    onHandleClicked: props => event => {
      event.stopPropagation()

      // allowed left mouse button
      if (event.button !== 0) {
        return
      }

      props.onHandleTagClicked(props.tag)
    },
  })
)(TaskListTagItem)
