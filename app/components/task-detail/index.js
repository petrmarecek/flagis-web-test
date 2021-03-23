import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ICONS } from '../icons/icon-constants'
import { TASK_ACTIONS } from 'utils/constants'
import { isTaskActionAllowed } from 'utils/permissions'

// redux
import { getAssigneeOfTask } from 'redux/utils/component-helper'

// components
import DetailMenu from '../detail/detail-menu'
import TaskDetailActivities from './task-detail-activities'
import TaskDetailAddAttachment from './task-detail-add-attachment'
import TaskDetailArchive from './task-detail-archive'
import TaskDetailAttachments from './task-detail-attachments'
import TaskDetailComplete from './task-detail-complete'
import TaskDetailDate from './task-detail-date'
import TaskDetailDescription from './task-detail-description'
import TaskDetailFollower from './task-detail-follower'
import TaskDetailHeadTitle from './task-detail-head-title'
import TaskDetailImportant from './task-detail-important'
import TaskDetailRemove from 'components/task-detail/task-detail-remove'
import TaskDetailSubject from 'components/task-detail/task-detail-subject'
import TaskDetailTags from './task-detail-tags'

// styles
import {
  Content,
  ContentCenter,
  ContentLeft,
  ContentLeftTop,
  ContentLeftBottom,
  ContentRight,
  Divider,
  Header,
  ScrollContent,
  Wrapper,
  TaskDetailWrapper,
} from './styles'
import { colors } from 'components/styled-components-mixins/colors'

