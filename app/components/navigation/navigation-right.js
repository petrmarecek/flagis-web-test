import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import {
  deselectTasks,
  setTimeLine,
  cancelTimeLine,
} from 'redux/store/tasks/tasks.actions'
import {
  hideArchivedTasks,
  visibleInboxTasks,
  hideInboxTasks,
  changeLocation
} from 'redux/store/app-state/app-state.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import { deselectContacts } from 'redux/store/contacts/contacts.actions'
import { getTimeLine, getInboxTasksItems } from 'redux/store/tasks/tasks.selectors'

import { NavButtonContainer, NavButton, InboxCounter } from './styles'

const NavigationRight = props => {

  const {
    location: { pathname },
    timeLine,
    inboxCount,
    onHandleClickTasks,
    onHandleClickTags,
    onHandleClickInbox,
    onHandleClickAccount
  } = props

  const tasksTemplate = '/user/tasks'
  const inboxTemplate = '/user/inbox'
  const tagsTemplate = '/user/tags'
  const numberTasksTemplate = tasksTemplate.length
  const numberInboxTemplate = inboxTemplate.length
  const numberTagsTemplate = tagsTemplate.length

  const isTasksActive = (pathname.substring(0, numberTasksTemplate) === tasksTemplate && !timeLine)
  const isTagsActive = pathname.substring(0, numberTagsTemplate) === tagsTemplate
  const isInboxActive = pathname.substring(0, numberInboxTemplate) === inboxTemplate
  const isAccountActive = pathname === '/user/account'
  const color = '#fff'

  return (
    <NavButtonContainer>
      <NavButton
        active={isTasksActive}
        onClick={onHandleClickTasks}>
        <Icon
          icon={ICONS.TASKS}
          width={25}
          height={20}
          color={[color]} />
      </NavButton>
      <NavButton
        active={isTagsActive}
        onClick={onHandleClickTags}>
        <Icon
          icon={ICONS.TAG_MULTI}
          width={33}
          height={20}
          scale={1.6}
          color={[color]} />
      </NavButton>
      <NavButton
        active={isInboxActive}
        onClick={onHandleClickInbox}>
        {inboxCount > 0 && <InboxCounter count={inboxCount} />}
        <Icon
          icon={ICONS.INBOX}
          width={31}
          height={22}
          scale={1}
          color={[color]} />
      </NavButton>
      <NavButton
        active={isAccountActive}
        onClick={onHandleClickAccount}>
        <Icon
          icon={ICONS.COG_WHEEL}
          width={23}
          height={24}
          scale={1.09}
          color={[color]} />
      </NavButton>
    </NavButtonContainer>
  )
}

NavigationRight.propTypes = {
  location: PropTypes.object,
  timeLine: PropTypes.bool,
  inboxCount: PropTypes.number,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTimeLine: PropTypes.func,
  onHandleClickTags: PropTypes.func,
  onHandleClickInbox: PropTypes.func,
  onHandleClickAccount: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
  timeLine: getTimeLine(state),
  inboxCount: getInboxTasksItems(state).size,
})

const mapDispatchToProps = {
  deselectTasks,
  setTimeLine,
  cancelTimeLine,
  deselectTags,
  deselectContacts,
  hideArchivedTasks,
  visibleInboxTasks,
  hideInboxTasks,
  changeLocation
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickTasks: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.hideInboxTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.changeLocation('/user/tasks')
    },
    onHandleClickTags: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.hideInboxTasks()
      props.deselectTasks()
      props.deselectContacts()
      props.changeLocation('/user/tags')
    },
    onHandleClickInbox: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.visibleInboxTasks()
      props.changeLocation('/user/inbox')
    },
    onHandleClickAccount: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.hideInboxTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.changeLocation('/user/account/edit-profile')
    },
  })
)(NavigationRight)
