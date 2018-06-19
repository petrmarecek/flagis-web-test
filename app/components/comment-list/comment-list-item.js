import React from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

const CommentListItem = props => {
  const dateText = props.comment.id === null
    ? 'Not synced'
    : dateUtil.formatDate(props.comment.createdAt)

  return (
    <li className="comment">
      <Icon
        className="comment__icon-comment"
        icon={ICONS.COMMENT}
        width={15}
        height={14}
        scale={0.57}
        color={["#8C9DA9"]}/>
      <div className="comment__author">{props.comment.author}</div>
      <div className="comment__date">{dateText}</div>
      <div className="comment__content">{props.comment.content}</div>
    </li>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
}

export default CommentListItem
