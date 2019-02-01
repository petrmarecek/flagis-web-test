import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { compose, withHandlers, lifecycle } from 'recompose'
import { List } from 'immutable'
import { infoMessages } from 'utils/messages'

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
import FollowerItems from '../common/follower-items'
import TagItems from '../common/tag-items'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectTaskCompleted,
  DetailSubjectTaskArchived,
  DetailSubjectTaskFollowerResponse,
  ContentEditableWrapper,
  DetailSubjectTaskContentEditable,
  DetailContentTagAutocomplete,
  DetailContentTagAutocompleteTags,
  DetailContentButton,
  DetailContentIcon,
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
  const getBindingData = {
    id: task.id,
    subject: task.subject,
    createdBy: task.createdBy,
    followerStatus: assignee !== null ? assignee.status : null,
    tags: task.tags.filter(tag => tag !== undefined), // eslint-disable-line
    followers: task.followers,
    startDate: dateUtil.toMoment(task.startDate),
    dueDate: dateUtil.toMoment(task.dueDate),
    reminderDate: dateUtil.toMoment(task.reminderDate),
    description: task.description,
    isCompleted: task.isCompleted,
    isArchived: task.isArchived,
    isTags: task.tags.size !== 0,
    isImportant: task.isImportant,
    isFollowers: assignee !== null,
    isOwner: task.createdById === userId,
    isArchivedOrInbox: task.isArchived || isInboxVisible,
  }

  const {
    id,
    subject,
    createdBy,
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
    isOwner,
    isArchivedOrInbox,
  } = getBindingData

  // Variables
  let ruleMessage = isCompleted
    ? infoMessages.taskDetail.completedRules
    : infoMessages.taskDetail.acceptedRules

  if (isInboxVisible) {
    ruleMessage = infoMessages.taskDetail.inboxRules
  }

  // Conditionals
  const isAcceptedStatus =
    followerStatus !== 'new' &&
    followerStatus !== 'pending' &&
    followerStatus !== 'rejected'
  const isCollaborated =
    followerStatus === 'pending' || followerStatus === 'accepted'
  const isCollaboratedOrCompleted = isCollaborated || isCompleted
  const isOwnerCollaborated = isOwner && isCollaborated
  const isOwnerAccepted = isOwner && followerStatus === 'accepted'
  const isAssigneeAccepted = !isOwner && followerStatus === 'accepted'
  const isCompletedMainList = isCompleted && !isArchived
  const isArchivedOrCollaborated = isArchived || !isOwner

  // Data about owner of task
  const createdByFollower = {
    id: createdBy.id,
    profile: createdBy,
  }

  // Background color of top content
  const backgroundColor = () => {
    if (isArchived) {
      return '#c1cad0'
    }

    if (isOwnerAccepted) {
      return '#F6F7F8'
    }

    return '#fff'
  }

  // Margin-left of subject
  const subjectMarginLeft = () => {
    if (isArchived) {
      return '50px'
    }

    if (isInboxVisible) {
      return '250px'
    }

    if (isFollowers && followerStatus !== 'accepted') {
      if (followerStatus === 'pending') {
        return '190px'
      }

      if (followerStatus === 'rejected') {
        return '92px'
      }

      return '147px'
    }

    if (isCompleted && !isArchived) {
      return '90px'
    }

    return '50px'
  }

  return (
    <div>
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext}
      />
      <DetailInner>
        <DetailContentTop
          animation={animation}
          completed={isCompletedMainList}
          backgroundColor={backgroundColor}
        >
          <DetailContentSubject>
            <DetailSubject>
              {isInboxVisible && (
                <DetailSubjectTaskFollowerResponse>
                  <FollowerResponseButtons
                    acceptClicked={onHandleAccept}
                    rejectClicked={onHandleReject}
                  />
                </DetailSubjectTaskFollowerResponse>
              )}
              {!isInboxVisible &&
                !isArchived &&
                isFollowers &&
                !isAcceptedStatus && (
                  <FollowerStatus
                    status={followerStatus}
                    animation={animation}
                    onSend={onHandleSend}
                  />
                )}
              {!isArchived && isAcceptedStatus && (
                <DetailSubjectTaskCompleted
                  compelted={isCompleted}
                  onClick={onHandleComplete}
                >
                  <Icon
                    icon={ICONS.TASK_CHECKED}
                    color={isCompleted ? ['#c2fee5'] : ['#D7E3EC']}
                    width={22}
                    height={21}
                  />
                </DetailSubjectTaskCompleted>
              )}
              {isCompleted && animation && !isArchived && isAcceptedStatus && (
                <DetailSubjectTaskArchived
                  archived={isArchived}
                  onClick={onHandleArchive}
                >
                  <Icon
                    icon={ICONS.ARCHIVE}
                    color={['#8c9ea9']}
                    width={24}
                    height={25}
                    scale={0.926}
                    animation={{
                      action: 'transition.expandIn',
                      duration: 1000,
                    }}
                  />
                </DetailSubjectTaskArchived>
              )}
              {isCompleted && !animation && !isArchived && isAcceptedStatus && (
                <DetailSubjectTaskArchived
                  archived={isArchived}
                  onClick={onHandleArchive}
                >
                  <Icon
                    icon={ICONS.ARCHIVE}
                    color={['#8c9ea9']}
                    width={24}
                    height={25}
                    scale={0.926}
                  />
                </DetailSubjectTaskArchived>
              )}
              {isArchived && (
                <DetailSubjectTaskArchived
                  archived={isArchived}
                  onClick={onHandleArchive}
                >
                  <Icon
                    archived
                    icon={ICONS.NON_ARCHIVE}
                    color={['#282f34']}
                    width={24}
                    height={27}
                    scale={0.926}
                  />
                </DetailSubjectTaskArchived>
              )}
              <ContentEditableWrapper onClick={onHandleRemoveEventListener}>
                <DetailSubjectTaskContentEditable
                  html={subject}
                  enforcePlainText
                  onChange={onHandleSubjectUpdate}
                  completed={isCompleted}
                  important={isImportant}
                  archived={isArchived}
                  marginLeft={subjectMarginLeft}
                  animation={animation}
                  allowed={!isCompleted && !isInboxVisible && !isCollaborated}
                />
              </ContentEditableWrapper>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentTagAutocomplete
            onClick={onHandleRemoveEventListener}
            allowed={!isCompleted && !isArchivedOrInbox}
          >
            {isArchivedOrInbox ? (
              <DetailContentTagAutocompleteTags>
                <TagItems tags={tags} />
              </DetailContentTagAutocompleteTags>
            ) : (
              <Autocomplete
                dataType="tags"
                location="taskDetailTags"
                placeholder="Add tags"
                selectedItems={{ tags: isTags === 0 ? null : tags }}
                parentId={id}
                onItemDelete={onHandleTagDelete}
                isAllowUpdate
              />
            )}
          </DetailContentTagAutocomplete>
          {!isArchived && !isInboxVisible && isCollaborated && (
            <DetailContentButton allowed={!isCompleted}>
              <FollowerResponseButtons
                takeBackClicked={() =>
                  onHandleFollowerDelete(assignee, 'isAssignee')
                }
                rejectClicked={onHandleReject}
                isTakeBack={isOwnerCollaborated}
                isAccepted={isAssigneeAccepted}
              />
            </DetailContentButton>
          )}
          {isOwner ? (
            <DetailContentIcon onClick={onHandleRemoveEventListener}>
              <Icon
                icon={ICONS.TRASH}
                width={23}
                height={26}
                scale={1}
                color={['#ff8181']}
                onClick={onHandleDelete}
              />
            </DetailContentIcon>
          ) : (
            <DetailContentIcon contactIcon>
              <FollowerIcon defaultIcon />
            </DetailContentIcon>
          )}
          {isCollaboratedOrCompleted && (
            <DetailContentIcon title={ruleMessage} animation>
              <Icon
                icon={ICONS.LOCK}
                width={26}
                height={26}
                scale={0.68}
                color={['#8C9DA9']}
                title={ruleMessage}
              />
            </DetailContentIcon>
          )}
        </DetailContentTop>
        <DetailContentCenter allowed={!isCompleted} animation={animation}>
          <DetailContentProperties>
            <DetailContentOptions allowed={!isCompleted && isOwner}>
              <DetailContentAddContact onClick={onHandleRemoveEventListener}>
                <DetailContentAddContactLabel changeColor>
                  {!isOwner ? 'From:' : 'To:'}
                </DetailContentAddContactLabel>
                <DetailContentAddContactContent isOwner={isOwner}>
                  {isArchivedOrCollaborated && (
                    <DetailContentAutocompleteContacts>
                      <FollowerItems
                        followers={
                          !isOwner ? List().push(createdByFollower) : followers
                        }
                      />
                    </DetailContentAutocompleteContacts>
                  )}
                  {!isArchived && isOwner && (
                    <Autocomplete
                      dataType="contacts"
                      location="taskDetailContacts"
                      placeholder="Add contact"
                      selectedItems={{
                        contacts: isFollowers
                          ? followers.map(follower => follower.profile)
                          : null,
                      }}
                      parentId={id}
                      onItemDelete={onHandleFollowerDelete}
                      isHideItemDelete={isOwnerCollaborated}
                      isWithoutInput={isFollowers}
                    />
                  )}
                </DetailContentAddContactContent>
                {!isInboxVisible && isOwner && (
                  <DetailContentAddContactIcon>
                    <FollowerIcon status={followerStatus} iconScale={0.75} />
                  </DetailContentAddContactIcon>
                )}
              </DetailContentAddContact>
              <DetailContentDate allowed={!isCompleted && !isCollaborated}>
                <DetailContentDateLabel>Start date</DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale="en-gb"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={startDate}
                    onChange={onHandleStartDateChanged}
                  />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentDate allowed={!isCompleted && !isCollaborated}>
                <DetailContentDateLabel>Due date</DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale="en-gb"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={dueDate}
                    onChange={onHandleDueDateChanged}
                  />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentDate allowed={!isCompleted && !isCollaborated}>
                <DetailContentDateLabel>Reminder date</DetailContentDateLabel>
                <DetailContentDatePicker onClick={onHandleRemoveEventListener}>
                  <DatePicker
                    todayButton="Today"
                    locale="en-gb"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
                    selected={reminderDate}
                    onChange={onHandleReminderDateChanged}
                  />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentImportant
                onClick={onHandleToggleImportant}
                allowed={!isCompleted && !isInboxVisible}
                last
              >
                <DetailContentImportantLabel important={isImportant}>
                  Important
                </DetailContentImportantLabel>
                <DetailContentImportantContent>
                  B<span>/B</span>
                </DetailContentImportantContent>
              </DetailContentImportant>
            </DetailContentOptions>
            <DetailContentAttachments>
              {attachments.isFetching && <Loader />}
              {!attachments.isFetching && (
                <AttachmentList
                  disabled={isArchivedOrInbox}
                  attachments={attachments}
                  attachmentDelete={onHandleAttachmentDelete}
                />
              )}
              {!isArchivedOrInbox && (
                <FilePicker onFileUploaded={onHandleFileUploaded} />
              )}
            </DetailContentAttachments>
          </DetailContentProperties>
          <DetailContentDescriptionTask
            allowed={!isCompleted && !isCollaborated}
          >
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description === null ? '' : description}
                placeholder="Add description"
                onUpdate={onHandleDescriptionUpdate}
                scrollStyle={{
                  height: 'calc(100vh - 232px)',
                  overflow: 'hidden',
                }}
              />
            </span>
          </DetailContentDescriptionTask>
          <DetailContentComments>
            {comments.isFetching && <Loader />}
            {!comments.isFetching && <CommentList comments={comments} />}
            {!isArchived && (
              <DetailContentCommentsAdd>
                <DetailContentCommentsAddIcon>
                  <Icon
                    icon={ICONS.COMMENT}
                    color={['#8C9DA9']}
                    width={26}
                    height={23}
                  />
                </DetailContentCommentsAddIcon>
                <DetailContentCommentsAddInput>
                  <input
                    id="addComment"
                    onKeyUp={onHandleAddComment}
                    type="text"
                    name="addComment"
                    placeholder="Add comment"
                    onClick={onHandleRemoveEventListener}
                  />
                </DetailContentCommentsAddInput>
              </DetailContentCommentsAdd>
            )}
          </DetailContentComments>
        </DetailContentCenter>
      </DetailInner>
    </div>
  )
}

