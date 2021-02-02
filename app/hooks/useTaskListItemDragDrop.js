import { useRef, useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import moment from 'moment'
import { DragType, TaskDropTarget, TagsUpdateStrategy } from 'utils/enums'

// toast notification
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

const useTaskListItemDragDrop = props => {
  // Keeps reference to drop DOM element
  const dropTarget = useRef()

  // Tree item drag
  const [dragProps, drag] = useDrag({
    item: {
      type: DragType.TASK,
      listType: props.listType,
      task: props.task,
      index: props.index,
      section: props.section,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      const { sort } = props
      const { alphabet, important, incomplete } = sort

      const isSort = alphabet || important || incomplete
      const isMainList =
        props.listType !== 'archived' && props.listType !== 'inbox'

      return !isSort && isMainList
    },
    begin: () => {
      props.setDraggingTask(props.task)
      props.prepareToggleDragAndDrop(true)
    },
    end: (item, monitor) => {
      props.prepareToggleDragAndDrop(false)
      const dropResult = monitor.getDropResult()

      if (!dropResult) {
        props.dropTask({
          dropTask: item.task,
          targetSection: item.section,
        })

        return
      }

      if (dropResult.target === TaskDropTarget.TASK_LIST) {
        props.dropTask({
          dropTask: dropResult.item.task,
          targetSection: dropResult.item.section,
        })
      }

      if (dropResult.target === TaskDropTarget.TAG_TREE) {
        // tree-item target isn't a tag (it's a contact) => show notification "can drop task on tag only"
        if (dropResult.tags.length === 0) {
          toast.info(toastCommon.infoMessages.treeItems.canDropTaskOnTagOnly, {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.INFO_DURATION,
          })
        }

        const strategy =
          dropResult.dropEffect === 'copy'
            ? TagsUpdateStrategy.OVERRIDE
            : TagsUpdateStrategy.MERGE
        props.setTaskTags(dropResult.item.task.id, dropResult.tags, strategy)
      }
    },
  })

  // Tree item drop
  const [dropProps, drop] = useDrop({
    accept: DragType.TASK,
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    canDrop: dragSource => {
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

      // Drag index didn't change, do nothing
      if (dragSource.section === props.section && dragIndex === hoverIndex) {
        return
      }

      // Get size of target component
      const hoverBoundingRect = findDOMNode(
        dropTarget.current
      ).getBoundingClientRect()
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
      return {
        target: TaskDropTarget.TASK_LIST,
        item,
      }
    },
  })

  const attachDrop = useCallback(domElement => {
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

export { useTaskListItemDragDrop }
