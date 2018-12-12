import React from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'
import { ICONS } from 'components/icons/icon-constants'
import Linkify from 'react-linkify'

import {
  CommentItemContainer,
  CommentItemIcon,
  CommentItemAuthor,
  CommentItemDate,
  CommentItemContent,
} from './styles'

const CommentListItem = ({ comment, userId }) => {
  const { createdById, createdAt, author, content } = comment
  const dateText = dateUtil.formatDateTime(createdAt)
  const icon = createdById === userId
    ? { type: ICONS.COMMENT, width: 15, height: 14, scale: 0.57 }
    : { type: ICONS.COMMENT_FILL, width: 17, height: 15, scale: 1.15}

  return (
    <CommentItemContainer>
      <CommentItemIcon
        icon={icon.type}
        width={icon.width}
        height={icon.height}
        scale={icon.scale}
        color={["#8C9DA9"]}/>
      <CommentItemAuthor>{author}</CommentItemAuthor>
      <CommentItemDate>{dateText}</CommentItemDate>
      <CommentItemContent>
        <Linkify properties={{target: '_blank'}}>
          {content}
        </Linkify>
      </CommentItemContent>
    </CommentItemContainer>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
}

export default CommentListItem
