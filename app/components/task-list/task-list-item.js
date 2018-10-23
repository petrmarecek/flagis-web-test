import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { compose, shouldUpdate, withHandlers } from 'recompose'
import { findDOMNode } from 'react-dom'
import moment from 'moment'
import removeMd from 'remove-markdown'

import dateUtils from 'redux/utils/date'
import { getAssigneeOfTask, getSortedTags } from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import TaskListTagItems from './task-list-tag-items'
import FollowerIcon from '../common/follower-icon'

import {
  TaskItem,
  Completed,
  Archived,
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
  TASK: 'task'
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
    const { alphabet, important, incomplete } = props.sort
    return !alphabet
      && !important
      && !incomplete
      && props.listType !== 'archived'
      && props.listType !== 'inbox'
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
      const dayToNewWeek = (7 - dayOfWeek) + 1
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
    if ((dragSource.section === props.section) && (dragIndex === hoverIndex)) {
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
      direction: dragIndex < hoverIndex ? 'DOWN' : 'UP',
    }

    props.moveTask(move)
    // Set index and section
    if ((dragSource.section !== props.section) && (hoverClientY > hoverMiddleY)) {
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
  }
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
    task,
    isSelected,
    isDragging,
    noTaskFound,
    listType,
    selectedTags,
    leftPanelWidth,
    windowWidth,
    onHandleClicked,
    onHandleTagClicked,
    onHandleCompleteClicked,
    onHandleArchiveClicked,
    connectDragSource,
    connectDropTarget,
  } = props

  // Conditions
  const isArchivedList = listType === 'archived'
  const isCompletedMainList = task.isCompleted && !isArchivedList
  const isDescription = task.description !== ''

  // Sorted tags
  const sortedTags = getSortedTags(task.tags, selectedTags)

  // Data of assignee
  const assignee = getAssigneeOfTask(task.followers)
  const isFollowers = assignee !== null
  const followerStatus = isFollowers ? assignee.status : 'new'

  // Date from dueDate
  const now = moment()
  const dueDate = task.dueDate
  const dueDateFormat = dateUtils.formatDate(dueDate)
  const fromNow = task.dueDate ? moment(dueDate).fromNow() : ''

  // Description
  let description = isDescription ? task.description : ''
  description = removeMd(description)

  // Task-Item width
  const taskItemWidth = windowWidth - leftPanelWidth - 20

  // Background color of task item
  const backgroundColor = () => {
    if (isSelected) {
      return '#ffffd7'
    }

    if (isDragging) {
      return '#f6f7f8'
    }

    if (isArchivedList) {
      return '#c1cad0'
    }

    return '#fff'
  }

  // Render component
  return connectDragSource(connectDropTarget(
    <div>
      {noTaskFound &&
      <li className="empty-list">No task found</li>}

      {!noTaskFound &&
      <TaskItem
        key={task.id}
        tabIndex="-1"
        data-item-id={task.id}
        onClick={onHandleClicked}
        active={task.active}
        selected={isSelected}
        backgroundColor={backgroundColor}
        completed={isCompletedMainList}
        dragging={isDragging}>
        {!isArchivedList &&
        <Completed
          icon={ICONS.TASK_CHECKED}
          color={task.isCompleted ? ['#c2fee5'] : ['#D7E3EC']}
          hoverColor={["#00FFC7"]}
          width={22}
          height={21}
          onClick={onHandleCompleteClicked} />}
        {task.isCompleted &&
        <Archived
          icon={isArchivedList ? ICONS.NON_ARCHIVE : ICONS.ARCHIVE}
          color={isArchivedList ? ['#282f34'] : ['#8c9ea9']}
          width={24}
          height={27}
          scale={0.926}
          onClick={onHandleArchiveClicked}
          animation={!task.isCompleted ? null : {
            action: 'transition.expandIn',
            duration: 1000,
          }} 
          archived={isArchivedList} />}
        <Content
          completed={isCompletedMainList}
          followers={isFollowers}>
          <SubjectTags>
            <Subject
              archived={isArchivedList}
              completed={isCompletedMainList}
              important={task.isImportant}
              description={isDescription}>{task.subject}</Subject>
            <Tags>
              <TaskListTagItems
                tags={sortedTags}
                parentWidth={taskItemWidth}
                onTagClick={onHandleTagClicked} />
            </Tags>
          </SubjectTags>
          <DescriptionDueDate>
            {isDescription &&
            <Description completed={isCompletedMainList}>{description}</Description>}
            <DueDate
              title={fromNow}
              overdue={moment(dueDate) < now && !isArchivedList}
              completed={isCompletedMainList}
              description={isDescription}>{dueDateFormat}</DueDate>
          </DescriptionDueDate>
        </Content>
        {isFollowers &&
        <Followers>
          <FollowerIcon status={followerStatus} />
        </Followers>}
      </TaskItem>}
    </div>
  ))
}

TaskItem.propTypes = {
  // Data
  task: PropTypes.object,
  noTaskFound: PropTypes.bool,
  listType: PropTypes.string,
  isSelected: PropTypes.bool,
  section: PropTypes.string,
  isDragging: PropTypes.bool,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,

  // Handlers
  onClick: PropTypes.func,
  onCompleteClick: PropTypes.func,
  moveTask: PropTypes.func,
  dropTask: PropTypes.func,
  onTagClick: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  onHandleClicked: PropTypes.func,
  onHandleTagClicked: PropTypes.func,
  onHandleCompleteClicked: PropTypes.func,
  onHandleArchiveClicked: PropTypes.func,

  // Drag and Drop
  connectDropTarget: PropTypes.func,
  connectDragSource: PropTypes.func,
}

const checkPropsChange = (props, nextProps) => {
  // props
  const { task, isSelected, isDragging, windowWidth } = props

  // nextProps
  const nextTask = nextProps.task
  const nextIsSelected = nextProps.isSelected
  const nextIsDragging = nextProps.isDragging
  const nextWindowWidth = nextProps.windowWidth

  return (task.size >= 2 ? !task.equals(nextTask) : task === nextTask)
    || (isSelected !== nextIsSelected)
    || (isDragging !== nextIsDragging)
    || (windowWidth !== nextWindowWidth)
}

export default DragSource(ItemTypes.TASK, taskSource, collectDragSource)(
  compose(
    DropTarget(ItemTypes.TASK, taskTarget, collectDropTarget),
    withHandlers({
      onHandleClicked: props => event => props.onClick(props.task, event),
      onHandleTagClicked: props => tag => props.onTagClick(tag),
      onHandleCompleteClicked: props => event => {
        event.stopPropagation()

        if (props.listType === 'archived') {
          return
        }

        props.onCompleteClick(props.task)
      },
      onHandleArchiveClicked: props => event => {
        event.stopPropagation()

        if (props.listType === 'archived') {
          props.cancelArchiveTasks(props.task.id)
          return
        }

        props.setArchiveTasks(props.task.id)
      },
    }),
    shouldUpdate(checkPropsChange)
  )(TaskListItem)
)
