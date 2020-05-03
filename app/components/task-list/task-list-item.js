import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import moment from 'moment'
import removeMd from 'remove-markdown'
import { markdownToHTML } from '../../redux/utils/component-helper'

// hooks
import { useTaskListItemDragDrop } from 'hooks/useTaskListItemDragDrop'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import dateUtils from 'redux/utils/date'
import {
  getAssigneeOfTask,
  getSortedTags,
  isStringEmpty,
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
  Description,
  DueDate,
  Followers,
} from './styles'

// TaskListItem
const TaskListItem = (props) => {
  const {
    userId,
    task,
    isSelected,
    noTaskFound,
    listType,
    selectedTags,
    leftPanelWidth,
    windowWidth,
  } = props

  const [isInitialMount, setIsInitialMount] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  const { dragDropHandle, dragProps } = useTaskListItemDragDrop(props)

  useEffect(() => {
    // Wait for initial animation
    window.setTimeout(() => setIsInitialMount(false), 400)
  }, [])

  const onHandleMouseDown = (event) => {
    const { isCompleted } = props.task
    const isInboxList = props.listType === 'inbox'

    // allowed only right mouse button
    if (event.button !== 2) {
      return
    }

    // set task as important by right mouse
    if (!isCompleted && !isInboxList) {
      props.onToggleImportant(props.task)
      return
    }
  }

  const onHandleClicked = (event) => {
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
  }

  const onHandleTagClicked = (tag) => props.onTagClick(tag)

  const onHandleCompleteClicked = () => {
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
  }

  const onHandleArchiveClicked = () => {
    // allowed left mouse button
    if (props.listType === 'archived') {
      window.setTimeout(() => props.cancelArchiveTasks(props.task.id), 400)
      setIsMounted(false)
      return
    }

    window.setTimeout(() => props.setArchiveTasks(props.task.id), 400)
    setIsMounted(false)
  }

  const onHandleAcceptClicked = () => {
    const { id, followers } = props.task
    const assignee = getAssigneeOfTask(followers)
    const data = {
      taskId: id,
      followerId: assignee.id,
    }

    window.setTimeout(() => props.acceptTask(data), 400)
    setIsMounted(false)
  }

  const onHandleRejectClicked = () => {
    const data = {
      task,
      type: listType,
    }

    window.setTimeout(() => props.rejectTask(data), 400)
    setIsMounted(false)
  }

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
  const sortedTags = getSortedTags(task.tags, selectedTags)

  // Data of assignee
  const assignee = getAssigneeOfTask(task.followers)
  const isFollowers = assignee !== null
  const followerStatus = isFollowers ? assignee.status : 'new'
  const isOwnerAccepted = isOwner && followerStatus === 'accepted'

  // Date from dueDate
  const now = moment()
  const dueDate = task.dueDate
  const dueDateFormat = dateUtils.formatDate(dueDate)
  const fromNow = task.dueDate ? moment(dueDate).fromNow() : ''

  // Description
  let description = isDescription ? task.description : ''
  description = markdownToHTML(description)
  const indexOfBr = description.indexOf('br />')
  const indexOfEndHtmlTag = description.indexOf('</')

  if (indexOfBr !== -1 && indexOfBr < indexOfEndHtmlTag) {
    description = description.substr(0, description.indexOf('br />') + 5)
  } else {
    description = description.substr(0, description.indexOf('</'))
  }

  description = removeMd(description)
  description =
    description.length > 88 ? description.substr(0, 87) : description

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
        <TaskItem
          key={task.id}
          tabIndex="-1"
          data-item-id={task.id}
          onMouseDown={onHandleMouseDown}
          onClick={onHandleClicked}
          active={task.active}
          selected={isSelected}
          backgroundColor={backgroundColor}
          completed={isCompletedMainList}
          dragging={dragProps.isDragging}
          isMounted={isMounted}
          animationEnabled={isInitialMount}
        >
          {!isArchivedList && !isInboxList && (
            <Completed
              completed={task.isCompleted}
              onClick={(e) => {
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
              />
            </Completed>
          )}
          {task.isCompleted && !isInboxList && (
            <Archived
              archived={isArchivedList}
              onClick={(e) => {
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
              {isDescription && (
                <Description completed={isCompletedMainList}>
                  {description}
                </Description>
              )}
              <DueDate
                title={fromNow}
                overdue={moment(dueDate) < now && !isArchivedList}
                completed={isCompletedMainList}
                description={isDescription}
              >
                {dueDateFormat}
              </DueDate>
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
  timeLine: PropTypes.bool,
  section: PropTypes.string,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,
  index: PropTypes.number,
  isMoving: PropTypes.bool,

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
  setIsMoving: PropTypes.func,
}

export default TaskListItem
