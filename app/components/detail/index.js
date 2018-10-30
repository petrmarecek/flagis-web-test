import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'
import { DetailStyle } from './styles'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'
import { List } from 'immutable'

import {
  deselectDetail,
  showDialog,
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
} from 'redux/store/tasks/tasks.actions'
import {
  fetchAttachment,
  createAttachment,
  deleteAttachment
} from 'redux/store/attachments/attachments.actions'
import {
  fetchComment,
  createComment,
} from 'redux/store/comments/comments.actions'
import {
  deselectTags,
  selectTag,
  updateTag,
} from 'redux/store/tags/tags.actions'
import {
  selectContact,
  deselectContacts,
  updateContact,
  sendInvitationContact
} from 'redux/store/contacts/contacts.actions'
import { sendTaskToFollowers } from 'redux/store/followers/followers.actions'
import { getDetail, getInboxTasksVisibility } from 'redux/store/app-state/app-state.selectors'
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
  getPreviousContact
} from 'redux/store/contacts/contacts.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import {
  getSelectionInfo,
  setArchive,
  cancelArchive,
} from 'redux/utils/component-helper'

import TaskDetail from './task-detail'
import TagDetail from './tag-detail'
import ContactDetail from './contact-detail'

const Detail = props => {

  const {
    detail,
    isInboxVisible,

    task,
    attachments,
    comments,
    onHandleTaskSetComplete,
    onHandleTaskSetIncomplete,
    onHandleTaskArchive,
    onHandleTaskSend,
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
      {(detail.task || detail.archive) &&
      <TaskDetail
        task={task}
        animation={detail.animation}
        attachments={attachments}
        comments={comments}
        isInboxVisible={isInboxVisible}
        onHandleRemoveEventListener={onHandleRemoveEventListener}
        onHandleToggleList={onHandleToggleList}
        onHandleNext={onHandleNext}
        onHandlePrevious={onHandlePrevious}
        onHandleTaskSetComplete={onHandleTaskSetComplete}
        onHandleTaskArchive={onHandleTaskArchive}
        onHandleTaskSend={onHandleTaskSend}
        onHandleTaskSetIncomplete={onHandleTaskSetIncomplete}
        onHandleTaskSubjectUpdate={onHandleTaskSubjectUpdate}
        onHandleTaskTagDeleted={onHandleTaskTagDeleted}
        onHandleTaskFollowerDeleted={onHandleTaskFollowerDeleted}
        onHandleTaskDelete={onHandleTaskDelete}
        onHandleTaskDateChanged={onHandleTaskDateChanged}
        onHandleTaskToggleImportant={onHandleTaskToggleImportant}
        onHandleTaskDescriptionUpdate={onHandleTaskDescriptionUpdate}
        onHandleTaskAttachmentDelete={onHandleTaskAttachmentDelete}
        onHandleTaskFileUploaded={onHandleTaskFileUploaded}
        onHandleTaskAddComment={onHandleTaskAddComment} />}

      {detail.tag &&
      <TagDetail
        tag={tag}
        titles={titles}
        onHandleRemoveEventListener={onHandleRemoveEventListener}
        onHandleToggleList={onHandleToggleList}
        onHandleNext={onHandleNext}
        onHandlePrevious={onHandlePrevious}
        onHandleTagTitleUpdate={onHandleTagTitleUpdate}
        onHandleTagSetColor={onHandleTagSetColor}
        onHandleTagDelete={onHandleTagDelete}
        onHandleTagDescriptionUpdate={onHandleTagDescriptionUpdate} />}

      {detail.contact &&
      <ContactDetail
        contact={contact}
        onHandleRemoveEventListener={onHandleRemoveEventListener}
        onHandleToggleList={onHandleToggleList}
        onHandleNext={onHandleNext}
        onHandlePrevious={onHandlePrevious}
        onHandleContactNicknameUpdate={onHandleContactNicknameUpdate}
        onHandleContactDelete={onHandleContactDelete}
        onHandleContactDescriptionUpdate={onHandleContactDescriptionUpdate}
        onHandleContactSendInvitation={onHandleContactSendInvitation} />}
    </DetailStyle>
  )
}

