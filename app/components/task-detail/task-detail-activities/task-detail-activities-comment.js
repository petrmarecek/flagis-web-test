import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'

import { getUserId } from '../../../redux/store/auth/auth.selectors'
import * as commentActions from '../../../redux/store/comments/comments.actions'
import { getContactById } from '../../../redux/store/contacts/contacts.selectors'

import {
  Comment,
  CommentAuthor,
  CommentAvatar,
  CommentAvatarIcon,
  CommentContent,
  CommentDate,
  CommentDelete,
  CommentDeleteBox,
  CommentHeader,
  CommentText,
} from './styles'
import dateUtil from 'redux/utils/date'

const TaskDetailActivitiesComment = ({ data, photo, onDelete, userId }) => {
  // Format dates
  const formattedDate = useMemo(
    () => dateUtil.formatDateTimeSecondary(data.createdAt),
    [data.createdAt]
  )

  const isDeletable = useMemo(
    () => userId === data.createdById && !data.trashedAt,
    [data, userId]
  )

  // Prepare handler for deleting comment
  const handleDelete = useCallback(() => onDelete(data.taskId, data.id), [
    data,
    onDelete,
  ])

  return (
    <Comment>
      <CommentAvatar>
        <CommentAvatarIcon src={photo} name={data.author} />
      </CommentAvatar>
      <CommentContent>
        <CommentHeader>
          <CommentAuthor>{data.author}</CommentAuthor>
          <CommentDate>{formattedDate}</CommentDate>
        </CommentHeader>
        <CommentText>{data.content}</CommentText>
      </CommentContent>
      {isDeletable && (
        <CommentDeleteBox>
          <CommentDelete onClick={handleDelete} />
        </CommentDeleteBox>
      )}
    </Comment>
  )
}

TaskDetailActivitiesComment.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
  photo: getContactById(state, props.data.createdById).photo,
  userId: getUserId(state),
})

const mapDispatchToProps = {
  onDelete: commentActions.deleteComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetailActivitiesComment)
