import React from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'
import { ICONS } from 'components/icons/icon-constants'

import {
  CommentItemContainer,
  CommentItemIcon,
  CommentItemAuthor,
  CommentItemDate,
  CommentItemContent,
} from './styles'

const CommentListItem = ({ comment }) => {
  const dateText = comment.id === null
    ? 'Not synced'
    : dateUtil.formatDate(comment.createdAt)

  return (
    <CommentItemContainer>
      <CommentItemIcon
        icon={ICONS.COMMENT}
        width={15}
        height={14}
        scale={0.57}
        color={["#8C9DA9"]}/>
      <CommentItemAuthor>{comment.author}</CommentItemAuthor>
      <CommentItemDate>{dateText}</CommentItemDate>
      <CommentItemContent>{comment.content}</CommentItemContent>
    </CommentItemContainer>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
}

export default CommentListItem
