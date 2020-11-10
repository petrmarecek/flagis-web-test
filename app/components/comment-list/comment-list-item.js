import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'
import Linkify from 'react-linkify'
import { activityText } from 'components/comment-list/comment-list-common'

// redux
import { connect } from 'react-redux'
import * as commentActions from 'redux/store/comments/comments.actions'
import { getContactById } from 'redux/store/contacts/contacts.selectors'

// components
import Avatar from 'react-avatar'
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  ItemWrapper,
  UserPhoto,
  Author,
  Date,
  Content,
  Delete,
  DeleteIcon,
  ContentWrapper,
} from './styles'

/* eslint-disable no-undefined */

const CommentListItem = ({ comment, userId, photo, deleteComment }) => {
  const { createdById, createdAt, author, content, type, data } = comment
  const dateText = dateUtil.formatDateTimeSecondary(createdAt)
  const isAssigneeComment = type === undefined && createdById !== userId

  const isDeletable = !type && userId === createdById && !comment.trashedAt

  const handleDelete = useCallback(
    () => deleteComment(comment.taskId, comment.id),
    [deleteComment],
  )

  return (
    <ItemWrapper>
      <UserPhoto>
        <Avatar src={photo} name={author} size="25" textSizeRatio={2} round />
      </UserPhoto>
      <Author>{author}</Author>
      <Date>{dateText}</Date>
      <ContentWrapper>
        <Content isAssigneeComment={isAssigneeComment}>
          {type ? (
            <div style={{ fontWeight: 'bold' }}>{activityText(type, data)}</div>
          ) : (
            <Linkify properties={{ target: '_blank' }}>{content}</Linkify>
          )}
        </Content>
        {isDeletable && (
          <Delete>
            <DeleteIcon
              icon={ICONS.CROSS_SIMPLE}
              width={11}
              height={11}
              scale={0.78}
              color={['#e1e4e5']}
              hoverColor={['#1c2124']}
              onClick={handleDelete}
            />
          </Delete>
        )}
      </ContentWrapper>
    </ItemWrapper>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
  photo: PropTypes.string,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  photo: getContactById(state, props.comment.createdById).photo,
})

const mapDispatchToProps = {
  deleteComment: commentActions.deleteComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem)