const TaskDetail = props => {
  const {
    attachments,
    comments,
    animation,
    onHandleFetchActivities,
    onHandleFetchAttachment,
    onHandleFetchComment,
    onHandleNext,
    onHandlePrevious,
    onHandleTaskAccept,
    onHandleTaskAddComment,
    onHandleTaskArchive,
    onHandleTaskAttachmentDelete,
    onHandleTaskDateChanged,
    onHandleTaskDelete,
    onHandleTaskDescriptionUpdate,
    onHandleTaskFileUploaded,
    onHandleTaskFollowerDeleted,
    onHandleTaskReject,
    onHandleTaskSend,
    onHandleTaskSetComplete,
    onHandleTaskSetIncomplete,
    onHandleTaskSubjectUpdate,
    onHandleTaskTagDeleted,
    onHandleTaskToggleImportant,
    onHandleToggleList,
    task,
  } = props

  // Prepare memoized object with info which task actions are allowed
  const allowedActions = useMemo(
    () => ({
      [TASK_ACTIONS.ACCEPT]: isTaskActionAllowed(task, TASK_ACTIONS.ACCEPT),
      [TASK_ACTIONS.ADD_ATTACHMENT]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.ADD_ATTACHMENT
      ),
      [TASK_ACTIONS.ADD_COMMENT]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.ADD_COMMENT
      ),
      [TASK_ACTIONS.ADD_FOLLOWER]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.ADD_FOLLOWER
      ),
      [TASK_ACTIONS.DELETE_FOLLOWER]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.DELETE_FOLLOWER
      ),
      [TASK_ACTIONS.DELETE_TASK]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.DELETE_TASK
      ),
      [TASK_ACTIONS.REJECT_TASK]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.REJECT_TASK
      ),
      [TASK_ACTIONS.SEND_TASK]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.SEND_TASK
      ),
      [TASK_ACTIONS.TAKE_BACK]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.TAKE_BACK
      ),
      [TASK_ACTIONS.TOGGLE_ARCHIVED]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.TOGGLE_ARCHIVED
      ),
      [TASK_ACTIONS.TOGGLE_COMPLETED]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.TOGGLE_COMPLETED
      ),
      [TASK_ACTIONS.TOGGLE_IMPORTANT]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.TOGGLE_IMPORTANT
      ),
      [TASK_ACTIONS.UPDATE_DESCRIPTION]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.UPDATE_DESCRIPTION
      ),
      [TASK_ACTIONS.UPDATE_DUE_DATE]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.UPDATE_DUE_DATE
      ),
      [TASK_ACTIONS.UPDATE_REMINDER_DATE]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.UPDATE_REMINDER_DATE
      ),
      [TASK_ACTIONS.UPDATE_SUBJECT]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.UPDATE_SUBJECT
      ),
      [TASK_ACTIONS.UPDATE_TAGS]: isTaskActionAllowed(
        task,
        TASK_ACTIONS.UPDATE_TAGS
      ),
    }),
    [task]
  )

  // Prepare handler for accepting task
  const handleAccept = useCallback(
    followerId => onHandleTaskAccept({ followerId, taskId: task.id }),
    [onHandleTaskAccept, task.id]
  )

  // Prepare handler for adding task comment
  const handleAddComment = useCallback(
    content =>
      onHandleTaskAddComment({ content: { content }, taskId: task.id }),
    [onHandleTaskAddComment, task.id]
  )

  // Prepare handler for deleting task attachment
  const handleDeleteAttachment = useCallback(
    attachmentId => onHandleTaskAttachmentDelete({ attachmentId, task }),
    [onHandleTaskAttachmentDelete, task]
  )

  // Prepare handler for deleting task follower
  const handleDeleteFollower = useCallback(
    (followerId, userId) =>
      onHandleTaskFollowerDeleted({ taskId: task.id, followerId, userId }),
    [onHandleTaskFollowerDeleted, task.id]
  )

  // Prepare handler for deleting task
  const handleDeleteTask = useCallback(() => onHandleTaskDelete(task.id), [
    onHandleTaskDelete,
    task.id,
  ])

  // Prepare handler for deleting task tag
  const handleDeleteTag = useCallback(
    tagInfo => onHandleTaskTagDeleted({ task, tagInfo }),
    [onHandleTaskTagDeleted, task]
  )

  const handleFetchActivities = useCallback(() => {
    onHandleFetchActivities(task.id)
    onHandleFetchComment(task.id)
  }, [onHandleFetchActivities, onHandleFetchComment, task.id])

  // Prepare handler for fetching attachments
  const handleFetchAttachments = useCallback(
    () => onHandleFetchAttachment(task.id),
    [onHandleFetchAttachment, task.id]
  )

  // Prepare handler for rejecting task
  const handleReject = useCallback(
    () => onHandleTaskReject({ task, type: 'task' }),
    [onHandleTaskReject, task]
  )

  // Prepare handler for sending task
  const handleSend = useCallback(
    followerId => onHandleTaskSend({ followerId, taskId: task.id }),
    [onHandleTaskSend, task.id]
  )

  // Prepare handler for toggling task attribute isArchived
  const handleToggleArchived = useCallback(() => onHandleTaskArchive(task), [
    onHandleTaskArchive,
    task,
  ])

  // Prepare handler for toggling task attribute isCompleted
  const handleToggleCompleted = useCallback(
    () =>
      task.isCompleted
        ? onHandleTaskSetIncomplete(task.id)
        : onHandleTaskSetComplete(task.id),
    [
      onHandleTaskSetComplete,
      onHandleTaskSetIncomplete,
      task.id,
      task.isCompleted,
    ]
  )

  // Prepare handler for toggling task importance
  const handleToggleImportant = useCallback(
    () => onHandleTaskToggleImportant(task),
    [onHandleTaskToggleImportant, task]
  )

  // Prepare handler for updating task date
  const handleUpdateDate = useCallback(
    typeDate => date => onHandleTaskDateChanged({ date, task, typeDate }),
    [onHandleTaskDateChanged, task]
  )

  // Prepare handler for updating task description
  const handleUpdateDescription = useCallback(
    description => onHandleTaskDescriptionUpdate({ description, task }),
    [onHandleTaskDescriptionUpdate, task]
  )

  // Prepare handler for updating task subject
  const handleUpdateSubject = useCallback(
    subject => onHandleTaskSubjectUpdate({ task: task, subject }),
    [onHandleTaskSubjectUpdate, task]
  )

  // Prepare handler for uploading task attachments
  const handleUploadAttachments = useCallback(
    (files, callback) =>
      onHandleTaskFileUploaded({ taskId: task.id, files, callback }),
    [onHandleTaskFileUploaded, task.id]
  )

  // Background color of top content
  const assignee = getAssigneeOfTask(task.followers)
  const followerStatus = assignee !== null ? assignee.status : null
  const isOwnerAccepted = task.isOwner && followerStatus === 'accepted'
  const backgroundColor = () => {
    if (task.isArchived) {
      return colors.porpoise
    }

    if (isOwnerAccepted) {
      return colors.lynxWhite
    }

    return colors.white
  }

  return (
    <TaskDetailWrapper>
      <TaskDetailHeadTitle
        isArchived={task.isArchived}
        isInbox={task.isInbox}
        subject={task.subject}
      />
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext}
      />
      <Wrapper>
        <Header
          isCompleted={task.isCompleted}
          isArchived={task.isArchived}
          animation={animation}
          backgroundColor={backgroundColor}
        >
          <TaskDetailComplete
            isCompleted={task.isCompleted}
            isUpdatable={allowedActions[TASK_ACTIONS.TOGGLE_COMPLETED]}
            onClick={handleToggleCompleted}
          />
          <TaskDetailArchive
            isArchived={task.isArchived}
            isCompleted={task.isCompleted}
            isUpdatable={allowedActions[TASK_ACTIONS.TOGGLE_ARCHIVED]}
            onClick={handleToggleArchived}
          />
          <TaskDetailSubject
            isCompleted={task.isCompleted}
            isArchived={task.isArchived}
            isImportant={task.isImportant}
            isUpdatable={allowedActions[TASK_ACTIONS.UPDATE_SUBJECT]}
            onUpdate={handleUpdateSubject}
            subject={task.subject}
          />
        </Header>
        <Divider />
        <Content>
          <ContentCenter>
            <ContentLeft>
              <ScrollContent>
                <ContentLeftTop>
                  <TaskDetailTags
                    isUpdatable={allowedActions[TASK_ACTIONS.UPDATE_TAGS]}
                    onDelete={handleDeleteTag}
                    tags={task.tags}
                    taskId={task.id}
                  />
                  <TaskDetailFollower
                    followers={task.followers.toArray()}
                    isAddAllowed={allowedActions[TASK_ACTIONS.ADD_FOLLOWER]}
                    isDeleteAllowed={
                      allowedActions[TASK_ACTIONS.DELETE_FOLLOWER]
                    }
                    isOwner={task.isOwner}
                    isAcceptAllowed={allowedActions[TASK_ACTIONS.ACCEPT]}
                    isRejectAllowed={allowedActions[TASK_ACTIONS.REJECT_TASK]}
                    isSendAllowed={allowedActions[TASK_ACTIONS.SEND_TASK]}
                    isTakeBackAllowed={allowedActions[TASK_ACTIONS.TAKE_BACK]}
                    onAccept={handleAccept}
                    onDelete={handleDeleteFollower}
                    onReject={handleReject}
                    onSend={handleSend}
                    owner={task.createdBy}
                    taskId={task.id}
                  />
                  <TaskDetailDate
                    icon={ICONS.DUE_DATE}
                    isUpdatable={allowedActions[TASK_ACTIONS.UPDATE_DUE_DATE]}
                    onUpdate={handleUpdateDate('dueDate')}
                    title="Due date"
                    value={task.dueDate}
                  />
                  <TaskDetailDate
                    icon={ICONS.REMINDER_DATE}
                    isUpdatable={
                      allowedActions[TASK_ACTIONS.UPDATE_REMINDER_DATE]
                    }
                    onUpdate={handleUpdateDate('reminderDate')}
                    title="Reminder date"
                    value={task.reminderDate}
                  />
                  <TaskDetailImportant
                    isImportant={task.isImportant}
                    isUpdatable={allowedActions[TASK_ACTIONS.TOGGLE_IMPORTANT]}
                    onClick={handleToggleImportant}
                  />
                  <TaskDetailAddAttachment
                    isUpdatable={allowedActions[TASK_ACTIONS.ADD_ATTACHMENT]}
                    onUpload={handleUploadAttachments}
                  />
                </ContentLeftTop>
                <ContentLeftBottom>
                  <TaskDetailRemove
                    isUpdatable={allowedActions[TASK_ACTIONS.DELETE_TASK]}
                    onClick={handleDeleteTask}
                  />
                </ContentLeftBottom>
              </ScrollContent>
            </ContentLeft>
            <ContentRight>
              <ScrollContent>
                <TaskDetailDescription
                  description={task.description}
                  isUpdatable={allowedActions[TASK_ACTIONS.UPDATE_DESCRIPTION]}
                  onUpdate={handleUpdateDescription}
                  onUpload={handleUploadAttachments}
                  taskId={task.id}
                />
                <TaskDetailAttachments
                  attachments={attachments.items.toArray()}
                  isFetching={attachments.isFetching}
                  isUpdatable={allowedActions[TASK_ACTIONS.ADD_ATTACHMENT]}
                  onDelete={handleDeleteAttachment}
                  onFetch={handleFetchAttachments}
                  onUpload={handleUploadAttachments}
                />
                <TaskDetailActivities
                  data={comments.items.toArray()}
                  isFetching={comments.isFetching}
                  isCommentAddAllowed={allowedActions[TASK_ACTIONS.ADD_COMMENT]}
                  onAddComment={handleAddComment}
                  onFetch={handleFetchActivities}
                />
              </ScrollContent>
            </ContentRight>
          </ContentCenter>
        </Content>
      </Wrapper>
    </TaskDetailWrapper>
  )
}

