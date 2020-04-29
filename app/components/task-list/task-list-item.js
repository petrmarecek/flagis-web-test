import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { compose, shouldUpdate, withStateHandlers } from 'recompose'
import { findDOMNode } from 'react-dom'
import Linkify from 'react-linkify'
import moment from 'moment'
import removeMd from 'remove-markdown'
import { markdownToHTML } from '../../redux/utils/component-helper'

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
import { useTaskListItemDragDrop } from 'hooks/useTaskListItemDragDrop'

// TaskListItem
const TaskListItem = props => {
  const {
    userId,
    task,
    isSelected,
    isMounted,
    isMoved,
    noTaskFound,
    listType,
    selectedTags,
    leftPanelWidth,
    windowWidth,
    onHandleMouseDown,
    onHandleClicked,
    onHandleTagClicked,
    onHandleCompleteClicked,
    onHandleArchiveClicked,
    onHandleAcceptClicked,
    onHandleRejectClicked,
  } = props

  const {
    dragDropHandle,
    dragProps,
  } = useTaskListItemDragDrop(props)

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
      return [colors.hanumanGreen, colors.hanumanGreen, colors.white]
    }

    if (isOwnerAccepted) {
      return [colors.crystalBell, colors.white, colors.crystalBell]
    }

    return [colors.crystalBell, colors.white, colors.crystalBell]
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
            isMoved={isMoved}
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
                  icon={ICONS.TASK_COMPLETED}
                  color={completedIconColor()}
                  width={21}
                  height={21}
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
  isMounted: PropTypes.bool,
  isMoved: PropTypes.string,
  listType: PropTypes.string,
  selectedTags: PropTypes.object,
  isSelected: PropTypes.bool,
  timeLine: PropTypes.bool,
  section: PropTypes.string,
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
  onHandleMouseDown: PropTypes.func,
  onHandleClicked: PropTypes.func,
  onHandleTagClicked: PropTypes.func,
  onHandleCompleteClicked: PropTypes.func,
  onHandleArchiveClicked: PropTypes.func,
  onHandleAcceptClicked: PropTypes.func,
  onHandleRejectClicked: PropTypes.func,
}

const checkPropsChange = (props, nextProps) => {
  // props
  const {
    task,
    isSelected,
    isDragging,
    isMounted,
    isMoved,
    windowWidth,
  } = props

  // nextProps
  const nextTask = nextProps.task
  const nextIsSelected = nextProps.isSelected
  const nextIsDragging = nextProps.isDragging
  const nextIsMounted = nextProps.isMounted
  const nextIsMoved = nextProps.isMoved
  const nextWindowWidth = nextProps.windowWidth

  return (
    (task.size >= 2 ? !task.equals(nextTask) : task === nextTask) ||
    isSelected !== nextIsSelected ||
    isDragging !== nextIsDragging ||
    isMounted !== nextIsMounted ||
    isMoved !== nextIsMoved ||
    windowWidth !== nextWindowWidth
  )
}

export default compose(
  withStateHandlers(() => ({ isMoved: null, isMounted: true }), {
    onHandleMouseDown: (state, props) => event => {
      const { isCompleted } = props.task
      const isInboxList = props.listType === 'inbox'

      // allowed only right mouse button
      if (event.button !== 2) {
        return {}
      }

      // set task as important by right mouse
      if (!isCompleted && !isInboxList) {
        props.onToggleImportant(props.task)
        return {}
      }

      return {}
    },
    onHandleClicked: (state, props) => event => {
      const isInboxList = props.listType === 'inbox'
      const isMultiselect = event.ctrlKey || event.metaKey
      // Not allowed multiselect in inbox list
      if (isMultiselect && isInboxList) {
        return {}
      }

      // Click on link
      if (event.target.nodeName === 'A') {
        return {}
      }

      props.onClick(props.task, event)
      return {}
    },
    onHandleTagClicked: (state, props) => tag => props.onTagClick(tag),
    onHandleCompleteClicked: (state, props) => () => {
      // Data of assignee
      const assignee = getAssigneeOfTask(props.task.followers)
      const isFollowers = assignee !== null
      const followerStatus = isFollowers ? assignee.status : 'new'

      if (followerStatus === 'pending') {
        toast.error(toastCommon.errorMessages.tasks.waitingResponse, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.ERROR_DURATION,
        })
        return {}
      }

      props.onCompleteClick(props.task)
      return {}
    },
    onHandleArchiveClicked: (state, props) => () => {
      // allowed left mouse button
      if (props.listType === 'archived') {
        window.setTimeout(() => props.cancelArchiveTasks(props.task.id), 400)
        return { isMounted: false, isMoved: null }
      }

      window.setTimeout(() => props.setArchiveTasks(props.task.id), 400)
      return { isMounted: false, isMoved: null }
    },
    onHandleAcceptClicked: (state, props) => () => {
      const { id, followers } = props.task
      const assignee = getAssigneeOfTask(followers)
      const data = {
        taskId: id,
        followerId: assignee.id,
      }

      window.setTimeout(() => props.acceptTask(data), 400)
      return { isMounted: false, isMoved: null }
    },
    onHandleRejectClicked: (state, props) => () => {
      const { task, listType } = props
      const data = {
        task,
        type: listType,
      }

      window.setTimeout(() => props.rejectTask(data), 400)
      return { isMounted: false, isMoved: null }
    },
  }),
  shouldUpdate(checkPropsChange)
)(TaskListItem)
