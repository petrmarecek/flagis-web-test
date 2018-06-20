import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { List } from 'immutable'
import cx from 'classnames'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'

import {
  showDialog,
  deselectDetail
} from 'redux/store/app-state/app-state.actions'

import {
  selectTask,
  requestToggleImportant,
  setComplete,
  setIncomplete,
  setArchiveTasks,
  deselectTasks,
  setSubject,
  removeTaskTag,
  setDate,
  setDescription,
} from 'redux/store/tasks/tasks.actions'
import {
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
  getSelectionTasks,
  getCurrentTask,
  getNextTask,
  getPreviousTask,
} from 'redux/store/tasks/tasks.selectors'

import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'

import {
  fetchAttachment,
  createAttachment,
  deleteAttachment
} from 'redux/store/attachments/attachments.actions'
import { getAttachments } from 'redux/store/attachments/attachments.selectors'

import {
  fetchComment,
  createComment,
} from 'redux/store/comments/comments.actions'
import { getComments } from 'redux/store/comments/comments.selectors'

import {
  getSelectionInfo,
  setArchive
} from 'redux/utils/component-helper'
import dateUtil from 'redux/utils/date'

import DetailMenu from 'components/detail/detail-menu'
import TagAutocomplete from 'components/elements/tag-autocomplete/tag-autocomplete'
import ContentEditable from 'components/common/content-editable'
import FilePicker from 'components/elements/file-picker'
import AttachmentList from 'components/attachment-list/attachment-list'
import CommentList from 'components/comment-list/comment-list'
import Loader from 'components/elements/loader'
import Icon from 'components/icons/icon'
import {ICONS} from 'components/icons/icon-constants'

class TaskDetail extends PureComponent {

  static propTypes = {
    task: PropTypes.object,
    tasks: PropTypes.object,
    completedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    selectedTasks: PropTypes.object,
    nextTask: PropTypes.object,
    previousTask: PropTypes.object,
    selectTask: PropTypes.func,
    requestToggleImportant: PropTypes.func,
    setComplete: PropTypes.func,
    setIncomplete: PropTypes.func,
    setArchiveTasks: PropTypes.func,
    deselectDetail: PropTypes.func,
    deselectTasks: PropTypes.func,
    setSubject: PropTypes.func,
    removeTaskTag: PropTypes.func,
    showDialog: PropTypes.func,
    setDate: PropTypes.func,
    attachments: PropTypes.object,
    fetchAttachment: PropTypes.func,
    createAttachment: PropTypes.func,
    deleteAttachment: PropTypes.func,
    setDescription: PropTypes.func,
    comments: PropTypes.object,
    fetchComment: PropTypes.func,
    createComment: PropTypes.func,
  }

  state = {
    description: this.props.task.description === null ? '' : this.props.task.description,
    animation: false
  }

  componentDidMount() {
    const { id } = this.props.task
    // Load attachments
    this.props.fetchAttachment(id)
    // Load comments
    this.props.fetchComment(id)

    document.getElementById('user-container').addEventListener('click', this.handleClickOutSide, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.task) {
      return
    }
    const prevId = this.props.task.id
    const prevDescription = this.props.task.description
    const { id, description }  = newProps.task

    if (prevId !== id) {
      // Load attachments
      this.props.fetchAttachment(id)
      // Load comments
      this.props.fetchComment(id)

      this.setState({
        description: description === null ? '' : description,
        animation: false
      })
    }

    if (prevDescription !== description) {
      this.setState({
        description: description === null ? '' : description,
        animation: false
      })
    }
  }

