import React from 'react'
import PropTypes from 'prop-types'
import CommentListItem from 'components/comment-list/comment-list-item'

const CommentList = props => {
  return (
    <div className="comment-list-container">
      <ul className="comment-list">
        {!props.comments.isFetching && props.comments.items.map(comment => (
          <CommentListItem
            key={comment.id}
            comment={comment} />
        ))}
      </ul>
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object,
}

export default CommentList
