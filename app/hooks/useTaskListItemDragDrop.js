import { useRef, useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { getAssigneeOfTask } from 'redux/utils/component-helper'
import moment from 'moment'

const DropTypes = {
  TASK: 'task',
}

const useTaskListItemDragDrop = (props) => {

  // Keeps reference to drop DOM element
  const dropTarget = useRef()

  // Tree item drag
  const [dragProps, drag] = useDrag({
    item: {
      type: DropTypes.TASK,
      listType: props.listType,
      task: props.task,
      index: props.index,
      section: props.section,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
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
  })

  // Tree item drop
  const [dropProps, drop] = useDrop({
    accept: DropTypes.TASK,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    canDrop: (dragSource) => {
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

      const sourceList = dragSource.listType
      const targetList = props.listType
      return sourceList === targetList
    },
    hover(item, monitor) {
      const canDrop = monitor.canDrop()
      if (!canDrop) {
        return
      }

      const dragSource = monitor.getItem()
      const dragIndex = dragSource.index
      const hoverIndex = props.index

      // console.log('Hover', dragIndex, hoverIndex)

      // Drag index didn't change, do nothing
      if (dragSource.section === props.section && dragIndex === hoverIndex) {
        return
      }

      // Get size of target component
      const hoverBoundingRect = findDOMNode(dropTarget.current).getBoundingClientRect()
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
    drop(item) {
      props.dropTask({
        dropTask: item.task,
        targetSection: props.section,
      })
    }
  })

  const attachDrop = useCallback((domElement) => {
    drop(domElement)
    drag(domElement)
    dropTarget.current = domElement
  })

  return {
    dragDropHandle: attachDrop,
    dragProps,
    dropProps,
  }
}

export {
  useTaskListItemDragDrop
}
