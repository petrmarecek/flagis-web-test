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
  onHandleClickRead,
  onHandleClickTitle,
  onHandleClickNotification,
}) => {
  // init data
  const { type, readAt, createdAt } = notification
  const { subject } = task
  const { nickname, email } = profile

  // conditions
  const isRemovedTask = type === 'TASKS/TAKE-BACK'
  const isAssigneeOfTask =
    type === 'TASKS/TAKE-BACK' ||
    type === 'TASKS/DELIVERED'
  const isSystemNotification =
    type === 'TASKS/START-DATE' ||
    type === 'TASKS/REMINDER-DATE' ||
    type === 'TASKS/DUE-DATE'

  // prepare data
  const date = dateUtils.formatDateTimeSecondary(createdAt)
  const isRead = readAt !== null
  const profileName =
    email !== null ? (nickname !== null ? nickname : email) : ''
  const taskSubject = subject !== null ? subject : ''


  return (
    <ItemWrapper onClick={onHandleClickNotification} isRead={isRead}>
      <Date>{date}</Date>
      {!isRead && <Indicator onClick={onHandleClickRead} />}
      <UserNotificationEntityWrapper>
        <User>From: {isSystemNotification ? 'Flagis' : profileName}</User>
        <TitleNotification onClick={isRemovedTask ? null : onHandleClickTitle} isRead={isRead}>
          {infoMessages.notifications(type)}
        </TitleNotification>
        <TitleEntity onClick={isRemovedTask ? null : onHandleClickTitle} isRead={isRead}>
          <span>Task:</span> {taskSubject}
        </TitleEntity>
      </UserNotificationEntityWrapper>
      {!isSystemNotification &&
        <Icons>
          <Avatar
            src={profile.photo}
            name={profileName}
            size="20"
            textSizeRatio={2}
            round
          />
          {isAssigneeOfTask &&
            <Icon
              icon={ICONS.INBOX}
              width={22}
              height={15}
              scale={0.68}
              color={['#b1b5b8']}
            />
          }
        </Icons>
      }
    </ItemWrapper>
  )
}

NotificationListItem.propTypes = {
  notification: PropTypes.object,
  task: PropTypes.object,
  profile: PropTypes.object,
  onClick: PropTypes.func,
  onHandleClickRead: PropTypes.func,
  onHandleClickNotification: PropTypes.func,
  onHandleClickTitle: PropTypes.func,
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
    onHandleClickRead: props => event => {
      event.stopPropagation()
      props.onClick(props.notification)
    },
    onHandleClickNotification: props => () => props.onClick(props.notification),
    onHandleClickTitle: props => () =>
      props.onClick(props.notification, props.task),
  })
)(NotificationListItem)
