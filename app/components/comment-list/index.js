import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as userAgent from 'utils/userAgent'

// redux
import { connect } from 'react-redux'
import { getUserId } from 'redux/store/auth/auth.selectors'

// components
import CommentListItem from 'components/comment-list/comment-list-item'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

// styles
import { ListWrapper } from './styles'

const CommentList = ({ comments, userId }) => {
  const deviceOffset = userAgent.isTablet ? 75 : 0
  const scrollStyle = {
    height: `calc(100vh - ${deviceOffset + 172}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px #fff',
    boxShadowBottom: 'inset 0 -10px 10px -5px #fff',
    overflow: 'hidden',
    pointerEvents: 'initial',
  }

  return (
    <ShadowScrollbar
      style={scrollStyle}
      isScrollBottom
      isScrollBottomAfterUpdate
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
    </ShadowScrollbar>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object,
  userId: PropTypes.string,
}

const mapStateToProps = state => ({
  userId: getUserId(state),
})

export default memo(connect(mapStateToProps)(CommentList))
