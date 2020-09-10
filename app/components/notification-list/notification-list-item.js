import React from 'react'
import PropTypes from 'prop-types'
import dateUtils from 'redux/utils/date'
import { compose, withHandlers } from 'recompose'
import { notificationText } from 'components/notification-list/notifications-common'

// redux
import { connect } from 'react-redux'
import { getTaskById } from 'redux/store/tasks/tasks.selectors'
import { getContactById } from 'redux/store/contacts/contacts.selectors'

// components
import Avatar from 'react-avatar'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  ItemWrapper,
  Indicator,
  ItemContentWrapper,
  MainTitle,
  SecondTitle,
  Date,
  Icons,
} from './styles'
import { colors } from '../styled-components-mixins/colors'

const NotificationListItem = ({
  notification,
  task,
  profile,
  onHandleReadNotification,
  onHandleReadTaskNotification,
}) => {
  // init data
  const { type, readAt, sentAt, fromUserEmail, data } = notification
  const { subject } = task
  const { nickname, email } = profile

  // conditions
  const isRead = readAt !== null
  const isSend = type === 'TASKS/FOLLOWERS/SEND'
  const isTakeBack = type === 'TASKS/FOLLOWERS/TAKE-BACK'
  const isRemovedTask = isTakeBack || subject === null
  const isAssigneeOfTask = isTakeBack || isSend
  const isSystemNotification =
    type === 'TASKS/DATES/START' ||
    type === 'TASKS/DATES/REMINDER' ||
    type === 'TASKS/DATES/DUE-DATE'

  // prepare data
  const date = dateUtils.formatDateTimeSecondary(sentAt)
  const commentContent = data && data.content ? data.content : null
  const attachmentName = data && data.fileName ? data.fileName : null
  const taskSubject = subject !== null ? subject : data.subject
  const profileName =
    email !== null
      ? nickname !== null
        ? nickname
        : fromUserEmail !== null
        ? fromUserEmail
        : email
      : ''

  return (
    <ItemWrapper
      onClick={
        isRemovedTask ? onHandleReadNotification : onHandleReadTaskNotification
      }
      isRead={isRead}
    >
      <Date>
        {date} from {isSystemNotification ? 'Flagis' : profileName}
      </Date>
      {!isRead && <Indicator onClick={onHandleReadNotification} />}
      <ItemContentWrapper>
        <MainTitle isRead={isRead}>
          [{notificationText(type)}]<span>{taskSubject}</span>
        </MainTitle>
        <SecondTitle isRead={isRead}>
          {commentContent && <span>{commentContent}</span>}
          {attachmentName && <span>{attachmentName}</span>}
        </SecondTitle>
      </ItemContentWrapper>
      {!isSystemNotification && (
        <Icons>
          {isAssigneeOfTask && (
            <Icon
              icon={ICONS.INCOMING}
              width={16}
              height={12}
              color={[
                colors.astrocopusGrey,
                colors.astrocopusGrey,
                colors.astrocopusGrey,
              ]}
            />
          )}
          <Avatar
            src={profile.photo}
            name={profileName}
            size="30"
            textSizeRatio={2}
            round
          />
        </Icons>
      )}
    </ItemWrapper>
  )
}

NotificationListItem.propTypes = {
  notification: PropTypes.object,
  task: PropTypes.object,
  profile: PropTypes.object,
  onClick: PropTypes.func,
  onHandleReadNotification: PropTypes.func,
  onHandleReadTaskNotification: PropTypes.func,
}

const mapStateToProps = (state, props) => {
  const { taskId, fromUserId } = props.notification
  let task = getTaskById(state, taskId)
  task = task ? task : { subject: null, createdById: null }
  let profile = !task ? null : getContactById(state, fromUserId)
  profile = profile ? profile : { nickname: null, email: null }

  return {
    task,
    profile,
  }
}

export default compose(
  connect(mapStateToProps),
  withHandlers({
    onHandleReadNotification: props => event => {
      event.stopPropagation()
      props.onClick(props.notification)
    },
    onHandleReadTaskNotification: props => () =>
      props.onClick(props.notification, props.task),
  })
)(NotificationListItem)
