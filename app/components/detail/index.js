import React from 'react'
import PropTypes from 'prop-types'
import { DetailStyle } from './styles'
import { routes } from 'utils/routes'
import { List } from 'immutable'
import { compose, lifecycle, withHandlers } from 'recompose'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { changeLocation } from 'redux/store/routing/routing.actions'
import {
  deselectDetail,
  setAnimation,
  deselectAnimation,
} from 'redux/store/app-state/app-state.actions'
import {
  selectTask,
  requestToggleImportant,
  setComplete,
  setIncomplete,
  setArchiveTasks,
  cancelArchiveTasks,
  deselectTasks,
  setSubject,
  removeTaskTag,
  removeTaskFollower,
  setDate,
  setDescription,
  sendTask,
  acceptTask,
  rejectTask,
  prepareDeleteTask,
} from 'redux/store/tasks/tasks.actions'
import {
  fetchAttachment,
  createAttachment,
  deleteAttachment,
} from 'redux/store/attachments/attachments.actions'
import { fetchActivities } from 'redux/store/activities/activities.actions'
import {
  fetchComment,
  createComment,
} from 'redux/store/comments/comments.actions'
import {
  deselectTags,
  selectTag,
  updateTag,
  prepareDeleteTag,
} from 'redux/store/tags/tags.actions'
import {
  selectContact,
  deselectContacts,
  updateContact,
  sendInvitationContact,
  createContact,
  prepareDeleteContact,
} from 'redux/store/contacts/contacts.actions'
import { getUserId } from 'redux/store/auth/auth.selectors'
import {
  getDetail,
  getWindow,
  getLeftPanel,
} from 'redux/store/app-state/app-state.selectors'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getCurrentTask,
  getNextTask,
  getPreviousTask,
} from 'redux/store/tasks/tasks.selectors'
import { getAttachments } from 'redux/store/attachments/attachments.selectors'
import { getComments } from 'redux/store/comments/comments.selectors'
import {
  getCurrentTag,
  getNextTag,
  getPreviousTag,
  getTagsTitle,
} from 'redux/store/tags/tags.selectors'
import {
  getCurrentContact,
  getNextContact,
  getPreviousContact,
  getContactsEmail,
} from 'redux/store/contacts/contacts.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import {
  getSelectionInfo,
  setArchive,
  cancelArchive,
} from 'redux/utils/component-helper'
import { getRoutingPrevPathname } from 'redux/store/routing/routing.selectors'

import TaskDetail from '../task-detail'
import TagDetail from './tag-detail'
import ContactDetail from './contact-detail'

