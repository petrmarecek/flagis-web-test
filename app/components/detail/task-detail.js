import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { compose, withHandlers, withStateHandlers, lifecycle } from 'recompose'
import { List } from 'immutable'
import dateUtil from 'redux/utils/date'
import { getAssigneeOfTask } from 'redux/utils/component-helper'
import domUtils from 'redux/utils/dom'
import { titles } from 'components/head-title/head-title-common'
import * as userAgent from 'utils/userAgent'

// toast notifications
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'
import constants from 'utils/constants'

// components
import HeadTitle from 'components/head-title'
import DetailMenu from 'components/detail/detail-menu'
import FollowerStatus from 'components/common/follower-status'
import FollowerResponseButtons from '../common/follower-response-buttons'
import Autocomplete from 'components/autocomplete'
import FollowerIcon from '../common/follower-icon'
import AttachmentList from 'components/attachment-list'
import CommentList from 'components/comment-list'
import Loader from 'components/common/loader'
import FollowerItems from '../common/follower-items'
import TagItems from '../common/tag-items'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
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
  DetailContentAddNewContact,
  DetailContentAutocompleteContacts,
  DetailContentDate,
  DetailContentDateIcon,
  DetailContentDateLabel,
  DetailContentDatePicker,
  DetailContentImportant,
  DetailContentImportantIcon,
  DetailContentImportantLabel,
  DetailContentImportantContent,
  DetailContentAttachmentsLoader,
  DetailContentAttachments,
  DetailContentDescriptionTask,
  DetailContentComments,
  DetailContentCommentsAdd,
  DetailContentCommentsAddIcon,
  DetailContentCommentsAddInput,
} from './styles'
import { colors } from 'components/styled-components-mixins/colors'
import { MarkdownEditor } from 'components/editor/markdown-editor'

