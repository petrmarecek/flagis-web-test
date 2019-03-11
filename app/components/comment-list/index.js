import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { getUserId } from 'redux/store/auth/auth.selectors'

// components
import CommentListItem from 'components/comment-list/comment-list-item'
import { Scrollbars } from 'react-custom-scrollbars'

// styles
import { ListWrapper } from './styles'

const CommentList = ({ comments, userId }) => {
  const scrollStyle = {
    height: `calc(100vh - 172px)`,
    overflow: 'hidden',
  }

  return (
    <Scrollbars
      ref={scrollbar => {
        if (scrollbar !== null) {
          scrollbar.scrollToBottom()
        }
      }}
      style={scrollStyle}
    >
      <ListWrapper>
        <ul>
          {!comments.isFetching &&
            comments.items.map(comment => (
              <CommentListItem
                key={comment.id}
                comment={comment}
                userId={userId}
              />
            ))}
        </ul>
      </ListWrapper>
    </Scrollbars>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object,
  userId: PropTypes.string,
}

const mapStateToProps = state => ({
  userId: getUserId(state),
})

export default connect(mapStateToProps)(CommentList)
