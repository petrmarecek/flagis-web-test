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
import { ItemWrapper, Indicator, User, Date, Title, Icons } from './styles'

const NotificationListItem = ({ notification, task, profile }) => {
  const { type, readAt, createdAt } = notification
  const { subject } = task
  const { nickname, email } = profile
  const date = dateUtils.formatDateTimeSecondary(createdAt)
  const isRead = readAt !== null
  const profileName =
    email !== null ? (nickname !== null ? nickname : email) : ''
  const taskSubject = subject !== null ? `${subject.substring(0, 10)}...` : ''

  return (
    <ItemWrapper>
      {!isRead && <Indicator />}
      <User>From: {profileName}</User>
      <Date>{date}</Date>
      <Title isRead={isRead}>
        {infoMessages.notifications(type, { taskSubject, profileName })}
      </Title>
      <Icons>
        <Avatar name="petr" size="30" textSizeRatio={2} round />
        <Icon
          icon={ICONS.TRASH}
          width={23}
          height={26}
          scale={1}
          color={['#b1b5b8']}
          hoverColor={['#FF6A6A']}
        />
      </Icons>
    </ItemWrapper>
  )
}

NotificationListItem.propTypes = {
  notification: PropTypes.object,
  task: PropTypes.object,
  profile: PropTypes.object,
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
  withHandlers({})
)(NotificationListItem)