const TaskDetail = props => {
  const {
    userId,
    task,
    attachments,
    comments,
    isMounted,
    isRejected,
    contentTopRef,
    animation,
    getContentTopRef,
    onHandleComplete,
    onHandleArchive,
    onHandleSend,
    onHandleAccept,
    onHandleReject,
    onHandleSubjectUpdate,
    onHandleTagDelete,
    onHandleFollowerDelete,
    onHandleDelete,
    onHandleAddNewContact,
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
    isInbox: task.isInbox,
    isImportant: task.isImportant,
    isFollowers: assignee !== null,
    isOwner: task.createdById === userId,
    isArchivedOrInbox: task.isArchived || task.isInbox,
  }

  const {
    id,
    subject,
    createdBy,
    followerStatus,
    tags,
    followers,
    dueDate,
    reminderDate,
    description,
    isCompleted,
    isArchived,
    isTags,
    isFollowers,
    isImportant,
    isOwner,
    isInbox,
    isArchivedOrInbox,
  } = getBindingData

  // Variables
  let ruleMessage = isCompleted
    ? toastCommon.infoMessages.taskDetail.completedRules
    : toastCommon.infoMessages.taskDetail.acceptedRules

  if (isInbox) {
    ruleMessage = toastCommon.infoMessages.taskDetail.inboxRules
  }

  // editor styles
  const contentTopElem = contentTopRef
    ? domUtils.getDimensions(contentTopRef)
    : { height: 0 }
  const editorOffset = 84 + contentTopElem.height
  const scrollOffset = 144 + contentTopElem.height
  const contentOffset = 84 + contentTopElem.height
  const attachmentScrollOffset = 300 + contentTopElem.height
  const deviceOffset = userAgent.isTablet ? 75 : 0
  const editorHeight = `calc(100vh - ${editorOffset + deviceOffset}px)`
  const contentHeight = `calc(100vh - ${contentOffset}px)`
  const attachmentScrollHeight = `calc(100vh - ${
    attachmentScrollOffset + deviceOffset
  }px)`
  const scrollStyle = {
    height: `calc(100vh - ${scrollOffset}px)`,
    overflow: 'hidden',
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
  const isUnknownContact =
    isAssigneeAccepted && !isCompleted && !createdBy.isContact

  // Data about owner of task
  const createdByFollower = {
    id: createdBy.id,
    profile: createdBy,
  }

  // Background color of top content
  const backgroundColor = () => {
    if (isArchived) {
      return colors.porpoise
    }

    if (isOwnerAccepted) {
      return colors.lynxWhite
    }

    return colors.white
  }

  // Color of completed icon
  const completedIconColor = () => {
    if (task.isCompleted) {
      return [colors.hanumanGreen]
    }

    if (isOwnerAccepted) {
      return [colors.mercury]
    }

    return [colors.crystalBell]
  }

  // Margin-left of subject
  const subjectMarginLeft = () => {
    if (isArchived) {
      return '50px'
    }

    if (isInbox) {
      return '250px'
    }

    if (isFollowers && followerStatus !== 'accepted') {
      if (followerStatus === 'pending') {
        return '200px'
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

  const getTitlePrefix = () => {
    if (isArchived) {
      return titles.ARCHIVE_DETAIL
    }

    if (isInbox) {
      return titles.INCOMING_DETAIL
    }

    return titles.TASK_DETAIL
  }
  const titlePrefix = getTitlePrefix()

  return (
    <div>
      <HeadTitle title={`${titlePrefix} ${task.subject}`} />
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext}
      />
      <DetailInner isMounted={isMounted} isRejected={isRejected}>
        <DetailContentTop
          ref={getContentTopRef}
          animation={animation}
          completed={isCompletedMainList}
          backgroundColor={backgroundColor}
        >
          <DetailContentSubject>
            <DetailSubject>
              {isInbox && (
                <DetailSubjectTaskFollowerResponse>
                  <FollowerResponseButtons
                    acceptClicked={onHandleAccept}
                    rejectClicked={onHandleReject}
                  />
                </DetailSubjectTaskFollowerResponse>
              )}
              {!isInbox && !isArchived && isFollowers && !isAcceptedStatus && (
                <FollowerStatus
                  status={followerStatus}
                  animation={animation}
                  onSend={onHandleSend}
                />
              )}
              {!isArchived && isAcceptedStatus && (
                <DetailSubjectTaskCompleted
                  completed={task.isCompleted}
                  onClick={onHandleComplete}
                >
                  <Icon
                    icon={
                      isCompleted
                        ? ICONS.TASK_COMPLETED
                        : ICONS.TASK_UNCOMPLETED
                    }
                    color={completedIconColor()}
                    width={22}
                    height={22}
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
                    color={[colors.astrocopusGrey]}
                    hoverColor={[colors.aztec]}
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
                    color={[colors.astrocopusGrey]}
                    hoverColor={[colors.aztec]}
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
                    color={[colors.astrocopusGrey]}
                    hoverColor={[colors.aztec]}
                    width={24}
                    height={27}
                    scale={0.926}
                  />
                </DetailSubjectTaskArchived>
              )}
              <ContentEditableWrapper onClick={onHandleRemoveEventListener}>
                <DetailSubjectTaskContentEditable
                  html={subject}
                  maxCharacters={constants.TASKS_TITLE_MAX_CHARACTERS}
                  enforcePlainText
                  onChange={onHandleSubjectUpdate}
                  completed={isCompleted}
                  important={isImportant}
                  archived={isArchived}
                  marginLeft={subjectMarginLeft}
                  animation={animation}
                  allowed={!isCompleted && !isInbox && !isCollaborated}
                />
              </ContentEditableWrapper>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentTagAutocomplete
            onClick={onHandleRemoveEventListener}
            allowed={!isCompleted && !isArchivedOrInbox}
            isCompleted={isCompletedMainList}
            animation
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
          {!isArchived && !isInbox && isCollaborated && (
            <DetailContentButton
              allowed={!isCompleted}
              isCompleted={isCompletedMainList}
              animation
            >
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
          {isFollowers && (
            <DetailContentIcon
              contactIcon
              title={
                !isOwner
                  ? createdByFollower.profile.nickname === null
                    ? createdByFollower.profile.email
                    : createdByFollower.profile.nickname
                  : assignee.profile.nickname === null
                  ? assignee.profile.email
                  : assignee.profile.nickname
              }
            >
              <FollowerIcon
                status={followerStatus}
                assigneeInbox={isInbox || !isOwner}
                isCompleted={isCompletedMainList}
                photo={
                  !isOwner
                    ? createdByFollower.profile.photo
                    : assignee.profile.photo
                }
                nickname={
                  !isOwner
                    ? createdByFollower.profile.nickname === null
                      ? createdByFollower.profile.email
                      : createdByFollower.profile.nickname
                    : assignee.profile.nickname === null
                    ? assignee.profile.email
                    : assignee.profile.nickname
                }
                animation={animation}
              />
            </DetailContentIcon>
          )}
          {isCollaboratedOrCompleted && (
            <DetailContentIcon title={ruleMessage} animation>
              <Icon
                icon={ICONS.LOCK}
                width={19}
                height={25}
                scale={1.25}
                color={[colors.astrocopusGrey]}
                title={ruleMessage}
              />
            </DetailContentIcon>
          )}
          {isOwner && (
            <DetailContentIcon onClick={onHandleRemoveEventListener}>
              <Icon
                icon={ICONS.TRASH}
                width={23}
                height={26}
                scale={1}
                color={[colors.pompelmo]}
                onClick={onHandleDelete}
                title="Delete"
              />
            </DetailContentIcon>
          )}
        </DetailContentTop>
        <DetailContentCenter animation={animation}>
          <DetailContentProperties contentHeight={contentHeight}>
            <DetailContentOptions allowed={!isCompleted && isOwner}>
              <DetailContentAddContact onClick={onHandleRemoveEventListener}>
                <DetailContentAddContactIcon>
                  <Icon
                    icon={ICONS.CONTACTS}
                    width={15}
                    height={11}
                    scale={0.5}
                    color={[colors.astrocopusGrey]}
                  />
                </DetailContentAddContactIcon>
                <DetailContentAddContactLabel changeColor>
                  {!isOwner ? 'From:' : 'To:'}
                </DetailContentAddContactLabel>
                <DetailContentAddContactContent
                  isOwner={isOwner}
                  isUnknownContact={isUnknownContact}
                >
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
                {isUnknownContact && (
                  <DetailContentAddNewContact
                    onClick={() =>
                      onHandleAddNewContact(createdByFollower.profile.email)
                    }
                  >
                    <Icon
                      icon={ICONS.PLUS}
                      width={10}
                      height={10}
                      scale={0.34}
                      color={[colors.white]}
                    />
                  </DetailContentAddNewContact>
                )}
              </DetailContentAddContact>
              {/* <DetailContentDate allowed={!isCompleted && !isCollaborated}>
                <DetailContentDateIcon
                  icon={ICONS.START_DATE}
                  height={12}
                  width={12}
                  color={['#B1B5B8']}
                />
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
              </DetailContentDate> */}
              <DetailContentDate allowed={!isCompleted && !isCollaborated}>
                <DetailContentDateLabel>
                  <DetailContentDateIcon
                    icon={ICONS.DUE_DATE}
                    height={12}
                    width={12}
                    color={[colors.astrocopusGrey]}
                  />
                  Due date
                </DetailContentDateLabel>
                <DetailContentDatePicker
                  onClick={onHandleRemoveEventListener}
                  selectedDate={Boolean(dueDate)}
                  isClearable={!isCompleted && !isCollaborated}
                >
                  <DatePicker
                    todayButton="Today"
                    locale="en-gb"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat={[
                      dateUtil.DEFAULT_DATE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_FORMAT,
                    ]}
                    selected={dueDate}
                    isClearable={!isCompleted && !isCollaborated}
                    onChange={onHandleDueDateChanged}
                    placeholderText="select a date"
                  />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentDate allowed={!isCompleted && !isInbox}>
                <DetailContentDateLabel reminder>
                  <DetailContentDateIcon
                    icon={ICONS.REMINDER_DATE}
                    height={13}
                    width={15}
                    color={[colors.astrocopusGrey]}
                  />
                  Reminder date
                </DetailContentDateLabel>
                <DetailContentDatePicker
                  onClick={onHandleRemoveEventListener}
                  selectedDate={Boolean(reminderDate)}
                  isClearable={!isCompleted && !isCollaborated}
                >
                  <DatePicker
                    todayButton="Today"
                    locale="en-gb"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat={[
                      dateUtil.DEFAULT_DATE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_TIME_FORMAT,
                      dateUtil.DEFAULT_SIMPLE_DATE_FORMAT,
                    ]}
                    selected={reminderDate}
                    isClearable={!isCompleted && !isCollaborated}
                    onChange={onHandleReminderDateChanged}
                    placeholderText="select a date"
                  />
                </DetailContentDatePicker>
              </DetailContentDate>
              <DetailContentImportant
                title="Use the right mouse button for this action in the task list."
                onClick={onHandleToggleImportant}
                allowed={!isCompleted && !isInbox}
                last
              >
                <DetailContentImportantIcon
                  icon={ICONS.IMPORTANT}
                  width={16}
                  height={16}
                  scale={0.24}
                  color={[colors.astrocopusGrey]}
                />
                <DetailContentImportantLabel important={isImportant}>
                  Important
                </DetailContentImportantLabel>
                <DetailContentImportantContent isChecked={isImportant} />
              </DetailContentImportant>
            </DetailContentOptions>
            <DetailContentAttachments>
              {attachments.isFetching && (
                <DetailContentAttachmentsLoader>
                  <Loader />
                </DetailContentAttachmentsLoader>
              )}
              {!attachments.isFetching && (
                <AttachmentList
                  disabled={isCollaboratedOrCompleted}
                  attachments={attachments}
                  attachmentScrollHeight={attachmentScrollHeight}
                  attachmentDelete={onHandleAttachmentDelete}
                  onFileUploaded={onHandleFileUploaded}
                />
              )}
            </DetailContentAttachments>
          </DetailContentProperties>
          <DetailContentDescriptionTask>
            <div onClick={onHandleRemoveEventListener}>
              <MarkdownEditor
                componentId={task.id}
                content={description}
                setDescription={onHandleDescriptionUpdate}
                editorHeight={editorHeight}
                scrollStyle={scrollStyle}
                disabled={isCollaboratedOrCompleted}
                onInsertImage={onHandleFileUploaded}
                view="full"
              />
            </div>
          </DetailContentDescriptionTask>
          <DetailContentComments
            allowed={!isArchived}
            contentHeight={contentHeight}
          >
            {comments.isFetching && <Loader />}
            {!comments.isFetching && <CommentList comments={comments} />}
            {!isArchived && (
              <DetailContentCommentsAdd>
                <DetailContentCommentsAddIcon>
                  <Icon
                    icon={ICONS.COMMENT}
                    color={[colors.darkJungleGreen]}
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
  isMounted: PropTypes.bool,
  isRejected: PropTypes.bool,
  contentTopRef: PropTypes.object,
  animation: PropTypes.bool,
  attachments: PropTypes.object,
  comments: PropTypes.object,
  getContentTopRef: PropTypes.func,
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
  onHandleTaskAddNewContact: PropTypes.func,
  onHandleAddNewContact: PropTypes.func,
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
  withStateHandlers(
    () => ({
      isMounted: true,
      isRejected: false,
      contentTopRef: null,
    }),
    {
      getContentTopRef: () => ref => ({ contentTopRef: ref }),
      onHandleArchive: (state, props) => () => {
        window.setTimeout(() => props.onHandleTaskArchive(props.task), 400)
        return { isMounted: false }
      },
      onHandleAccept: (state, props) => () => {
        const { id, followers } = props.task
        const assignee = getAssigneeOfTask(followers)
        const data = {
          taskId: id,
          followerId: assignee.id,
        }

        window.setTimeout(() => props.onHandleTaskAccept(data), 400)
        return { isMounted: false }
      },
      onHandleReject: (state, props) => () => {
        const { task } = props
        const data = {
          task,
          type: task.isInbox ? 'inbox' : 'task',
        }

        window.setTimeout(() => props.onHandleTaskReject(data), 400)
        return { isMounted: false, isRejected: true }
      },
    }
  ),
  withHandlers({
    onHandleComplete: props => () => {
      const { id } = props.task

      if (!props.task.isCompleted) {
        props.onHandleTaskSetComplete(id)
      } else {
        props.onHandleTaskSetIncomplete(id)
      }
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
    onHandleAddNewContact: props => email =>
      props.onHandleTaskAddNewContact(email),
    onHandleStartDateChanged: props => date => {
      const data = { task: props.task, date, typeDate: 'startDate' }
      props.onHandleTaskDateChanged(data)
    },
    onHandleDueDateChanged: props => date => {
      date.set({
        second: 0,
        millisecond: 0,
      })

      if (date.hour() === 0 && date.minute() === 0) {
        date.set({
          hour: 12,
          minute: 0,
        })
      }

      const data = { task: props.task, date, typeDate: 'dueDate' }
      props.onHandleTaskDateChanged(data)
    },
    onHandleReminderDateChanged: props => date => {
      date.set({
        second: 0,
        millisecond: 0,
      })

      if (date.hour() === 0 && date.minute() === 0) {
        date.set({
          hour: 12,
          minute: 0,
        })
      }

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
    onHandleFileUploaded: props => (attachments, callback) => {
      const data = {
        taskId: props.task.id,
        files: attachments,
        callback,
      }

      props.onHandleTaskFileUploaded(data)
    },
    onHandleDescriptionUpdate: props => value => {
      const description = value
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
      // Load activities
      this.props.onHandleFetchActivities(task.id)
      // Load comments
      this.props.onHandleFetchComment(task.id)
    },
  })
)(TaskDetail)
