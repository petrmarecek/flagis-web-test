import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { List } from 'immutable'
import { withHandlers } from 'recompose'

import dateUtil from 'redux/utils/date'

import DetailMenu from 'components/detail/detail-menu'
import TagAutocomplete from 'components/tag-autocomplete/tag-autocomplete'
import FilePicker from 'components/common/file-picker'
import AttachmentList from 'components/attachment-list/attachment-list'
import CommentList from 'components/comment-list/comment-list'
import Loader from 'components/common/loader'
import Icon from 'components/icons/icon'
import {ICONS} from 'components/icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectTaskCompleted,
  DetailSubjectTaskArchived,
  DetailSubjectTaskContentEditable,
  DetailContentTagAutocomplete,
  DetailContentDeleteIcon,
  DetailContentCenter,
  DetailContentProperties,
  DetailContentOptions,
  DetailContentDate,
  DetailContentDateLabel,
  DetailContentDatePicker,
  DetailContentImportant,
  DetailContentImportantLabel,
  DetailContentImportantContent,
  DetailContentAttachments,
  DetailContentDescriptionTask,
  MarkdownEditableContainer,
  DetailContentComments,
} from './styles'

const TaskDetail = props => {

  const {
    task,
    attachments,
    comments,
    animation,
    onHandleComplete,
    onHandleArchive,
    onHandleSubjectUpdate,
    onHandleTagDeleted,
    onHandleDelete,
    onHandleStartDateChanged,
    onHandleDueDateChanged,
    onHandleReminderDateChanged,
    onHandleToggleImportant,
    onHandleAttachmentDelete,
    onHandleFileUploaded,
    onHandleDescriptionUpdate,
    onHandleAddComment,
    onHandleRemoveEventListener,
    onHandleToggleList,
    onHandleNext,
    onHandlePrevious,
  } = props

  if (!task) {
    return <div>Detail not found</div>
  }

  // Data of current task
  const getBindingData = () => {

    // No task loaded --> return default values
    if (!task) {
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
      id: task.id,
      startDate: dateUtil.toMoment(task.startDate),
      dueDate: dateUtil.toMoment(task.dueDate),
      reminderDate: dateUtil.toMoment(task.reminderDate),
      subject: task.subject,
      tags: task.tags,
      description: task.description,
      context: { source: 'task-detail', parentId: task.id },
      isCompleted: task.isCompleted,
      isImportant: task.isImportant
    }
  }

  const bindingData = getBindingData()
  const description = bindingData.description === null ? '' : bindingData.description
  const iconAnimation = {
    action: 'transition.expandIn',
    duration: 1000,
  }
  const scrollStyle = {
    height: 'calc(100vh - 232px)',
    overflow: 'hidden',
  }
  const isCompletedTaskColor = bindingData.isCompleted
    ? '#c2fee5'
    : '#D7E3EC'
  const isCompletedTaskHoverColor = bindingData.isCompleted
    ? '#D7E3EC'
    : '#00FFC7'

  return (
    <div>
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext} />

      <DetailInner>
        <DetailContentTop
          completed={bindingData.isCompleted}
          important={bindingData.isImportant}
          animation={animation} >
          <DetailContentSubject>
            <DetailSubject>
                <DetailSubjectTaskCompleted
                  icon={ICONS.TASK_CHECKED}
                  color={[isCompletedTaskColor]}
                  hoverColor={[isCompletedTaskHoverColor]}
                  width={22}
                  height={21}
                  onClick={onHandleComplete}/>
                {bindingData.isCompleted && animation &&
                <DetailSubjectTaskArchived
                  className="detail-subject__archive"
                  icon={ICONS.ARCHIVE}
                  color={["#8c9ea9"]}
                  width={24}
                  height={25}
                  scale={0.926}
                  animation={iconAnimation}
                  onClick={onHandleArchive}/>}
                {bindingData.isCompleted && !animation &&
                <DetailSubjectTaskArchived
                  className="detail-subject__archive"
                  icon={ICONS.ARCHIVE}
                  color={["#8c9ea9"]}
                  width={24}
                  height={25}
                  scale={0.926}
                  onClick={onHandleArchive}/>}
                <span onClick={onHandleRemoveEventListener}>
                  <DetailSubjectTaskContentEditable
                    completed={bindingData.isCompleted}
                    important={bindingData.isImportant}
                    animation={animation}
                    html={bindingData.subject}
                    enforcePlainText
                    onChange={onHandleSubjectUpdate} />
                </span>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentTagAutocomplete onClick={onHandleRemoveEventListener}>
            <TagAutocomplete
              id="task"
              parentId={bindingData.id}
              context={bindingData.context}
              allowMultiSelect
              focusOnDelete
              placeholder="Add tags"
              selectedTags={bindingData.tags}
              onTagDeleted={onHandleTagDeleted} />
          </DetailContentTagAutocomplete>
          <DetailContentDeleteIcon onClick={onHandleRemoveEventListener} >
            <Icon
              icon={ICONS.TRASH}
              width={23}
              height={26}
              scale={1}
              color={["#ff8181", "#ff8181", "#ff8181", "#ff8181"]}
              onClick={onHandleDelete}/>
          </DetailContentDeleteIcon>
        </DetailContentTop>

        <DetailContentCenter>
          <DetailContentProperties>
            <DetailContentOptions>
              <DetailContentDate>
                <DetailContentDateLabel>
                  Start date
                </DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale='en-gb'
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={bindingData.startDate}
                    onChange={onHandleStartDateChanged} />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentDate>
                <DetailContentDateLabel>
                  Due date
                </DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale='en-gb'
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={bindingData.dueDate}
                    onChange={onHandleDueDateChanged} />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentDate>
                <DetailContentDateLabel>
                  Reminder date
                </DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale='en-gb'
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={bindingData.reminderDate}
                    onChange={onHandleReminderDateChanged}/>
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentImportant onClick={onHandleToggleImportant}>
                <DetailContentImportantLabel important={bindingData.isImportant}>
                  Important
                </DetailContentImportantLabel>
                <DetailContentImportantContent>
                  B<span>/B</span>
                </DetailContentImportantContent>
              </DetailContentImportant>
            </DetailContentOptions>
            <DetailContentAttachments>
              {attachments.isFetching &&
              <Loader />}
              {!attachments.isFetching &&
              <AttachmentList
                attachments={attachments}
                attachmentDelete={onHandleAttachmentDelete} />}
              <FilePicker onFileUploaded={onHandleFileUploaded} />
            </DetailContentAttachments>
          </DetailContentProperties>
          <DetailContentDescriptionTask>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description}
                scrollStyle={scrollStyle}
                placeholder='Add description'
                onUpdate={onHandleDescriptionUpdate} />
            </span>
          </DetailContentDescriptionTask>
          <DetailContentComments>
            {comments.isFetching &&
            <Loader />}
            {!comments.isFetching &&
            <CommentList comments={comments} />}
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
                  id="addComment"
                  onKeyUp={onHandleAddComment}
                  type="text"
                  name="addComment"
                  placeholder="Add comment"
                  onClick={onHandleRemoveEventListener} />
              </div>
            </div>
          </DetailContentComments>
        </DetailContentCenter>
      </DetailInner>
    </div>
  )
}

