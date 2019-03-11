import React from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'
import Linkify from 'react-linkify'
import { infoMessages } from 'utils/messages'

// redux
import { connect } from 'react-redux'
import { getContactById } from 'redux/store/contacts/contacts.selectors'

// components
import Avatar from 'react-avatar'

// styles
import { ItemWrapper, UserPhoto, Author, Date, Content } from './styles'

/* eslint-disable no-undefined */

const CommentListItem = ({ comment, userId, photo }) => {
  const { createdById, createdAt, author, content, type, data } = comment
  const dateText = dateUtil.formatDateTimeSecondary(createdAt)
  const isAssigneeComment = type === undefined && createdById !== userId

  return (
    <ItemWrapper>
      <UserPhoto>
        <Avatar src={photo} name={author} size="25" textSizeRatio={2} round />
      </UserPhoto>
      <Author>{author}</Author>
      <Date>{dateText}</Date>
      <Content isAssigneeComment={isAssigneeComment}>
        {type ? (
          <div style={{ fontWeight: 'bold' }}>
            {infoMessages.activities(type, data)}
          </div>
        ) : (
          <Linkify properties={{ target: '_blank' }}>{content}</Linkify>
        )}
      </Content>
    </ItemWrapper>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
  userId: PropTypes.string,
  photo: PropTypes.string,
}

const mapStateToProps = (state, props) => ({
  photo: getContactById(state, props.comment.createdById).photo,
})

export default connect(mapStateToProps)(CommentListItem)