const Detail = props => {
  const {
    detail,
    windowWidth,
    leftPanelWidth,

    userId,
    task,
    attachments,
    comments,
    onHandleFetchAttachment,
    onHandleFetchActivities,
    onHandleFetchComment,
    onHandleTaskSetComplete,
    onHandleTaskSetIncomplete,
    onHandleTaskArchive,
    onHandleTaskSend,
    onHandleTaskAccept,
    onHandleTaskReject,
    onHandleTaskSubjectUpdate,
    onHandleTaskTagDeleted,
    onHandleTaskFollowerDeleted,
    onHandleTaskDelete,
    onHandleTaskDateChanged,
    onHandleTaskToggleImportant,
    onHandleTaskDescriptionUpdate,
    onHandleTaskAttachmentDelete,
    onHandleTaskFileUploaded,
    onHandleTaskAddComment,
    onHandleTaskAddNewContact,

    tag,
    titles,
    onHandleTagTitleUpdate,
    onHandleTagSetColor,
    onHandleTagDelete,
    onHandleTagDescriptionUpdate,

    contact,
    onHandleContactNicknameUpdate,
    onHandleContactDelete,
    onHandleContactDescriptionUpdate,
    onHandleContactSendInvitation,

    onHandleRemoveEventListener,
    onHandleToggleList,
    onHandleNext,
    onHandlePrevious,
  } = props

  return (
    <DetailStyle>
      {(detail.task || detail.archive) && (
        <TaskDetail
          detail={detail}
          userId={userId}
          task={task}
          animation={detail.animation}
          attachments={attachments}
          comments={comments}
          onHandleFetchAttachment={onHandleFetchAttachment}
          onHandleFetchActivities={onHandleFetchActivities}
          onHandleFetchComment={onHandleFetchComment}
          onHandleRemoveEventListener={onHandleRemoveEventListener}
          onHandleToggleList={onHandleToggleList}
          onHandleNext={onHandleNext}
          onHandlePrevious={onHandlePrevious}
          onHandleTaskSetComplete={onHandleTaskSetComplete}
          onHandleTaskArchive={onHandleTaskArchive}
          onHandleTaskSend={onHandleTaskSend}
          onHandleTaskAccept={onHandleTaskAccept}
          onHandleTaskReject={onHandleTaskReject}
          onHandleTaskSetIncomplete={onHandleTaskSetIncomplete}
          onHandleTaskSubjectUpdate={onHandleTaskSubjectUpdate}
          onHandleTaskTagDeleted={onHandleTaskTagDeleted}
          onHandleTaskFollowerDeleted={onHandleTaskFollowerDeleted}
          onHandleTaskDelete={onHandleTaskDelete}
          onHandleTaskDateChanged={onHandleTaskDateChanged}
          onHandleTaskAddNewContact={onHandleTaskAddNewContact}
          onHandleTaskToggleImportant={onHandleTaskToggleImportant}
          onHandleTaskDescriptionUpdate={onHandleTaskDescriptionUpdate}
          onHandleTaskAttachmentDelete={onHandleTaskAttachmentDelete}
          onHandleTaskFileUploaded={onHandleTaskFileUploaded}
          onHandleTaskAddComment={onHandleTaskAddComment}
        />
      )}

      {detail.tag && (
        <TagDetail
          tag={tag}
          titles={titles}
          windowWidth={windowWidth}
          leftPanelWidth={leftPanelWidth}
          onHandleRemoveEventListener={onHandleRemoveEventListener}
          onHandleToggleList={onHandleToggleList}
          onHandleNext={onHandleNext}
          onHandlePrevious={onHandlePrevious}
          onHandleTagTitleUpdate={onHandleTagTitleUpdate}
          onHandleTagSetColor={onHandleTagSetColor}
          onHandleTagDelete={onHandleTagDelete}
          onHandleTagDescriptionUpdate={onHandleTagDescriptionUpdate}
        />
      )}

      {detail.contact && (
        <ContactDetail
          contact={contact}
          onHandleRemoveEventListener={onHandleRemoveEventListener}
          onHandleToggleList={onHandleToggleList}
          onHandleNext={onHandleNext}
          onHandlePrevious={onHandlePrevious}
          onHandleContactNicknameUpdate={onHandleContactNicknameUpdate}
          onHandleContactDelete={onHandleContactDelete}
          onHandleContactDescriptionUpdate={onHandleContactDescriptionUpdate}
          onHandleContactSendInvitation={onHandleContactSendInvitation}
        />
      )}
    </DetailStyle>
  )
}