Detail.propTypes = {
  detail: PropTypes.object,
  isInboxVisible: PropTypes.bool,

  task: PropTypes.object,
  attachments: PropTypes.object,
  comments: PropTypes.object,
  onHandleTaskSetComplete: PropTypes.func,
  onHandleTaskSetIncomplete: PropTypes.func,
  onHandleTaskArchive: PropTypes.func,
  onHandleTaskSend: PropTypes.func,
  onHandleTaskSubjectUpdate: PropTypes.func,
  onHandleTaskTagDeleted: PropTypes.func,
  onHandleTaskFollowerDeleted: PropTypes.func,
  onHandleTaskDelete: PropTypes.func,
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
  isInboxVisible: getInboxTasksVisibility(state),

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
  fetchComment,
  createComment,

  selectTag,
  deselectTags,
  updateTag,

  selectContact,
  deselectContacts,
  updateContact,
  sendInvitationContact,

  sendTaskToFollowers,

  deselectDetail,
  showDialog,
  setAnimation,
  deselectAnimation,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleToggleList: props => () => {
      if (props.detail.task || props.detail.archive) {
        props.deselectAnimation()
        props.deselectTasks()
        return
      }

      if (props.detail.tag) {
        props.deselectTags()
        return
      }

      props.deselectContacts()
    },
    onHandleNext: props => () => {
      if (props.detail.task || props.detail.archive) {
        if (!props.nextTask) {
          return
        }

        const selectionInfo = getSelectionInfo(null, props.nextTask, props.selectedTasks)
        props.deselectAnimation()
        props.fetchAttachment(props.nextTask.id)
        props.fetchComment(props.nextTask.id)
        props.selectTask(selectionInfo.newSelectedTasks, selectionInfo.isMultiSelection)
        return
      }

      if (props.detail.tag) {
        if (!props.nextTag) {
          return
        }

        props.selectTag(props.nextTag.id)
        return
      }

      if (!props.nextContact) {
        return
      }

      props.selectContact(props.nextContact.id)
    },
    onHandlePrevious: props => () => {
      if (props.detail.task || props.detail.archive) {
        if (!props.previousTask) {
          return
        }

        const selectionInfo = getSelectionInfo(null, props.previousTask, props.selectedTasks)
        props.deselectAnimation()
        props.fetchAttachment(props.previousTask.id)
        props.fetchComment(props.previousTask.id)
        props.selectTask(selectionInfo.newSelectedTasks, selectionInfo.isMultiSelection)
        return
      }

      if (props.detail.tag) {
        if (!props.previousTag) {
          return
        }

        props.selectTag(props.previousTag.id)
        return
      }

      if (!props.previousContact) {
        return
      }

      props.selectContact(props.previousContact.id)
    },

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
      props.sendTaskToFollowers(data.taskId, data.followerId)
    },
    onHandleTaskSubjectUpdate: props => data => props.setSubject(data.task, data.subject),
    onHandleTaskTagDeleted: props => data => props.removeTaskTag(data.task.id, data.tagInfo),
    onHandleTaskFollowerDeleted: props => data => {
      props.setAnimation()
      props.removeTaskFollower(
        data.taskId,
        data.userId,
        data.followerId
      )
    },
    onHandleTaskDateChanged: props => data => props.setDate(data.task, data.date, data.typeDate),
    onHandleTaskToggleImportant: props => data => props.requestToggleImportant(data),
    onHandleTaskDescriptionUpdate: props => data => props.setDescription(data.task, data.description),
    onHandleTaskAttachmentDelete: props => data => props.deleteAttachment(data.task.id, data.attachmentId),
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
        const nonArchive = cancelArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks)
        props.deselectTasks()
        props.cancelArchiveTasks(
          nonArchive.newTasks,
          nonArchive.tasks,
          nonArchive.completedTasks,
          nonArchive.archivedTasks,
          nonArchive.entitiesTasks,
          selectedTasks
        )
        toast.success(successMessages.tasks.cancelArchive, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
        })
        return
      }

      const archive = setArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks)
      props.deselectTasks()
      props.setArchiveTasks(
        archive.newArchiveTasksList,
        archive.tasks,
        archive.completedTasks,
        archive.archivedTasks,
        archive.entitiesTasks,
        selectedTasks
      )
      toast.success(successMessages.tasks.archive, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
      })
    },
    onHandleTaskDelete: props => data => {
      let newTaskDelete = List()
      newTaskDelete = newTaskDelete.push(data)

      props.showDialog('task-delete-confirm', { tasks: newTaskDelete })
    },

    onHandleTagTitleUpdate: props => data =>
      props.updateTag(data.tag, data.title, 'title'),
    onHandleTagSetColor: props => data =>
      props.updateTag(data.tag, data.index, 'colorIndex'),
    onHandleTagDelete: props => tag =>
      props.showDialog('tag-delete-confirm', { tag }),
    onHandleTagDescriptionUpdate: props => data =>
      props.updateTag(data.tag, data.description, 'description'),

    onHandleContactNicknameUpdate: props => data =>
      props.updateContact(data.contact, data.nickname, 'nickname'),
    onHandleContactDelete: props => contact =>
      props.showDialog('contact-delete-confirm', { contact }),
    onHandleContactDescriptionUpdate: props => data =>
      props.updateContact(data.contact, data.description, 'description'),
    onHandleContactSendInvitation: props => data => {
      props.sendInvitationContact(data.id)
      toast.success(successMessages.contacts.sendInvitation, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
      })
    }
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

        // backspace
        case 8:
          props.onHandleToggleList()
          return

        // arrow left key
        case 37:
          props.onHandlePrevious()
          return

        // arrow right key
        case 39:
          props.onHandleNext()
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

      document.getElementById('user-container').addEventListener('click', props.onHandleClickOutSide, false)
      document.addEventListener('keydown', props.onHandleKeyDown, false)
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.detail.task) {
        const { id } = this.props.task
        // Load attachments
        this.props.fetchAttachment(id)
        // Load comments
        this.props.fetchComment(id)
      }

      document.getElementById('user-container').addEventListener('click', this.props.onHandleClickOutSide, false)
      document.addEventListener('keydown', this.props.onHandleKeyDown, false)
    },
    componentWillUnmount() {
      document.getElementById('user-container').removeEventListener('click', this.props.onHandleClickOutSide, false)
      document.removeEventListener('keydown', this.props.onHandleKeyDown, false)
    }
  })
)(Detail)
