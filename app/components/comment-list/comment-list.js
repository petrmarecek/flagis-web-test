import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentListItem from 'components/comment-list/comment-list-item'

export default class CommentList extends Component {

 static propTypes = {
   comments: PropTypes.object,
  }

  render() {
    return (
      <div className="comment-list-container">
        <ul className="comment-list">
          {!this.props.comments.isFetching && this.props.comments.items.map(comment => (
            <CommentListItem
              key={comment.id}
              comment={comment} />
          ))}
        </ul>
      </div>
    )
  }
}
