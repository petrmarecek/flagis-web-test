import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withHandlers } from 'recompose'

import dateUtil from 'redux/utils/date'
import { getAssigneeOfTask } from 'redux/utils/component-helper'

import DetailMenu from 'components/detail/detail-menu'
import FollowerStatus from 'components/common/follower-status'
import FollowerResponseButtons from '../common/follower-response-buttons'
import Autocomplete from 'components/autocomplete'
import FollowerIcon from '../common/follower-icon'
import FilePicker from 'components/common/file-picker'
import AttachmentList from 'components/attachment-list/attachment-list'
import CommentList from 'components/comment-list/comment-list'
import Loader from 'components/common/loader'
import Icon from 'components/icons/icon'
import FollowerItems from '../common/follower-items'
import TagItems from '../common/tag-items'
import {ICONS} from 'components/icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectTaskCompleted,
  DetailSubjectTaskArchived,
  DetailSubjectTasFollowerResponse,
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
  DetailContentAutocompleteContacts,
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
    userId,
    task,
    attachments,
    comments,
    isInboxVisible,
    animation,
    onHandleComplete,
    onHandleArchive,
    onHandleSend,
    onHandleAccept,
    onHandleReject,
    onHandleSubjectUpdate,
    onHandleTagDelete,
    onHandleFollowerDelete,
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

  // No task loaded --> hide detail
  if (!task) {
    return <div>Task not found</div>
  }

  // Data of current task
  const assignee = getAssigneeOfTask(task.followers)
  const getBindingData = ({
    id: task.id,
    subject: task.subject,
    followerStatus: assignee !== null ? assignee.status : 'new',
    tags: task.tags,
    followers: task.followers,
    startDate: dateUtil.toMoment(task.startDate),
    dueDate: dateUtil.toMoment(task.dueDate),
    reminderDate: dateUtil.toMoment(task.reminderDate),
    description: task.description,
    isCompleted: task.isCompleted,
    isArchived: task.isArchived,
    isTags: task.tags.size !== 0,
    isFollowers: assignee !== null,
    isImportant: task.isImportant,
    isOwner: task.createdById === userId,
  })

  const {
    id,
    subject,
    followerStatus,
    tags,
    followers,
    startDate,
    dueDate,
    reminderDate,
    description,
    isCompleted,
    isArchived,
    isTags,
    isFollowers,
    isImportant,
    isOwner
  } = getBindingData

  // Margin-left of subject
  const subjectMarginLeft = () => {
    if (isInboxVisible) {
      return '260px'
    }

    if (isCompleted && !isArchived) {
      return '85px'
    }

    if (isFollowers && !isArchived) {
      if (followerStatus === 'pending') {
        return '190px'
      }

      if (followerStatus === 'rejected') {
        return '92px'
      }

      return '147px'
    }

    return '45px'
  }

  return (
    <div>
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext} />
      <DetailInner archived={isArchived}>
        <DetailContentTop
          completed={isCompleted}
          important={isImportant}
          archived={isArchived}
          animation={animation} >
          <DetailContentSubject taskDetail>
            <DetailSubject>
              {isInboxVisible &&
              <DetailSubjectTasFollowerResponse>
                <FollowerResponseButtons 
                  acceptClicked={onHandleAccept}
                  rejectClicked={onHandleReject} />
              </DetailSubjectTasFollowerResponse>}
              {!isArchived && !isInboxVisible && isFollowers &&
              <FollowerStatus
                status={followerStatus}
                animation={animation}
                onSend={onHandleSend}/>}
              {!isArchived && !isFollowers &&
              <DetailSubjectTaskCompleted
                icon={ICONS.TASK_CHECKED}
                color={isCompleted ? ['#c2fee5'] : ['#D7E3EC']}
                hoverColor={isCompleted ? ['#D7E3EC'] : ['#00FFC7']}
                width={22}
                height={21}
                onClick={onHandleComplete}/>}
              {isCompleted && animation && !isArchived &&
              <DetailSubjectTaskArchived
                icon={ICONS.ARCHIVE}
                color={["#8c9ea9"]}
                width={24}
                height={25}
                scale={0.926}
                onClick={onHandleArchive}
                animation={{
                  action: 'transition.expandIn',
                  duration: 1000,
                }} />}
              {isCompleted && !animation && !isArchived &&
              <DetailSubjectTaskArchived
                icon={ICONS.ARCHIVE}
                color={["#8c9ea9"]}
                width={24}
                height={25}
                scale={0.926}
                onClick={onHandleArchive} />}
              {isArchived &&
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
                    html={subject}
                    enforcePlainText
                    onChange={onHandleSubjectUpdate}
                    completed={isCompleted}
                    important={isImportant}
                    archived={isArchived}
                    marginLeft={subjectMarginLeft}
                    animation={animation}
                    disabled={isInboxVisible || isArchived} />
                </span>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentTagAutocomplete 
            onClick={onHandleRemoveEventListener}
            disabled={isInboxVisible}>
            {isArchived &&
            <DetailContentTagAutocompleteTags>
              <TagItems tags={tags}/>
            </DetailContentTagAutocompleteTags>}
            {!isArchived &&
            <Autocomplete
              dataType="tags"
              location="taskDetailTags"
              placeholder="Add tags"
              selectedItems={{ tags: isTags === 0 ? null : tags }}
              parentId={id}
              onItemDelete={onHandleTagDelete}
              isAllowUpdate />}
          </DetailContentTagAutocomplete>
          {!isInboxVisible &&
          <DetailContentDeleteIcon onClick={onHandleRemoveEventListener} >
            <Icon
              icon={ICONS.TRASH}
              width={23}
              height={26}
              scale={1}
              color={["#ff8181"]}
              onClick={onHandleDelete}/>
          </DetailContentDeleteIcon>}
          {isInboxVisible &&
          <DetailContentDeleteIcon onClick={onHandleRemoveEventListener} >
            <FollowerIcon defaultIcon/>
          </DetailContentDeleteIcon>}
        </DetailContentTop>
        <DetailContentCenter>
          <DetailContentProperties>
            <DetailContentOptions disabled={isInboxVisible}>
              <DetailContentAddContact
                onClick={onHandleRemoveEventListener}
                disabled={isCompleted && !isArchived && !isFollowers}
                animation={animation} >
                <DetailContentAddContactLabel changeColor>
                  {isInboxVisible ? 'From:' : 'To:'}
                </DetailContentAddContactLabel>
                <DetailContentAddContactContent inbox={isInboxVisible}>
                  {isArchived || isInboxVisible &&
                  <DetailContentAutocompleteContacts>
                    <FollowerItems followers={followers}/>
                  </DetailContentAutocompleteContacts>}
                  {!isArchived && !isInboxVisible &&
                  <Autocomplete
                    dataType="contacts"
                    location="taskDetailContacts"
                    placeholder="Add contact"
                    selectedItems={{ contacts: isFollowers ? followers.map(follower => follower.profile) : null }}
                    parentId={id}
                    onItemDelete={onHandleFollowerDelete}
                    isWithoutInput={isFollowers} />}
                </DetailContentAddContactContent>
                {!isInboxVisible && isOwner && 
                <DetailContentAddContactIcon>
                  <FollowerIcon status={followerStatus} scale={0.75}/>
                </DetailContentAddContactIcon>}
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
                    selected={startDate}
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
                    selected={dueDate}
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
                    selected={reminderDate}
                    onChange={onHandleReminderDateChanged}/>
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentImportant onClick={onHandleToggleImportant} last>
                <DetailContentImportantLabel important={isImportant}>
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
                disabled={isArchived}
                attachments={attachments}
                attachmentDelete={onHandleAttachmentDelete} />}
              {!isArchived && <FilePicker onFileUploaded={onHandleFileUploaded}/>}
            </DetailContentAttachments>
          </DetailContentProperties>
          <DetailContentDescriptionTask disabled={isInboxVisible}>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description === null ? '' : description}
                placeholder='Add description'
                onUpdate={onHandleDescriptionUpdate}
                scrollStyle={{
                  height: 'calc(100vh - 232px)',
                  overflow: 'hidden',
                }} />
            </span>
          </DetailContentDescriptionTask>
          <DetailContentComments>
            {comments.isFetching &&
            <Loader />}
            {!comments.isFetching &&
            <CommentList comments={comments} />}
            {!isArchived &&
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
  userId: PropTypes.string,
  task: PropTypes.object,
  animation: PropTypes.bool,
  attachments: PropTypes.object,
  comments: PropTypes.object,
  isInboxVisible: PropTypes.bool,
  onHandleComplete: PropTypes.func,
  onHandleTaskSetComplete: PropTypes.func,
  onHandleTaskSetIncomplete: PropTypes.func,
  onHandleArchive: PropTypes.func,
  onHandleTaskArchive: PropTypes.func,
  onHandleSend: PropTypes.func,
  onHandleAccept: PropTypes.func,
  onHandleReject: PropTypes.func,
  onHandleTaskSend: PropTypes.func,
  onHandleTaskAccept: PropTypes.func,
  onHandleTaskReject: PropTypes.func,
  onHandleSubjectUpdate: PropTypes.func,
  onHandleTaskSubjectUpdate: PropTypes.func,
  onHandleTagDelete: PropTypes.func,
  onHandleTaskTagDeleted: PropTypes.func,
  onHandleFollowerDelete: PropTypes.func,
  onHandleTaskFollowerDeleted: PropTypes.func,
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
  onHandleSend: props => () => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      followerId: assignee.id,
    }

    props.onHandleTaskSend(data)
  },
  onHandleAccept: props => () => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      followerId: assignee.id,
    }

    props.onHandleTaskAccept(data)
  },
  onHandleReject: props => () => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      followerId: assignee.id,
    }

    props.onHandleTaskReject(data)
  },
  onHandleSubjectUpdate: props => event => {
    const subject = event.target.value
    if (subject === props.task.subject || subject === '') {
      return
    }

    const data = { task: props.task, subject }
    props.onHandleTaskSubjectUpdate(data)
  },
  onHandleTagDelete: props => tagInfo => {
    const data = { task: props.task, tagInfo }
    props.onHandleTaskTagDeleted(data)
  },
  onHandleDelete: props => () => props.onHandleTaskDelete(props.task.id),
  onHandleFollowerDelete: props => user => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      userId: user.id,
      followerId: assignee.id,
    }

    props.onHandleTaskFollowerDeleted(data)
  },
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
