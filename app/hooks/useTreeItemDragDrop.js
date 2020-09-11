import { useRef, useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import includes from 'lodash/includes'
import constants from 'utils/constants'
import { DragType, TaskDropTarget } from 'utils/enums'

const useTreeItemDragDrop = ({ treeItem, parents, tags, onDrop }) => {

  // Keeps reference to drop DOM element
  const dropTarget = useRef()

  // Current drop position
  const [dropPosition, setDropPosition] = useState()

  // Tree item drag
  const [dragProps, drag] = useDrag({
    item: {
      id: treeItem.id,
      type: DragType.TREE_ITEM,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (!dropResult) {
        return
      }

      onDrop(dropResult)
    }
  })

  // Tree item drop
  const [dropProps, drop] = useDrop({
    accept: [DragType.TREE_ITEM, DragType.TASK],
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    canDrop: (dragSource) => {
      // Not section
      if (!treeItem.parentId) {
        return false
      }

      // Not self
      if (treeItem.id === dragSource.id) {
        return false
      }

      // Not my child (check whether drop target is not on of children of drag source)
      if (includes(parents, dragSource.id)) {
        return false
      }

      return Boolean(treeItem.parentId)
    },
    hover(item, monitor) {
      const canDrop = monitor.canDrop()
      if (!canDrop) {
        setDropPosition(null)
        return
      }

      const hoverBoundingRect = findDOMNode(dropTarget.current).getBoundingClientRect()
      const thirdHeight = treeItem.parentId
        ? constants.TAG_TREE_ITEM_HEIGHT / 3
        : constants.TAG_TREE_SECTION_HEIGHT / 3

      // Current position of mouse
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      let currentDropPosition = 'MIDDLE'
      if (item.type === DragType.TREE_ITEM) {
        if (hoverClientY < thirdHeight) {
          currentDropPosition = 'TOP'
        } else if (hoverClientY < 2 * thirdHeight) {
          currentDropPosition = 'MIDDLE'
        } else {
          currentDropPosition = 'BOTTOM'
        }
      }

      setDropPosition(currentDropPosition)
    },
    drop(item) {
      if (item.type === DragType.TREE_ITEM) {
        return {
          dragSource: item,
          dragTarget: treeItem,
          dropPosition,
        }
      }

      if (item.type === DragType.TASK) {
        return {
          target: TaskDropTarget.TAG_TREE,
          item,
          tags,
        }
      }

      return null
    }
  })

  const attachDrop = useCallback((domElement) => {
    drop(domElement)
    dropTarget.current = domElement
  })

  return {
    dragHandle: drag,
    dragProps,
    dropHandle: attachDrop,
    dropProps,
    dropPosition,
  }
}

export {
  useTreeItemDragDrop
}