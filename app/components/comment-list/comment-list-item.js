import React from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'
import Linkify from 'react-linkify'
import { infoMessages } from 'utils/messages'

// compoennts
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  CommentItemContainer,
  CommentItemIcon,
  CommentItemAuthor,
  CommentItemDate,
  CommentItemContent,
} from './styles'

/* eslint-disable no-undefined */

const CommentListItem = ({ comment, userId }) => {
  const { createdById, createdAt, author, content, type, data } = comment
  const dateText = dateUtil.formatDateTime(createdAt)
  const isAssigneeComment = type === undefined && createdById !== userId
  const icon = type
    ? { type: ICONS.INFO, width: 14, height: 15, scale: 1 }
    : createdById === userId
    ? { type: ICONS.COMMENT, width: 15, height: 14, scale: 0.57 }
    : { type: ICONS.COMMENT_FILL, width: 17, height: 15, scale: 1.15 }

  return (
    <CommentItemContainer>
      <CommentItemIcon
        icon={icon.type}
        width={icon.width}
        height={icon.height}
        scale={icon.scale}
        color={['#B1B5B8']}
      />
      <CommentItemAuthor>{author}</CommentItemAuthor>
      <CommentItemDate>{dateText}</CommentItemDate>
      <CommentItemContent isAssigneeComment={isAssigneeComment}>
        {type ? (
          <div style={{ fontWeight: 'bold' }}>
            {infoMessages.activities(type, data)}
          </div>
        ) : (
          <Linkify properties={{ target: '_blank' }}>{content}</Linkify>
        )}
      </CommentItemContent>
    </CommentItemContainer>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
}

export default CommentListItem
