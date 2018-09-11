import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { List } from 'immutable'
import { withHandlers } from 'recompose'
import { getColorIndex } from 'redux/utils/component-helper'

import dateUtil from 'redux/utils/date'

import DetailMenu from 'components/detail/detail-menu'
import Autocomplete from 'components/autocomplete'
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
  DetailContentTagAutocompleteTags,
  DetailContentDeleteIcon,
  DetailContentCenter,
  DetailContentProperties,
  DetailContentOptions,
  DetailContentAddContact,
  DetailContentAddContactLabel,
  DetailContentAddContactContent,
  DetailContentAddContactIcon,
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
  DetailContentCommentsAdd,
  DetailContentCommentsAddIcon,
  DetailContentCommentsAddInput,
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
    onHandleItemDelete,
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
        isArchived: false,
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
      isImportant: task.isImportant,
      isArchived: task.isArchived,
    }
  }

  const bindingData = getBindingData()
  const description = bindingData.description === null ? '' : bindingData.description
  const tags = bindingData.tags.map(tag => {
    const colorIndex = getColorIndex(tag.colorIndex, tag.title)
    const tagClasses = `tag cl-${colorIndex}`

    return (
      <li key={tag.id} className={tagClasses}>
        <span className="tag__title">{tag.title}</span>
      </li>
    )
  })
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

      <DetailInner archived={bindingData.isArchived}>
        <DetailContentTop
          completed={bindingData.isCompleted}
          important={bindingData.isImportant}
          archived={bindingData.isArchived}
          animation={animation} >
          <DetailContentSubject>
            <DetailSubject>
              {!bindingData.isArchived &&
              <DetailSubjectTaskCompleted
                icon={ICONS.TASK_CHECKED}
                color={[isCompletedTaskColor]}
                hoverColor={[isCompletedTaskHoverColor]}
                width={22}
                height={21}
                onClick={onHandleComplete}/>}
              {bindingData.isCompleted && animation && !bindingData.isArchived &&
              <DetailSubjectTaskArchived
                icon={ICONS.ARCHIVE}
                color={["#8c9ea9"]}
                width={24}
                height={25}
                scale={0.926}
                animation={iconAnimation}
                onClick={onHandleArchive} />}
              {bindingData.isCompleted && !animation && !bindingData.isArchived &&
              <DetailSubjectTaskArchived
                icon={ICONS.ARCHIVE}
                color={["#8c9ea9"]}
                width={24}
                height={25}
                scale={0.926}
                onClick={onHandleArchive} />}
              {bindingData.isArchived &&
              <DetailSubjectTaskArchived
                archived
                icon={ICONS.NON_ARCHIVE}
                color={["#282f34"]}
                width={24}
                height={27}
                scale={0.926}
                onClick={onHandleArchive} />}
                <span onClick={onHandleRemoveEventListener}>
                  <DetailSubjectTaskContentEditable
                    completed={bindingData.isCompleted}
                    important={bindingData.isImportant}
                    archived={bindingData.isArchived}
                    animation={animation}
                    html={bindingData.subject}
                    enforcePlainText
                    onChange={onHandleSubjectUpdate} />
                </span>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentTagAutocomplete onClick={onHandleRemoveEventListener}>
            {bindingData.isArchived &&
            <DetailContentTagAutocompleteTags>{tags}</DetailContentTagAutocompleteTags>}
            {!bindingData.isArchived &&
            <Autocomplete
              dataType="tags"
              location="taskDetailTags"
              placeholder="Add tags"
              selectedItems={{ tags: bindingData.tags.length === 0 ? null : bindingData.tags }}
              parentId={bindingData.id}
              onItemDelete={onHandleItemDelete}
              isAllowUpdate />}
          </DetailContentTagAutocomplete>
          <DetailContentDeleteIcon
            archived={bindingData.isArchived}
            onClick={onHandleRemoveEventListener} >
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
              <DetailContentAddContact flex>
                <DetailContentAddContactLabel changeColor>
                  To:
                </DetailContentAddContactLabel>
                <DetailContentAddContactContent>
                  Add Email
                </DetailContentAddContactContent>
                <DetailContentAddContactIcon
                  icon={ICONS.CONTACTS}
                  width={21}
                  height={16}
                  scale={0.7}
                  color={["#8C9DA9"]} />
              </DetailContentAddContact>
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
              <DetailContentImportant last onClick={onHandleToggleImportant}>
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
                disabled={bindingData.isArchived}
                attachments={attachments}
                attachmentDelete={onHandleAttachmentDelete} />}
              {!bindingData.isArchived && <FilePicker onFileUploaded={onHandleFileUploaded}/>}
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
            {!bindingData.isArchived &&
            <DetailContentCommentsAdd>
              <DetailContentCommentsAddIcon>
                <Icon
                  icon={ICONS.COMMENT}
                  color={["#8C9DA9"]}
                  width={26}
                  height={23} />
              </DetailContentCommentsAddIcon>
              <DetailContentCommentsAddInput>
                <input
                  id="addComment"
                  onKeyUp={onHandleAddComment}
                  type="text"
                  name="addComment"
                  placeholder="Add comment"
                  onClick={onHandleRemoveEventListener} />
              </DetailContentCommentsAddInput>
            </DetailContentCommentsAdd>}
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
  onHandleItemDelete: PropTypes.func,
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
    props.onHandleTaskArchive(props.task)
  },
  onHandleSubjectUpdate: props => event => {
    const subject = event.target.value
    if (subject === props.task.subject || subject === '') {
      return
    }

    const data = { task: props.task, subject }
    props.onHandleTaskSubjectUpdate(data)
  },
  onHandleItemDelete: props => tagInfo => {
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