Detail.propTypes = {
  detail: PropTypes.object,
  windowWidth: PropTypes.number,
  leftPanelWidth: PropTypes.number,
  prevPathname: PropTypes.string,

  userId: PropTypes.string,
  task: PropTypes.object,
  attachments: PropTypes.object,
  comments: PropTypes.object,
  onHandleFetchAttachment: PropTypes.func,
  onHandleFetchActivities: PropTypes.func,
  onHandleFetchComment: PropTypes.func,
  onHandleTaskSetComplete: PropTypes.func,
  onHandleTaskSetIncomplete: PropTypes.func,
  onHandleTaskArchive: PropTypes.func,
  onHandleTaskSend: PropTypes.func,
  onHandleTaskAccept: PropTypes.func,
  onHandleTaskReject: PropTypes.func,
  onHandleTaskSubjectUpdate: PropTypes.func,
  onHandleTaskTagDeleted: PropTypes.func,
  onHandleTaskFollowerDeleted: PropTypes.func,
  onHandleTaskDelete: PropTypes.func,
  onHandleTaskAddNewContact: PropTypes.func,
  onHandleTaskDateChanged: PropTypes.func,
  onHandleTaskToggleImportant: PropTypes.func,
  onHandleTaskDescriptionUpdate: PropTypes.func,
  onHandleTaskAttachmentDelete: PropTypes.func,
  onHandleTaskFileUploaded: PropTypes.func,
  onHandleTaskAddComment: PropTypes.func,

  tag: PropTypes.object,
  titles: PropTypes.object,
  onHandleTagTitleUpdate: PropTypes.func,
  onHandleTagSetColor: PropTypes.func,
  onHandleTagDelete: PropTypes.func,
  onHandleTagDescriptionUpdate: PropTypes.func,

  contact: PropTypes.object,
  onHandleContactNicknameUpdate: PropTypes.func,
  onHandleContactDelete: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleContactSendInvitation: PropTypes.func,

  onHandleKeyDown: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleClickOutSide: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

const mapStateToProps = state => ({
  detail: getDetail(state),
  windowWidth: getWindow(state).width,
  leftPanelWidth: getLeftPanel(state).width,
  prevPathname: getRoutingPrevPathname(state),

  userId: getUserId(state),
  task: getCurrentTask(state),
  comments: getComments(state),
  attachments: getAttachments(state),
  nextTask: getNextTask(state),
  previousTask: getPreviousTask(state),
  tasks: getTasksItems(state),
  selectedTasks: getSelectionTasks(state),
  completedTasks: getCompletedTasksItems(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  validEmails: getContactsEmail(state),

  tag: getCurrentTag(state),
  titles: getTagsTitle(state),
  nextTag: getNextTag(state),
  previousTag: getPreviousTag(state),

  contact: getCurrentContact(state),
  nextContact: getNextContact(state),
  previousContact: getPreviousContact(state),
})

const mapDispatchToProps = {
  selectTask,
  deselectTasks,
  setComplete,
  setIncomplete,
  setArchiveTasks,
  cancelArchiveTasks,
  setSubject,
  removeTaskTag,
  removeTaskFollower,
  setDate,
  requestToggleImportant,
  setDescription,
  fetchAttachment,
  createAttachment,
  deleteAttachment,
  fetchActivities,
  fetchComment,
  createComment,
  sendTask,
  acceptTask,
  rejectTask,
  createContact,
  prepareDeleteTask,

  selectTag,
  deselectTags,
  updateTag,
  prepareDeleteTag,

  selectContact,
  deselectContacts,
  updateContact,
  sendInvitationContact,
  prepareDeleteContact,

  deselectDetail,
  setAnimation,
  deselectAnimation,
  changeLocation,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleToggleList: props => () => {
      const { tasks, tags, archive, contacts, notifications } = routes.user
      const { detail, prevPathname } = props
      const isPrevNotifications = prevPathname === notifications

      if (detail.task || detail.archive) {
        if (detail.task) {
          const route = isPrevNotifications ? notifications : tasks
          props.changeLocation(route)
        }

        if (detail.archive) {
          const route = isPrevNotifications ? notifications : archive
          props.changeLocation(route)
        }

        props.deselectAnimation()
        props.deselectTasks()
        return
      }

      if (detail.tag) {
        const route = isPrevNotifications ? notifications : tags
        props.changeLocation(route)
        props.deselectTags()
        return
      }

      const route = isPrevNotifications ? notifications : contacts
      props.changeLocation(route)
      props.deselectContacts()
    },
    onHandleNext: props => () => {
      const { detail, nextTask, nextTag, nextContact, selectedTasks } = props

      if (detail.task || detail.archive) {
        if (!nextTask) {
          return
        }

        const selectionInfo = getSelectionInfo(null, nextTask, selectedTasks)
        props.deselectAnimation()
        props.fetchAttachment(nextTask.id)
        props.fetchActivities(nextTask.id)
        props.fetchComment(nextTask.id)
        props.selectTask(
          selectionInfo.newSelectedTasks,
          selectionInfo.isMultiSelection
        )
        return
      }

      if (detail.tag) {
        if (!nextTag) {
          return
        }

        props.selectTag(nextTag.id)
        return
      }

      if (!nextContact) {
        return
      }

      props.selectContact(nextContact.id)
    },
    onHandlePrevious: props => () => {
      const {
        detail,
        previousTask,
        previousTag,
        previousContact,
        selectedTasks,
      } = props

      if (detail.task || detail.archive) {
        if (!previousTask) {
          return
        }

        const selectionInfo = getSelectionInfo(
          null,
          previousTask,
          selectedTasks
        )
        props.deselectAnimation()
        props.fetchAttachment(previousTask.id)
        props.fetchActivities(previousTask.id)
        props.fetchComment(previousTask.id)
        props.selectTask(
          selectionInfo.newSelectedTasks,
          selectionInfo.isMultiSelection
        )
        return
      }

      if (detail.tag) {
        if (!previousTag) {
          return
        }

        props.selectTag(previousTag.id)
        return
      }

      if (!previousContact) {
        return
      }

      props.selectContact(previousContact.id)
    },

    onHandleFetchAttachment: props => data => props.fetchAttachment(data),
    onHandleFetchActivities: props => data => props.fetchActivities(data),
    onHandleFetchComment: props => data => props.fetchComment(data),
    onHandleTaskSetComplete: props => data => {
      props.setAnimation()
      props.setComplete(data)
    },
    onHandleTaskSetIncomplete: props => data => {
      props.setAnimation()
      props.setIncomplete(data)
    },
    onHandleTaskSend: props => data => {
      props.setAnimation()
      props.sendTask(data.taskId, data.followerId)
    },
    onHandleTaskAccept: props => data => {
      props.deselectTasks()
      toast.success(toastCommon.successMessages.tasks.accepted, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      })
      props.acceptTask(data.taskId, data.followerId)
    },
    onHandleTaskReject: props => data => {
      props.deselectTasks()
      props.rejectTask(data)
    },
    onHandleTaskSubjectUpdate: props => data =>
      props.setSubject(data.task, data.subject),
    onHandleTaskTagDeleted: props => data =>
      props.removeTaskTag(data.task.id, data.tagInfo),
    onHandleTaskFollowerDeleted: props => data => {
      props.setAnimation()
      props.removeTaskFollower(data.taskId, data.userId, data.followerId)
    },
    onHandleTaskDateChanged: props => data =>
      props.setDate(data.task, data.date, data.typeDate),
    onHandleTaskAddNewContact: props => email => {
      const { validEmails } = props

      if (validEmails.includes(email.toLowerCase())) {
        toast.error(
          toastCommon.errorMessages.createEntity.createConflict('contact'),
          {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          }
        )

        return
      }

      toast.success(toastCommon.successMessages.contacts.create, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })

      props.createContact(email)
    },
    onHandleTaskToggleImportant: props => data =>
      props.requestToggleImportant(data),
    onHandleTaskDescriptionUpdate: props => data =>
      props.setDescription(data.task, data.description),
    onHandleTaskAttachmentDelete: props => data =>
      props.deleteAttachment(data.task.id, data.attachmentId),
    onHandleTaskFileUploaded: props => data => props.createAttachment(data),
    onHandleTaskAddComment: props => data => props.createComment(data),
    onHandleTaskArchive: props => data => {
      const taskId = data.id
      const tasks = props.tasks
      const isArchived = data.isArchived
      const completedTasks = props.completedTasks
      const archivedTasks = props.archivedTasks
      const entitiesTasks = props.entitiesTasks
      const selectedTasks = props.selectedTasks

      if (isArchived) {
        const nonArchive = cancelArchive(
          taskId,
          tasks,
          completedTasks,
          archivedTasks,
          entitiesTasks
        )
        props.deselectTasks()
        props.cancelArchiveTasks(
          nonArchive.newTasks,
          nonArchive.tasks,
          nonArchive.completedTasks,
          nonArchive.archivedTasks,
          nonArchive.entitiesTasks,
          selectedTasks
        )
        toast.success(toastCommon.successMessages.tasks.cancelArchive, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.SUCCESS_DURATION,
        })
        return
      }

      const archive = setArchive(
        taskId,
        tasks,
        completedTasks,
        archivedTasks,
        entitiesTasks
      )
      props.deselectTasks()
      props.setArchiveTasks(
        archive.newArchiveTasksList,
        archive.tasks,
        archive.completedTasks,
        archive.archivedTasks,
        archive.entitiesTasks,
        selectedTasks
      )
      toast.success(toastCommon.successMessages.tasks.archive, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      })
    },
    onHandleTaskDelete: props => data => {
      let newTaskDelete = List()
      newTaskDelete = newTaskDelete.push(data)

      props.prepareDeleteTask(newTaskDelete)
    },

    onHandleTagTitleUpdate: props => data =>
      props.updateTag(data.tag, data.title, 'title'),
    onHandleTagSetColor: props => data =>
      props.updateTag(data.tag, data.index, 'colorIndex'),
    onHandleTagDelete: props => tag => props.prepareDeleteTag(tag),
    onHandleTagDescriptionUpdate: props => data =>
      props.updateTag(data.tag, data.description, 'description'),

    onHandleContactNicknameUpdate: props => data =>
      props.updateContact(data.contact, data.nickname, 'nickname'),
    onHandleContactDelete: props => contact =>
      props.prepareDeleteContact(contact),
    onHandleContactDescriptionUpdate: props => data =>
      props.updateContact(data.contact, data.description, 'description'),
    onHandleContactSendInvitation: props => data => {
      props.sendInvitationContact(data.id)
      toast.success(toastCommon.successMessages.contacts.sendInvitation, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      })
    },
  }),
  withHandlers({
    onHandleKeyDown: props => event => {
      if (event.repeat) {
        return
      }

      switch (event.which) {
        // escape
        case 27:
          props.onHandleToggleList()
          return

        // arrow left key
        case 37:
          if (event.altKey) {
            props.onHandlePrevious()
          }

          return

        // arrow right key
        case 39:
          if (event.altKey) {
            props.onHandleNext()
          }

          return

        default:
          return
      }
    },
  }),
  withHandlers({
    onHandleRemoveEventListener: props => event => {
      event.stopPropagation()
      document.removeEventListener('keydown', props.onHandleKeyDown, false)
    },
    onHandleClickOutSide: props => event => {
      const detail = document.getElementById('center-panel')

      if (!detail.contains(event.target)) {
        document.removeEventListener('keydown', props.onHandleKeyDown, false)
        return
      }

      document
        .getElementById('user-container')
        .addEventListener('click', props.onHandleClickOutSide, false)
      document.addEventListener('keydown', props.onHandleKeyDown, false)
    },
  }),
  lifecycle({
    componentDidMount() {
      document
        .getElementById('user-container')
        .addEventListener('click', this.props.onHandleClickOutSide, false)
      document.addEventListener('keydown', this.props.onHandleKeyDown, false)
    },
    componentWillUnmount() {
      document
        .getElementById('user-container')
        .removeEventListener('click', this.props.onHandleClickOutSide, false)
      document.removeEventListener('keydown', this.props.onHandleKeyDown, false)
    },
  })
)(Detail)