TaskDetail.propTypes = {
  attachments: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  animation: PropTypes.bool.isRequired,
  onHandleFetchActivities: PropTypes.func.isRequired,
  onHandleFetchAttachment: PropTypes.func.isRequired,
  onHandleFetchComment: PropTypes.func.isRequired,
  onHandleNext: PropTypes.func.isRequired,
  onHandlePrevious: PropTypes.func.isRequired,
  onHandleTaskAccept: PropTypes.func.isRequired,
  onHandleTaskAddComment: PropTypes.func.isRequired,
  onHandleTaskArchive: PropTypes.func.isRequired,
  onHandleTaskAttachmentDelete: PropTypes.func.isRequired,
  onHandleTaskDateChanged: PropTypes.func.isRequired,
  onHandleTaskDelete: PropTypes.func.isRequired,
  onHandleTaskDescriptionUpdate: PropTypes.func.isRequired,
  onHandleTaskFileUploaded: PropTypes.func.isRequired,
  onHandleTaskFollowerDeleted: PropTypes.func.isRequired,
  onHandleTaskReject: PropTypes.func.isRequired,
  onHandleTaskSend: PropTypes.func.isRequired,
  onHandleTaskSetComplete: PropTypes.func.isRequired,
  onHandleTaskSetIncomplete: PropTypes.func.isRequired,
  onHandleTaskSubjectUpdate: PropTypes.func.isRequired,
  onHandleTaskTagDeleted: PropTypes.func.isRequired,
  onHandleTaskToggleImportant: PropTypes.func.isRequired,
  onHandleToggleList: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
}

export default TaskDetail
