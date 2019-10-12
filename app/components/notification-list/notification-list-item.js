import React from 'react'
import PropTypes from 'prop-types'
import dateUtils from 'redux/utils/date'
import { compose, withHandlers } from 'recompose'
import { infoMessages } from 'utils/messages'

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
  UserNotificationEntityWrapper,
  User,
  TitleNotification,
  TitleEntity,
  Date,
  Icons,
} from './styles'

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
  const isRead = readAt !== null
  const profileName =
    email !== null
      ? nickname !== null
        ? nickname
        : fromUserEmail !== null
        ? fromUserEmail
        : email
      : ''
  const taskSubject = isAssigneeOfTask
    ? data.subject
    : subject !== null
    ? subject
    : ''

  return (
    <ItemWrapper
      onClick={isRemovedTask ? null : onHandleReadTaskNotification}
      isRead={isRead}
    >
      <Date>{date}</Date>
      {!isRead && <Indicator onClick={onHandleReadNotification} />}
      <UserNotificationEntityWrapper>
        <User>From: {isSystemNotification ? 'Flagis' : profileName}</User>
        <TitleNotification isRead={isRead}>
          {infoMessages.notifications(type)}
        </TitleNotification>
        <TitleEntity isRead={isRead}>
          <span>Task:</span> {taskSubject}
        </TitleEntity>
      </UserNotificationEntityWrapper>
      {!isSystemNotification && (
        <Icons>
          <Avatar
            src={profile.photo}
            name={profileName}
            size="20"
            textSizeRatio={2}
            round
          />
          {isAssigneeOfTask && (
            <Icon
              icon={ICONS.INBOX}
              width={22}
              height={15}
              scale={0.68}
              color={['#b1b5b8']}
            />
          )}
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
