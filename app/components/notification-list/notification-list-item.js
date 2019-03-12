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
  User,
  Date,
  Content,
  Title,
  Icons,
} from './styles'

const NotificationListItem = ({
  notification,
  task,
  profile,
  onHandleClickRead,
  onHandleClickNotification,
}) => {
  const { type, readAt, createdAt } = notification
  const { subject } = task
  const { nickname, email } = profile

  const date = dateUtils.formatDateTimeSecondary(createdAt)
  const isRead = readAt !== null
  const profileName =
    email !== null ? (nickname !== null ? nickname : email) : ''
  const taskSubject = subject !== null ? subject : ''

  return (
    <ItemWrapper onClick={onHandleClickNotification}>
      {!isRead && <Indicator onClick={onHandleClickRead} />}
      <User>From: {profileName}</User>
      <Date>{date}</Date>
      <Content>
        <Title isRead={isRead}>{taskSubject}</Title>
        <Title isRead={isRead}>{infoMessages.notifications(type)}</Title>
      </Content>
      <Icons>
        <Avatar
          src={profile.photo}
          name={profileName}
          size="20"
          textSizeRatio={2}
          round
        />
        <Icon
          icon={ICONS.INBOX}
          width={22}
          height={15}
          scale={0.68}
          color={['#b1b5b8']}
        />
      </Icons>
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
}

const mapStateToProps = (state, props) => {
  const { taskId } = props.notification
  let task = getTaskById(state, taskId)
  task = task ? task : { subject: null, createdById: null }
  let profile = !task ? null : getContactById(state, task.createdById)
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
      props.onClick(props.notification, false)
    },
    onHandleClickNotification: props => () =>
      props.onClick(props.notification, true),
  })
)(NotificationListItem)