TaskDetail.propTypes = {
  detail: PropTypes.object,
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

export default compose(
  withHandlers({
    onHandleComplete: props => event => {
      event.stopPropagation()
      const { id } = props.task

      if (!props.task.isCompleted) {
        props.onHandleTaskSetComplete(id)
      } else {
        props.onHandleTaskSetIncomplete(id)
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
      const { task, detail } = props
      const data = {
        task,
        type: detail.inbox ? 'inbox' : 'task',
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
    onHandleFollowerDelete: props => (user, isAssignee) => {
      const { id, followers } = props.task
      const assignee = getAssigneeOfTask(followers)

      const data = {
        taskId: id,
        userId: isAssignee ? user.profile.id : user.id,
        followerId: assignee.id,
      }

      props.onHandleTaskFollowerDeleted(data)
    },
    onHandleStartDateChanged: props => date => {
      const data = { task: props.task, date, typeDate: 'startDate' }
      props.onHandleTaskDateChanged(data)
    },
    onHandleDueDateChanged: props => date => {
      if (date) {
        date.set({
          second: 0,
          millisecond: 0,
        })

        if (date.hour() === 0 && date.minute() === 0) {
          date.add(59, 's').add(999, 'ms')
        }
      }

      const data = { task: props.task, date, typeDate: 'dueDate' }
      props.onHandleTaskDateChanged(data)
    },
    onHandleReminderDateChanged: props => date => {
      const data = { task: props.task, date, typeDate: 'reminderDate' }
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
      const isSubmit = event.which === 13 || event.type === 'click'
      if (!isSubmit) {
        return
      }

      event.preventDefault()
      const value = event.target.value
      if (value === '') {
        return
      }

      event.target.value = ''
      const comment = {
        content: { content: value },
        taskId: props.task.id,
      }

      props.onHandleTaskAddComment(comment)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { task } = this.props
      // Load attachments
      this.props.onHandleFetchAttachment(task.id)
      // Load comments
      this.props.onHandleFetchComment(task.id)
    },
  })
)(TaskDetail)
