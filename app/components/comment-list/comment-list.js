import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentListItem from 'components/comment-list/comment-list-item'
import { Scrollbars } from 'react-custom-scrollbars'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.object,
  }

  componentDidMount() {
    // Scroll auto bottom
    this.refs.scrollbars.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    const prevNumberComments = prevProps.comments.items.size
    const numberComments = this.props.comments.items.size

    // Add new comment
    if (numberComments === (prevNumberComments + 1)) {
      // Scroll auto bottom
      this.refs.scrollbars.scrollToBottom()
    }
  }

  render() {
    const scrollStyle = {
      height: `calc(100vh - 232px)`,
      overflow: 'hidden'
    }

    return (
      <Scrollbars
        ref="scrollbars"
        style={scrollStyle}>
        <div className="comment-list-container">
          <ul className="comment-list">
            {!this.props.comments.isFetching && this.props.comments.items.map(comment => (
              <CommentListItem
                key={comment.id}
                comment={comment}/>
            ))}
          </ul>
        </div>
      </Scrollbars>
    )
  }
}

export default CommentList
