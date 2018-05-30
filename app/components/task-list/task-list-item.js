import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import moment from 'moment'
import velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import dateUtils from 'redux/utils/date'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import TaskListItemTag from 'components/task-list/task-list-item-tag'

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

class TaskListItem extends PureComponent {

  static propTypes = {
    onClick: PropTypes.func,
    onCompleteClick: PropTypes.func,
    isSelected: PropTypes.bool,
    isDragging: PropTypes.bool,
    sort: PropTypes.object,
    task: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired,
    dropTask: PropTypes.func.isRequired,
    onTagClick: PropTypes.func,
    listType: PropTypes.string.isRequired,
    setArchiveTasks: PropTypes.func,
    cancelArchiveTasks: PropTypes.func,
    section: PropTypes.string,
    noTaskFound: PropTypes.bool,
  }

  state = {
    animation: false
  }

  constructor(props) {
    super(props)
    this.sortedTags = this.getSortedTags(props)
  }

  componentDidMount() {
    if (!this.props.noTaskFound) {
      velocity(this.refs.elem, 'transition.slideUpIn', { duration: 400 })
    }
  }

  componentWillReceiveProps(newProps) {
    this.sortedTags = this.getSortedTags(newProps)
    this.setState({ animation: newProps.task.isCompleted })
  }

  handleClicked = event => {
    this.refs.elem.focus()
    this.props.onClick(this.props.task, event)
  }

  handleCompleteClicked = event => {
    event.stopPropagation()

    if (this.props.listType === 'archived') {
      return
    }

    this.props.onCompleteClick(this.props.task)
  }

  handleArchiveClicked = event => {
    event.stopPropagation()

    if (this.props.listType === 'archived') {
      this.props.cancelArchiveTasks(this.props.task.id)
      return
    }

    this.props.setArchiveTasks(this.props.task.id)
  }

  getSortedTags(props) {
    if (this.props.noTaskFound) {
      return []
    }

    const orderedTagIds = props.task.tags.sort(TaskListItem.compareTagByTitle).map(tag => tag.id)
    const tagsById = props.task.tags.reduce((acc, tag) => {
      acc[tag.id] = tag
      return acc
    }, {})

    const result = []

    // First, put selected tags
    props.selectedTags.reverse().forEach(tagId => {

      // Do not add this tag if it is not present on the task
      // (e.g. when we delete that tag, but list of tasks is
      // not yet updated)
      if (!tagsById.hasOwnProperty(tagId)) {
        return
      }

      result.push(tagsById[tagId])
    })

    // Second, add others
    orderedTagIds.forEach(tagId => {

      // Skip those that are already added
      if (props.selectedTags.includes(tagId)) {
        return
      }

      result.push(tagsById[tagId])
    })

    return result
  }

  static compareTagByTitle(tagA, tagB) {
    if (tagA.title > tagB.title) {
      return 1
    } else if (tagA.title < tagB.title) {
      return -1
    } else {
      return 0
    }
  }

  getArchiveIcon() {
    const iconsArchive = this.props.listType === 'archived'
      ? ICONS.NON_ARCHIVE
      : ICONS.ARCHIVE

    const isArchivedTaskColor = this.props.listType === 'archived'
      ? '#282f34'
      : '#8c9ea9'

    const iconAnimation = {
      action: 'transition.expandIn',
      duration: 1000,
    }

    return this.state.animation === true
      ? (<Icon
        className="task-item__archive"
        icon={iconsArchive}
        color={isArchivedTaskColor}
        width={24}
        height={27}
        scale={0.926}
        animation={iconAnimation}
        onClick={this.handleArchiveClicked}/>)
      : (<Icon
        className="task-item__archive"
        icon={iconsArchive}
        color={isArchivedTaskColor}
        width={24}
        height={27}
        scale={0.926}
        onClick={this.handleArchiveClicked}/>)
  }

  render() {

    // child tags
    const tags = this.sortedTags.map(tag => (
      <TaskListItemTag
        key={tag.id}
        className="tag"
        model={tag}
        onClick={this.props.onTagClick}
        listType={this.props.listType} />
    ))

    const now = moment()
    const dueDate = this.props.task.dueDate
    const dueDateFormat = dateUtils.formatDate(dueDate)
    const fromNow = this.props.task.dueDate ? moment(dueDate).fromNow() : ''
    const description = this.props.task.description === null ? '' : this.props.task.description

    // init classes
    const taskListItemClasses = classnames({
      'task-item': true,
      'archived': this.props.listType === 'archived',
      'active': this.props.task.active,
      'selected': this.props.isSelected,
      'completed': this.props.task.isCompleted && this.props.listType !== 'archived',
      'important': this.props.task.isImportant,
      'due-date': dueDate !== null,
    })

    const isCompletedTaskColor = this.props.task.isCompleted
      ? '#c2fee5'
      : '#D7E3EC'

    const archiveIcon = this.getArchiveIcon()

    const subjectDescriptionClass = classnames({
      'task-item__subject': true,
      'task-item__subject--description': this.props.task.description
    })

    const dueDateClass = classnames({
      'task-item__due-date': true,
      'task-item__due-date--overdue': moment(dueDate) < now && this.props.listType !== 'archived',
    })

    // render component
    const { connectDragSource, connectDropTarget, isDragging } = this.props
    const visibility = isDragging ? 'hidden' : ''

    return connectDragSource(connectDropTarget(
      <div>
        {this.props.noTaskFound &&
        <li className="empty-list">No task found</li>}

        {!this.props.noTaskFound &&
        <li
          key={this.props.task.id}
          tabIndex="-1"
          className={taskListItemClasses}
          data-item-id={this.props.task.id}
          onClick={this.handleClicked}
          style={{ visibility }}
          ref="elem" >
          {this.props.listType !== 'archived' &&
          <Icon
            className="task-item__completed"
            icon={ICONS.TASK_CHECKED}
            color={isCompletedTaskColor}
            hoverColor="#00FFC7"
            width={22}
            height={21}
            onClick={this.handleCompleteClicked}/>}
          {this.props.task.isCompleted && archiveIcon}
          <div className="task-item__wrapper">
            <div className={subjectDescriptionClass}>{this.props.task.subject}</div>
            {this.props.task.description &&
            <div className="task-item__description">
              {description}
            </div>}
            <div className="task-item__tags">
              {tags}
            </div>
            <div className={dueDateClass} title={fromNow}>{dueDateFormat}</div>
          </div>
        </li>}
      </div>
    ))
  }
}

export default
  DragSource(ItemTypes.TASK, taskSource, collectDragSource)(
    DropTarget(ItemTypes.TASK, taskTarget, collectDropTarget)(
      TaskListItem
    )
  )