TaskDetail.propTypes = {
  task: PropTypes.object,
  animation: PropTypes.bool,
  attachments: PropTypes.object,
  comments: PropTypes.object,
  onHandleComplete: PropTypes.func,
  onHandleTaskSetComplete: PropTypes.func,
  onHandleTaskSetIncomplete: PropTypes.func,
  onHandleArchive: PropTypes.func,
  onHandleTaskArchive: PropTypes.func,
  onHandleSubjectUpdate: PropTypes.func,
  onHandleTaskSubjectUpdate: PropTypes.func,
  onHandleTagDeleted: PropTypes.func,
  onHandleTaskTagDeleted: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onHandleTaskDelete: PropTypes.func,
  onHandleStartDateChanged: PropTypes.func,
  onHandleDueDateChanged: PropTypes.func,
  onHandleReminderDateChanged: PropTypes.func,
  onHandleTaskDateChanged: PropTypes.func,
  onHandleToggleImportant: PropTypes.func,
  onHandleTaskToggleImportant: PropTypes.func,
  onHandleAttachmentDelete: PropTypes.func,
  onHandleTaskAttachmentDelete: PropTypes.func,
  onHandleFileUploaded: PropTypes.func,
  onHandleTaskFileUploaded: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleAddComment: PropTypes.func,
  onHandleTaskAddComment: PropTypes.func,
  onHandleTaskSetAnimation: PropTypes.func,
  onHandleTaskDeselectAnimation: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

export default withHandlers({
  onHandleComplete: props => event => {
    event.stopPropagation()

    if (!props.task.isCompleted) {
      props.onHandleTaskSetComplete(props.task.id)
    } else {
      props.onHandleTaskSetIncomplete(props.task.id)
    }
  },
  onHandleArchive: props => event => {
    event.stopPropagation()
    props.onHandleTaskArchive(props.task.id)
  },
  onHandleSubjectUpdate: props => event => {
    const subject = event.target.value
    if (subject === props.task.subject || subject === '') {
      return
    }

    const data = { task: props.task, subject }
    props.onHandleTaskSubjectUpdate(data)
  },
  onHandleTagDeleted: props => tagInfo => {
    const data = { task: props.task, tagInfo }
    props.onHandleTaskTagDeleted(data)
  },
  onHandleDelete: props => () => props.onHandleTaskDelete(props.task.id),
  onHandleStartDateChanged: props => date => {
    const data = { task: props.task, date , typeDate: 'startDate' }
    props.onHandleTaskDateChanged(data)
  },
  onHandleDueDateChanged: props => date => {
    if (date) {
      date.set({
        'second': 0,
        'millisecond': 0,
      })

      if (date.hour() === 0 && date.minute() === 0) {
        date.add(59, 's').add(999, 'ms')
      }
    }

    const data = { task: props.task, date , typeDate: 'dueDate' }
    props.onHandleTaskDateChanged(data)
  },
  onHandleReminderDateChanged: props => date => {
    const data = { task: props.task, date , typeDate: 'reminderDate' }
    props.onHandleTaskDateChanged(data)
  },
  onHandleToggleImportant: props => event => {
    event.stopPropagation()
    props.onHandleTaskToggleImportant(props.task)
  },
  onHandleAttachmentDelete: props => attachmentId => {
    const data = { task: props.task, attachmentId }
    props.onHandleTaskAttachmentDelete(data)
  },
  onHandleFileUploaded: props => attachment => {
    const data = {
      taskId: props.task.id,
      fileName: attachment.filename,
      client: attachment.client,
      isWritable: attachment.isWritable,
      mimeType: attachment.mimetype,
      size: attachment.size,
      url: attachment.url,
    }

    props.onHandleTaskFileUploaded(data)
  },
  onHandleDescriptionUpdate: props => event => {
    const description = event.target.value
    if (description === props.task.description) {
      return
    }

    const data = { task: props.task, description }
    props.onHandleTaskDescriptionUpdate(data)
  },
  onHandleAddComment: props => event => {
    const isSubmit = (event.which === 13 || event.type === 'click')
    if (!isSubmit) {
      return
    }

    event.preventDefault()
    const value = event.target.value
    if(value === '') {
      return
    }

    event.target.value = ''
    const comment = {
      content: { content: value },
      taskId: props.task.id
    }

    props.onHandleTaskAddComment(comment)
  },
})(TaskDetail)
