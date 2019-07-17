import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { compose, shouldUpdate, withStateHandlers } from 'recompose'
import { findDOMNode } from 'react-dom'
import Linkify from 'react-linkify'
import moment from 'moment'
import removeMd from 'remove-markdown'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import { markdownToHTML } from '../../redux/utils/component-helper'

import dateUtils from 'redux/utils/date'
import {
  getAssigneeOfTask,
  getSortedTags,
  isStringEmpty,
} from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from '../icons/icon'
import FollowerResponseButtons from '../common/follower-response-buttons'
import TaskListTagItems from './task-list-tag-items'
import FollowerIcon from '../common/follower-icon'

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

// Drag and Drop
const ItemTypes = {
  TASK: 'task',
}

const taskSource = {
  beginDrag(props) {
    return {
      listType: props.listType,
      task: props.task,
      index: props.index,
      section: props.section,
    }
  },

  isDragging(props, monitor) {
    return monitor.getItem().task.id === props.task.id
  },

  canDrag(props) {
    const { task, timeLine, sort } = props
    const { followers, isCompleted } = task
    const { alphabet, important, incomplete } = sort
    const assignee = getAssigneeOfTask(followers)
    const isFollowers = assignee !== null
    const followerStatus = isFollowers ? assignee.status : 'new'
    const isCollaborated =
      followerStatus === 'pending' || followerStatus === 'accepted'
    const isSort = alphabet || important || incomplete
    const isMainList =
      props.listType !== 'archived' && props.listType !== 'inbox'
    const isLock = isCollaborated || isCompleted
    const isLockForTimeline = timeLine && isLock

    return !isSort && isMainList && !isLockForTimeline
  },
}

const taskTarget = {
  canDrop(props, monitor) {
    // No task for this week
    if (props.section === 'weekTasks') {
      const now = moment()
      const dayOfWeek = now.isoWeekday()

      if (dayOfWeek >= 6) {
        return false
      }
    }

    // No task for this month
    if (props.section === 'monthTasks') {
      const now = moment()
      const date = now.date()
      const dayOfMonth = now.daysInMonth()
      const diff = dayOfMonth - date

      if (diff <= 1) {
        return false
      }

      const dayOfWeek = now.isoWeekday()
      const dayToNewWeek = 8 - dayOfWeek
      const add = date + dayToNewWeek
      if (add > dayOfMonth) {
        return false
      }
    }

    const sourceList = monitor.getItem().listType
    const targetList = props.listType
    return sourceList === targetList
  },

  hover(props, monitor, component) {
    const canDrop = monitor.canDrop()
    if (!canDrop) {
      return
    }

    const dragSource = monitor.getItem()
    const dragIndex = dragSource.index
    const hoverIndex = props.index

    // Drag index didn't change, do nothing
    if (dragSource.section === props.section && dragIndex === hoverIndex) {
      return
    }

    // Get size of target component
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    // Height of task / 2 = 25
    const hoverMiddleY = hoverBoundingRect.height / 2
    // Current position of mouse
    const clientOffset = monitor.getClientOffset()
    // Get position of mouse on task
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Dragging downwards (not yet too far)
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards (not yet too far)
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Now we can perform move as the boundary has been crossed
    const dragDirection = dragIndex < hoverIndex ? 'DOWN' : 'UP'
    component.setState({ isMoved: dragDirection })
    const move = {
      source: props.listType,
      sourceTaskId: dragSource.task.id,
      sourceSection: dragSource.section,
      sourceDueDate: dragSource.task.dueDate,
      targetTaskId: props.task.id,
      targetSection: props.section,
      targetDueDate: props.task.dueDate,
      targetIndex: hoverIndex,
      bottom: hoverClientY > hoverMiddleY,
      direction: dragDirection,
    }

    props.moveTask(move)
    // Set index and section
    if (dragSource.section !== props.section && hoverClientY > hoverMiddleY) {
      // Dragging upwards to other section
      dragSource.index = hoverIndex + 1
    } else {
      // Dragging upwards in current section
      dragSource.index = hoverIndex
    }
    dragSource.section = props.section
  },

  drop(props, monitor) {
    const canDrop = monitor.canDrop()
    if (!canDrop) {
      return
    }

    const dragSource = monitor.getItem()
    const drop = {
      dropTask: dragSource.task,
      targetSection: props.section,
    }

    props.dropTask(drop)
  },
}

function collectDragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function collectDropTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

// TaskListItem
const TaskListItem = props => {
  const {
    userId,
    task,
    isSelected,
    isDragging,
    isMounted,
    isMoved,
    noTaskFound,
    listType,
    selectedTags,
    leftPanelWidth,
    windowWidth,
    onHandleClicked,
    onHandleTagClicked,
    onHandleCompleteClicked,
    onHandleArchiveClicked,
    onHandleAcceptClicked,
    onHandleRejectClicked,
    connectDragSource,
    connectDropTarget,
  } = props

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
      return '#ecfff7'
    }

    if (isDragging) {
      return '#f6f7f8'
    }

    if (isArchivedList) {
      return '#DBDBDB'
    }

    if (isOwnerAccepted) {
      return '#F6F7F8'
    }

    return '#fff'
  }

  // Background color of task item
  const completedIconColor = () => {
    if (task.isCompleted) {
      return ['#44FFB1']
    }

    if (isOwnerAccepted) {
      return ['#EBEBEB']
    }

    return ['#F4F4F4']
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
  return connectDragSource(
    connectDropTarget(
      <li>
        {noTaskFound ? (
          <EmptyList>No tasks found</EmptyList>
        ) : (
          <TaskItem
            key={task.id}
            tabIndex="-1"
            data-item-id={task.id}
            onMouseDown={onHandleClicked}
            active={task.active}
            selected={isSelected}
            backgroundColor={backgroundColor}
            completed={isCompletedMainList}
            dragging={isDragging}
            isMounted={isMounted}
            isMoved={isMoved}
          >
            {!isArchivedList && !isInboxList && (
              <Completed
                onMouseDown={e => {
                  e.stopPropagation()
                  onHandleCompleteClicked(e)
                }}
              >
                <Icon
                  icon={ICONS.TASK_CHECKED}
                  color={completedIconColor()}
                  width={22}
                  height={21}
                />
              </Completed>
            )}
            {task.isCompleted && !isInboxList && (
              <Archived
                archived={isArchivedList}
                onMouseDown={e => {
                  e.stopPropagation()
                  onHandleArchiveClicked(e)
                }}
              >
                <Icon
                  icon={isArchivedList ? ICONS.NON_ARCHIVE : ICONS.ARCHIVE}
                  color={['#B1B5B8']}
                  hoverColor={['#293034']}
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
  isDragging: PropTypes.bool,
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
  onHandleClicked: PropTypes.func,
  onHandleTagClicked: PropTypes.func,
  onHandleCompleteClicked: PropTypes.func,
  onHandleArchiveClicked: PropTypes.func,
  onHandleAcceptClicked: PropTypes.func,
  onHandleRejectClicked: PropTypes.func,

  // Drag and Drop
  connectDropTarget: PropTypes.func,
  connectDragSource: PropTypes.func,
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

export default DragSource(ItemTypes.TASK, taskSource, collectDragSource)(
  compose(
    DropTarget(ItemTypes.TASK, taskTarget, collectDropTarget),
    withStateHandlers(() => ({ isMoved: null, isMounted: true }), {
      onHandleClicked: (state, props) => event => {
        // middle mouse button
        if (event.button === 1) {
          return {}
        }

        const { isCompleted } = props.task
        const isInboxList = props.listType === 'inbox'
        const isMultiselect = event.ctrlKey || event.metaKey

        // Set task as important by right mouse
        if (event.button === 2) {
          if (!isCompleted && !isInboxList) {
            props.onToggleImportant(props.task)
            return {}
          }
          return {}
        }

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
      onHandleCompleteClicked: (state, props) => event => {
        event.stopPropagation()

        // allowed left mouse button
        if (event.button !== 0) {
          return {}
        }

        // Data of assignee
        const assignee = getAssigneeOfTask(props.task.followers)
        const isFollowers = assignee !== null
        const followerStatus = isFollowers ? assignee.status : 'new'

        if (followerStatus === 'pending') {
          toast.error(errorMessages.tasks.waitingResponse, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: constants.NOTIFICATION_ERROR_DURATION,
          })
          return {}
        }

        props.onCompleteClick(props.task)
        return {}
      },
      onHandleArchiveClicked: (state, props) => event => {
        // allowed left mouse button
        if (event.button !== 0) {
          return {}
        }

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
)