  componentWillUnmount() {
    document.getElementById('user-container').removeEventListener('click', this.handleClickOutSide, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  // Back to task list
  handleToggleTaskList = () => {
    this.props.deselectTasks()
  }

  // Previous and next task
  handleClickOutSide = event => {
    const detail = findDOMNode(this.refs.detail)

    if (!detail.contains(event.target)) {
      document.removeEventListener("keydown", this.handleKeyDown, false)
    }
  }

  handleRemoveEventListener = event => {
    event.stopPropagation()
    document.removeEventListener("keydown", this.handleKeyDown, false)
  }

  handleAddEventListener = () => {
    document.addEventListener("keydown", this.handleKeyDown, false)
  }

  handleKeyDown = event => {
    if (event.repeat) {
      return
    }

    switch (event.which) {

      // escape
      case 27:
        this.props.deselectDetail('task')
        this.props.deselectTasks()
        return

      // backspace
      case 8:
        this.props.deselectDetail('task')
        this.props.deselectTasks()
        return

      // arrow left key
      case 37:
        this.handlePreviousTask()
        return

      // arrow right key
      case 39:
        this.handleNextTask()
        return

      default:
        return
    }
  }

  handleNextTask = () => {
    if (!this.props.nextTask) {
      return
    }

    const selectionInfo = getSelectionInfo(null, this.props.nextTask, this.props.selectedTasks)
    this.props.selectTask(selectionInfo.newSelectedTasks, selectionInfo.isMultiSelection)
  }

  handlePreviousTask = () => {
    if (!this.props.previousTask) {
      return
    }

    const selectionInfo = getSelectionInfo(null, this.props.previousTask, this.props.selectedTasks)
    this.props.selectTask(selectionInfo.newSelectedTasks, selectionInfo.isMultiSelection)
  }

  // Important
  handleToggleImportant = event => {
    event.stopPropagation()
    this.props.requestToggleImportant(this.props.task)
  }

  // Completed
  handleCompleteClicked = event => {
    event.stopPropagation()
    const task = this.props.task
    if (!this.props.task.isCompleted) {
      this.props.setComplete(task.id)
      this.setState({ animation: true })
    } else {
      this.props.setIncomplete(task.id)
      this.setState({ animation: true })
    }
  }

  // Archive
  handleArchiveClicked = event => {
    event.stopPropagation()
    const taskId = this.props.task.id
    const tasks = this.props.tasks
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectedTasks

    const archive = setArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks)

    this.props.deselectTasks()
    this.props.setArchiveTasks(
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
  }

  // Subject
  handleSubjectChange = event => {
    this.props.setSubject(this.props.task, event.target.value)
  }

  // Tags
  handleTagDeleted = tagInfo => {
    this.props.removeTaskTag(this.props.task.id, tagInfo)
  }

  // Delete task
  handleDelete = () => {
    let newTaskDelete = List()
    newTaskDelete = newTaskDelete.push(this.props.task.id)

    this.props.showDialog('task-delete-confirm', {tasks: newTaskDelete})
  }

  // Dates
  handleStartDateChanged = date => {
    this.props.setDate(this.props.task, date, 'startDate')
  }

  handleDueDateChanged = date => {
    if (date) {
      date.set({
        'second': 0,
        'millisecond': 0,
      })

      if (date.hour() === 0 && date.minute() === 0) {
        date.add(59, 's').add(999, 'ms')
      }
    }

    this.props.setDate(this.props.task, date, 'dueDate')
  }

  handleReminderDateChanged = date => {
    this.props.setDate(this.props.task, date, 'reminderDate')
  }

  // Attachment
  handleAttachmentDelete = attachmentId => {
    this.props.deleteAttachment(this.props.task.id, attachmentId)
  }

  handleFileUploaded = attachment => {
    const attachmentData = {
      taskId: this.props.task.id,
      fileName: attachment.filename,
      client: attachment.client,
      isWritable: attachment.isWritable,
      mimeType: attachment.mimetype,
      size: attachment.size,
      url: attachment.url,
    }

    this.props.createAttachment(attachmentData)
  }

  // Description
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleDescriptionUpdate = () => {
    const description = this.state.description
    this.props.setDescription(this.props.task, description)
  }

  // Comments
  handleAddComment = event => {
    const isSubmit = (event.which === 13 || event.type === 'click') // enter key or left mouse
    if (!isSubmit)
      return

    event.preventDefault()

    // Read value
    const commentContent = this.refs.addComment.value

    if(commentContent === '')
      return

    // Clear input
    this.refs.addComment.value = ''

    // Call action
    const comment = {
      content: {content: commentContent},
      taskId: this.props.task.id
    }

    this.props.createComment(comment)
  }

  // Data of current task
  getBindingData() {

    // No task loaded --> return default values
    if (!this.props.task) {
      return {
        startDate: null,
        dueDate: null,
        reminderDate: null,
        subject: null,
        tags: List(),
        description: null,
        context: null,
        isCompleted: false,
        isImportant: false,
      }
    }

    // Task loaded --> return real data
    return {
      id: this.props.task.id,
      startDate: dateUtil.toMoment(this.props.task.startDate),
      dueDate: dateUtil.toMoment(this.props.task.dueDate),
      reminderDate: dateUtil.toMoment(this.props.task.reminderDate),
      subject: this.props.task.subject,
      tags: this.props.task.tags,
      description: this.props.task.description,
      context: { source: 'task-detail', parentId: this.props.task.id },
      isCompleted: this.props.task.isCompleted,
      isImportant: this.props.task.isImportant
    }
  }

  getArchiveIcon() {
    const iconAnimation = {
      action: 'transition.expandIn',
      duration: 1000,
    }

    return this.state.animation === true
      ? (<Icon
        className="detail-subject__archive"
        icon={ICONS.ARCHIVE}
        color={["#8c9ea9"]}
        width={24}
        height={25}
        scale={0.926}
        animation={iconAnimation}
        onClick={this.handleArchiveClicked}/>)
      : (<Icon
        className="detail-subject__archive"
        icon={ICONS.ARCHIVE}
        color={["#8c9ea9"]}
        width={24}
        height={25}
        scale={0.926}
        onClick={this.handleArchiveClicked}/>)
  }

  render() {
    const bindingData = this.getBindingData()
    const { attachments, comments} = this.props

    const taskTopDetail = cx({
      'detail-content': true,
      'detail-content__top': true,
      'completed': bindingData.isCompleted,
      'important': bindingData.isImportant,
      'animation': this.state.animation,
    })

    const taskItemSubjectDetail = cx({
      'detail-subject': true,
      'completed': bindingData.isCompleted,
      'important': bindingData.isImportant,
      'animation': this.state.animation,
    })

    const taskOptionsDetail = cx({
      'detail-content__options': true,
      'important': bindingData.isImportant,
    })

    const isCompletedTaskColor = bindingData.isCompleted
      ? '#c2fee5'
      : '#D7E3EC'

    const isCompletedTaskHoverColor = bindingData.isCompleted
      ? '#D7E3EC'
      : '#00FFC7'

    const archiveIcon = this.getArchiveIcon()

    return (
      <div
        ref="detail"
        className="detail"
        onClick={this.handleAddEventListener}>

        <DetailMenu
          back={this.handleToggleTaskList}
          previous={this.handlePreviousTask}
          next={this.handleNextTask} />

        <div
          ref="container"
          className="detail-inner">
          <div className={taskTopDetail}>
            <div className="detail-content__subject">
              <div className={taskItemSubjectDetail} >
                <Icon
                  className="detail-subject__completed"
                  icon={ICONS.TASK_CHECKED}
                  color={[isCompletedTaskColor]}
                  hoverColor={[isCompletedTaskHoverColor]}
                  width={22}
                  height={21}
                  onClick={this.handleCompleteClicked}/>
                {bindingData.isCompleted && archiveIcon}
                <span onClick={this.handleRemoveEventListener}>
                  <ContentEditable
                    ref="subject"
                    className="detail-subject__content"
                    html={bindingData.subject}
                    enforcePlainText
                    onChange={this.handleSubjectChange} />
                </span>
              </div>
            </div>
            <div
              className="detail-content__tag-autocomplete"
              onClick={this.handleRemoveEventListener}>
              <TagAutocomplete
                id="task"
                parentId={bindingData.id}
                context={bindingData.context}
                allowMultiSelect
                focusOnDelete
                placeholder="Add tags"
                selectedTags={bindingData.tags}
                onTagDeleted={this.handleTagDeleted} />
            </div>
            <div className="detail-content__delete">
              <Icon
                icon={ICONS.TRASH}
                width={23}
                height={26}
                scale={1}
                color={["#ff8181", "#ff8181", "#ff8181", "#ff8181"]}
                onClick={this.handleDelete}/>
            </div>
          </div>

          <div className="detail-content detail-content__center">
            <div className="detail-content__properties">
              <div className={taskOptionsDetail}>
                <div className="detail-content__date">
                  <span className="detail-content__date-label">
                    Start date
                  </span>
                  <div
                    className="detail-content__date-picker"
                    onClick={this.handleRemoveEventListener}>
                    <DatePicker
                      todayButton="Today"
                      locale='en-gb'
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.startDate}
                      onChange={this.handleStartDateChanged} />
                  </div>
                </div>
                <div className="detail-content__date">
                  <span className="detail-content__date-label">
                    Due date
                  </span>
                  <div
                    className="detail-content__date-picker"
                    onClick={this.handleRemoveEventListener}>
                    <DatePicker
                      todayButton="Today"
                      locale='en-gb'
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.dueDate}
                      onChange={this.handleDueDateChanged} />
                  </div>
                </div>
                <div className="detail-content__date">
                  <span className="detail-content__date-label">
                    Reminder date
                  </span>
                  <div
                    className="detail-content__date-picker"
                    onClick={this.handleRemoveEventListener}>
                    <DatePicker
                      todayButton="Today"
                      locale='en-gb'
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.reminderDate}
                      onChange={this.handleReminderDateChanged}/>
                  </div>
                </div>
                <div
                  className="detail-content__bold"
                  onClick={this.handleToggleImportant}>
                  <span className="detail-content__bold-label">
                    Bold
                  </span>
                  <div className="detail-content__bold-content">
                    B<span className="bold">/B</span>
                  </div>
                </div>
              </div>
              <div className="detail-content__attachment">
                {attachments.isFetching &&
                <Loader />
                }
                {!attachments.isFetching &&
                <AttachmentList
                  attachments={attachments}
                  attachmentDelete={this.handleAttachmentDelete} />
                }
                <FilePicker onFileUploaded={this.handleFileUploaded} />
              </div>
            </div>

            <div className="detail-content__description">
              <textarea
                ref="description"
                onClick={this.handleRemoveEventListener}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                onBlur={this.handleDescriptionUpdate}
                placeholder="Add a Description"/>
            </div>

            <div className="detail-content__comment">
              {comments.isFetching &&
              <Loader />}
              {!comments.isFetching &&
              <CommentList
                comments={comments} />}
              <div className="comment-add">
                <div className="comment-add__icon-comment">
                  <Icon
                    icon={ICONS.COMMENT}
                    color={["#8C9DA9"]}
                    width={26}
                    height={23} />
                </div>
                <div className="comment-add__input">
                  <input
                    ref="addComment"
                    onKeyUp={this.handleAddComment}
                    type="text"
                    name="addComment"
                    placeholder="Add comment"
                    onClick={this.handleRemoveEventListener} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  task: getCurrentTask(state),
  tasks: getTasksItems(state),
  completedTasks: getCompletedTasksItems(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  selectedTasks: getSelectionTasks(state),
  nextTask: getNextTask(state),
  previousTask: getPreviousTask(state),
  comments: getComments(state),
  attachments: getAttachments(state),
})

const mapDispatchToProps = {
  selectTask,
  requestToggleImportant,
  setComplete,
  setIncomplete,
  setArchiveTasks,
  deselectDetail,
  deselectTasks,
  setSubject,
  removeTaskTag,
  showDialog,
  setDate,
  setDescription,
  fetchAttachment,
  createAttachment,
  deleteAttachment,
  fetchComment,
  createComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
