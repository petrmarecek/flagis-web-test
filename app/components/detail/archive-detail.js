import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import commonUtils from 'redux/utils/common'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'
import { List } from 'immutable'
import cx from 'classnames'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import {
  showDialog,
  deselectDetail
} from 'redux/store/app-state/app-state.actions'

import {
  selectTask,
  deselectTasks,
  cancelArchiveTasks,
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

import { fetchComment} from '../../redux/store/comments/comments.actions'
import { getComments } from './../../redux/store/comments/comments.selectors'
import { fetchAttachment} from '../../redux/store/attachments/attachments.actions'
import { getAttachments } from './../../redux/store/attachments/attachments.selectors'

import {
  getSelectionInfo,
  cancelArchive,
} from '../../redux/utils/component-helper'

import dateUtil from './../../redux/utils/date'

import DetailMenu from 'components/detail/detail-menu'
import CommentList from '../comment-list/comment-list'
import ContentEditable from '../common/content-editable'
import AttachmentList from '../attachment-list/attachment-list'
import Loader from '../elements/loader'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

class ArchiveDetail extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      description: this.props.task.description === null ? '' : this.props.task.description
    }
  }

  static propTypes = {
    task: PropTypes.object,
    tasks: PropTypes.object,
    completedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    nextTask: PropTypes.object,
    previousTask: PropTypes.object,
    selectTask: PropTypes.func,
    deselectDetail: PropTypes.func,
    deselectTasks: PropTypes.func,
    cancelArchiveTasks: PropTypes.func,
    showDialog: PropTypes.func,
    attachments: PropTypes.object,
    fetchAttachment: PropTypes.func,
    comments: PropTypes.object,
    fetchComment: PropTypes.func,
    selectedTasks: PropTypes.object,
  }

  componentDidMount() {
    // Load attachments
    this.props.fetchAttachment(this.props.task.id)
    // Load comments
    this.props.fetchComment(this.props.task.id)

    document.getElementById('user-container').addEventListener('click', this.handleClickOutSide, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.getElementById('user-container').removeEventListener('click', this.handleClickOutSide, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.task) {
      return
    }

    if (this.props.task.id !== newProps.task.id) {
      this.props.fetchComment(newProps.task.id)
      this.props.fetchAttachment(newProps.task.id)
      this.setState({ description: newProps.task.description === null ? '' : newProps.task.description })
    }
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
        this.props.deselectDetail('archive')
        this.props.deselectTasks()
        return

      // backspace
      case 8:
        this.props.deselectDetail('archive')
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

  // Cancel archived task
  handleArchiveClicked = event => {
    event.stopPropagation()
    const taskId = this.props.task.id
    const tasks = this.props.tasks
    const completedTasks = this.props.completedTasks
    const archivedTasks = this.props.archivedTasks
    const entitiesTasks = this.props.entitiesTasks
    const selectedTasks = this.props.selectedTasks

    const nonArchive = cancelArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks)

    this.props.deselectTasks()
    this.props.cancelArchiveTasks(
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
  }

  // Delete task
  handleDelete = () => {
    let newTaskDelete = List()
    newTaskDelete = newTaskDelete.push(this.props.task.id)

    this.props.showDialog('task-delete-confirm', {tasks: newTaskDelete})
  }

  getColorIndex(tag) {
    return tag.colorIndex === null
      ? commonUtils.computeIntHash(tag.title, 10)
      : tag.colorIndex
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
      context: { source: 'archive-detail', parentId: this.props.task.id },
      isCompleted: this.props.task.isCompleted,
      isImportant: this.props.task.isImportant
    }
  }

  render() {
    const { attachments, comments} = this.props
    const bindingData = this.getBindingData()
    const tags = bindingData.tags.map(tag => {
      const colorIndex = this.getColorIndex(tag)
      const tagClasses = `tag cl-${colorIndex}`

      return (
        <li key={tag.id} className={tagClasses}>
          <span className="tag__title">{tag.title}</span>
        </li>
      )
    })

    const taskItemSubjectDetail = cx({
      'detail-subject': true,
      'archived': true,
      'important': bindingData.isImportant,
    })

    const taskTopDetail = cx({
      'detail-content': true,
      'detail-content__top': true,
      'archived': true,
      'important': bindingData.isImportant,
    })

    const taskOptionsDetail = cx({
      'detail-content__options': true,
      'important': bindingData.isImportant,
      'archived': true,
    })

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
                  className="detail-subject__archive"
                  icon={ICONS.NON_ARCHIVE}
                  color={["#282f34"]}
                  width={24}
                  height={27}
                  scale={0.926}
                  onClick={this.handleArchiveClicked}/>
                <ContentEditable
                  ref="subject"
                  className="detail-subject__content"
                  html={bindingData.subject}
                  enforcePlainText />
              </div>
            </div>
            <div className="detail-content__tag-autocomplete">
              <ul className="detail-content__tags">
                {tags}
              </ul>
            </div>
            <div className="detail-content__delete">
              <Icon
                className="btn-icon"
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
                  <div className="detail-content__date-picker">
                    <DatePicker
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.startDate}
                      disabled/>
                  </div>
                </div>
                <div className="detail-content__date">
                  <span className="detail-content__date-label">
                    Due date
                  </span>
                  <div className="detail-content__date-picker">
                    <DatePicker
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.dueDate}
                      disabled />
                  </div>
                </div>
                <div className="detail-content__date">
                  <span className="detail-content__date-label">
                    Reminder date
                  </span>
                  <div className="detail-content__date-picker">
                    <DatePicker
                      dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                      selected={bindingData.reminderDate}
                      disabled />
                  </div>
                </div>
                <div
                  className="detail-content__bold">
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
                <Loader />}
                {!attachments.isFetching &&
                <AttachmentList
                  attachments={attachments}
                  disabled/>}
              </div>
            </div>

            <div className="detail-content__description">
              <textarea
                ref="description"
                value={this.state.description}
                placeholder="Description"
                disabled/>
            </div>

            <div className="detail-content__comment">
              {comments.isFetching &&
              <Loader />}
              {!comments.isFetching &&
              <CommentList
                comments={comments}
                disabled/>}
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
  deselectDetail,
  deselectTasks,
  cancelArchiveTasks,
  showDialog,
  fetchAttachment,
  fetchComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveDetail)