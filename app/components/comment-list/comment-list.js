import React from 'react'
import PropTypes from 'prop-types'

import CommentListItem from 'components/comment-list/comment-list-item'
import { Scrollbars } from 'react-custom-scrollbars'

import { CommentListContainer } from './styles'

const CommentList = ({ comments }) => {
  const scrollStyle = {
    height: `calc(100vh - 232px)`,
    overflow: 'hidden'
  }

  return (
    <Scrollbars
      ref={scrollbar => {
        if (scrollbar !== null) {
          scrollbar.scrollToBottom()
        }
      }}
      style={scrollStyle}>
      <CommentListContainer>
        <ul>
          {!comments.isFetching && comments.items.map(comment => (
            <CommentListItem
              key={comment.id}
              comment={comment}/>
          ))}
        </ul>
      </CommentListContainer>
    </Scrollbars>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object,
}

export default CommentList
