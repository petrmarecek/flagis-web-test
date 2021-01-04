import _ from 'lodash'
import React, { useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import moment from 'moment'
import removeMd from 'remove-markdown'
import { motion } from 'framer-motion'

// hooks
import { useTaskListItemDragDrop } from 'hooks/useTaskListItemDragDrop'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { setTaskTags } from 'redux/store/tasks/tasks.actions'
import dateUtils from 'redux/utils/date'
import {
  getAssigneeOfTask,
  getSortedTags,
  isStringEmpty,
  markdownToHTML,
} from 'redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from '../icons/icon'
import FollowerResponseButtons from '../common/follower-response-buttons'
import TaskListTagItems from './task-list-tag-items'
import FollowerIcon from '../common/follower-icon'

// styles
import { colors } from 'components/styled-components-mixins/colors'

import { EmptyList } from 'components/styled-components-mixins'
import {
  TaskItem,
  Completed,
  Archived,
  FollowerResponse,
  Content,
  SubjectTags,
  Subject,
  Tags,
  DescriptionDueDate,
  DueDate,
  Followers, DueDateIcon,
} from './styles'

// TaskListItem
const TaskListItem = props => {
  const {
    userId,
    task,
    isSelected,
    noTaskFound,
    listType,
    selectedTags,
    leftPanelWidth,
    windowWidth,
    isDragAndDropActive,
  } = props

  const [isMounted, setIsMounted] = useState(true)
  const { dragDropHandle, dragProps } = useTaskListItemDragDrop(props)

  // right mouse button for set task as important/unimportant
  const onHandleMouseDown = useCallback(
    event => {
      const { isCompleted, isInbox } = props.task

      // not allowed to set an important/unimportant for a completed task or a task in inbox
      if (isCompleted || isInbox) {
        return
      }

      // allowed only right mouse button
      if (event.button !== 2) {
        return
      }

      // set task as important by right mouse
      props.onToggleImportant(props.task)
    },
    [props.onToggleImportant, props.task],
  )

  const onHandleClicked = useCallback(
    event => {
      event.persist()
      const isInboxList = props.listType === 'inbox'
      const isMultiselect = event.ctrlKey || event.metaKey

      // Not allowed multiselect in inbox list
      if (isMultiselect && isInboxList) {
        return
      }

      // Click on link
      if (event.target.nodeName === 'A') {
        return
      }

      props.onClick(props.task, event)
    },
    [props.listType, props.task],
  )

  const onHandleTagClicked = useCallback(tag => props.onTagClick(tag), [
    props.onTagClick,
  ])

  const onHandleCompleteClicked = useCallback(() => {
    // Data of assignee
    const assignee = getAssigneeOfTask(props.task.followers)
    const isFollowers = assignee !== null
    const followerStatus = isFollowers ? assignee.status : 'new'

    if (followerStatus === 'pending') {
      toast.error(toastCommon.errorMessages.tasks.waitingResponse, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })
      return
    }

    props.onCompleteClick(props.task)
  }, [getAssigneeOfTask, props.onCompleteClick, props.task])

  const onHandleArchiveClicked = useCallback(() => {
    // allowed left mouse button
    if (props.listType === 'archived') {
      window.setTimeout(() => props.cancelArchiveTasks(props.task.id), 400)
      setIsMounted(false)
      return
    }

    window.setTimeout(() => props.setArchiveTasks(props.task.id), 400)
    setIsMounted(false)
  }, [
    props.cancelArchiveTasks,
    props.setArchiveTasks,
    props.task,
    props.listType,
  ])

  const onHandleAcceptClicked = useCallback(() => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      followerId: assignee.id,
    }

    window.setTimeout(() => props.acceptTask(data), 400)
    setIsMounted(false)
  }, [getAssigneeOfTask, props.acceptTask, props.task])

  const onHandleRejectClicked = useCallback(() => {
    const data = {
      task,
      type: props.listType,
    }

    window.setTimeout(() => props.rejectTask(data), 400)
    setIsMounted(false)
  }, [props.rejectTask, props.listType])

  // Conditions
  const isArchivedList = listType === 'archived'
  const isInboxList = listType === 'inbox'
  const isOwner = task.createdById === userId
  const isCompletedMainList = task.isCompleted && !isArchivedList
  const isDescription = !isStringEmpty(task.description)

  // Data about owner of task
  const createdByFollower = {
    id: task.createdBy.id,
    profile: task.createdBy,
  }

  // Sorted tags
  const sortedTags = useMemo(() => getSortedTags(task.tags, selectedTags), [
    getSortedTags,
    selectedTags,
    task,
  ])

  // Data of assignee
  const assignee = useMemo(() => getAssigneeOfTask(task.followers), [
    getAssigneeOfTask,
    task,
  ])
  const isFollowers = assignee !== null
  const followerStatus = isFollowers ? assignee.status : 'new'
  const isOwnerAccepted = isOwner && followerStatus === 'accepted'

  // Date from dueDate
  const now = moment()
  const dueDate = task.dueDate
  const dueDateFormat = useMemo(() => dateUtils.formatDate(dueDate, 'DD.MM.'), [
    dateUtils.formatDate,
    dueDate,
  ])
  const fromNow = task.dueDate ? moment(dueDate).fromNow() : ''

  // Format reminder date
  const reminderDateFormat = useMemo(
    () => dateUtils.formatDate(task.reminderDate, 'DD/MM HH:mm'),
    [task.reminderDate],
  )

  // Description
  let description = isDescription ? task.description : ''
  description = useMemo(() => markdownToHTML(description), [
    markdownToHTML,
    description,
  ])
  const indexOfBr = description.indexOf('br />')
  const indexOfEndHtmlTag = description.indexOf('</')
  const lastIndexOfEndHtmlTag = description.lastIndexOf('</')
  const hasDescriptionMoreLines = indexOfEndHtmlTag !== lastIndexOfEndHtmlTag

  if (indexOfBr !== -1 && indexOfBr < indexOfEndHtmlTag) {
    description = description.substr(0, description.indexOf('br />') + 5)
    description = useMemo(() => removeMd(description), [removeMd, description])
    description = `${description}...`
  } else {
    description = description.substr(0, description.indexOf('</'))
    description = useMemo(() => removeMd(description), [removeMd, description])
    description = hasDescriptionMoreLines ? `${description}...` : description
  }

  // Task-Item width
  const taskItemWidth = windowWidth - leftPanelWidth - 20

  // Background color of task item
  const backgroundColor = () => {
    if (isSelected) {
      return colors.meltingGlacier
    }

    if (dragProps.isDragging) {
      return colors.lynxWhite
    }

    if (isArchivedList) {
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

  // Margin-left of content task
  const contentMarginLeft = () => {
    if (isInboxList) {
      return '260px'
    }

    if (isCompletedMainList) {
      return '90px'
    }

    return '50px'
  }

  // Margin-right of content task
  const contentMarginRight = () => {
    if (!isFollowers) {
      return '15px'
    }

    return isInboxList || !isOwner ? '76px' : '63px'
  }

  // Render component
  return (
    <li ref={dragDropHandle}>
      {noTaskFound ? (
        <EmptyList>No tasks found</EmptyList>
      ) : (
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <TaskItem
            key={task.id}
            tabIndex='-1'
            data-item-id={task.id}
            onMouseDown={onHandleMouseDown}
            onClick={onHandleClicked}
            active={task.active}
            selected={isSelected}
            backgroundColor={backgroundColor}
            completed={isCompletedMainList}
            dragging={dragProps.isDragging}
            isMounted={isMounted}
            animationEnabled={!isDragAndDropActive}
          >
            {!isArchivedList && !isInboxList && (
              <Completed
                completed={task.isCompleted}
                onClick={e => {
                  e.stopPropagation()
                  onHandleCompleteClicked(e)
                }}
              >
                <Icon
                  icon={
                    task.isCompleted
                      ? ICONS.TASK_COMPLETED
                      : ICONS.TASK_UNCOMPLETED
                  }
                  color={completedIconColor()}
                  width={22}
                  height={22}
                  title={
                    task.isCompleted
                      ? 'Incomplete the task'
                      : 'Complete the task'
                  }
                />
              </Completed>
            )}
            {task.isCompleted && !isInboxList && (
              <Archived
                archived={isArchivedList}
                onClick={e => {
                  e.stopPropagation()
                  onHandleArchiveClicked(e)
                }}
              >
                <Icon
                  icon={isArchivedList ? ICONS.NON_ARCHIVE : ICONS.ARCHIVE}
                  color={[colors.astrocopusGrey]}
                  hoverColor={[colors.aztec]}
                  width={24}
                  height={27}
                  scale={0.926}
                  animation={
                    !task.isCompleted
                      ? null
                      : {
                        action: 'transition.expandIn',
                        duration: 1000,
                      }
                  }
                  title={
                    isArchivedList
                      ? 'Return the task to the My Tasks'
                      : 'Archive the task'
                  }
                />
              </Archived>
            )}
            {isInboxList && (
              <FollowerResponse>
                <FollowerResponseButtons
                  acceptClicked={onHandleAcceptClicked}
                  rejectClicked={onHandleRejectClicked}
                />
              </FollowerResponse>
            )}
            <Content
              marginLeft={contentMarginLeft}
              marginRight={contentMarginRight}
            >
              <SubjectTags>
                <Subject
                  archived={isArchivedList}
                  completed={isCompletedMainList}
                  important={task.isImportant}
                  description={isDescription}
                >
                  <Linkify properties={{ target: '_blank' }}>
                    {task.subject}
                  </Linkify>
                </Subject>
                <Tags>
                  <TaskListTagItems
                    tags={sortedTags}
                    parentWidth={taskItemWidth}
                    isCompleted={isCompletedMainList}
                    onTagClick={onHandleTagClicked}
                  />
                </Tags>
              </SubjectTags>
              <DescriptionDueDate>
                {task.attachmentsCount > 0  && (
                  <DueDate
                    title={`Number of attachments - ${task.attachmentsCount}`}
                    completed={isCompletedMainList}
                  >
                    <DueDateIcon
                      icon={ICONS.PIN}
                      color={[colors.astrocopusGrey]}
                      width={9}
                      height={10}
                      scale={0.4}
                    />
                    {task.attachmentsCount}
                  </DueDate>
                )}
                {task.commentsCount > 0  && (
                  <DueDate
                    title={`Number of comments - ${task.commentsCount}`}
                    completed={isCompletedMainList}
                  >
                    <DueDateIcon
                      icon={ICONS.COMMENT_FILL}
                      color={[colors.astrocopusGrey]}
                      width={10}
                      height={9}
                      scale={0.7}
                    />
                    {task.commentsCount}
                  </DueDate>
                )}
                {task.reminderDate !== null && (
                  <DueDate
                    title={`Reminder Date - ${reminderDateFormat}`}
                    completed={isCompletedMainList}
                  >
                    <DueDateIcon
                      icon={ICONS.REMINDER_DATE}
                      color={[colors.astrocopusGrey]}
                      width={10}
                      height={9}
                      scale={0.7}
                    />
                    {reminderDateFormat}
                  </DueDate>
                )}
                {task.dueDate != null && (
                  <DueDate
                    title={`Due Date - ${fromNow}`}
                    overdue={moment(dueDate) < now && !isArchivedList}
                    completed={isCompletedMainList}
                  >
                    <DueDateIcon
                      icon={ICONS.DUE_DATE}
                      color={[colors.astrocopusGrey]}
                      width={9}
                      height={9}
                      scale={0.7}
                    />
                    {dueDateFormat}
                  </DueDate>
                )}
              </DescriptionDueDate>
            </Content>
            {isFollowers && (
              <Followers
                assigneeInbox={isInboxList || !isOwner}
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
                  assigneeInbox={isInboxList || !isOwner}
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
                  animation
                />
              </Followers>
            )}
          </TaskItem>
        </motion.div>
      )}
    </li>
  )
}

TaskListItem.propTypes = {
  // Data
  userId: PropTypes.string,
  task: PropTypes.object,
  noTaskFound: PropTypes.bool,
  listType: PropTypes.string,
  selectedTags: PropTypes.object,
  isSelected: PropTypes.bool,
  isDragAndDropActive: PropTypes.bool,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,
  index: PropTypes.number,

  // Handlers
  onClick: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onCompleteClick: PropTypes.func,
  moveTask: PropTypes.func,
  dropTask: PropTypes.func,
  onTagClick: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  acceptTask: PropTypes.func,
  rejectTask: PropTypes.func,
  prepareToggleDragAndDrop: PropTypes.func,
  setDraggingTask: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setTaskTags,
}

const areEqual = (prev, next) => {
  const areTaskEqual = _.isEqual(prev.task.toJS(), next.task.toJS())

  const isEqual =
    areTaskEqual &&
    prev.index === next.index &&
    prev.updatedAt === next.updatedAt &&
    prev.isSelected === next.isSelected &&
    prev.windowWidth === next.windowWidth

  return isEqual
}

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(TaskListItem),
  areEqual,
)
