import { useRef, useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import includes from 'lodash/includes'

// toast notification
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// utils
import constants from 'utils/constants'
import {
  DragType,
  TaskDropTarget,
  TreeItemType,
  TreeItemPosition,
} from 'utils/enums'

const useTreeItemDragDrop = ({ treeItem, parents, tags, contacts, onDrop }) => {
  // Not move a dragged contact
  // if dropped item has one of parents of a contact type
  // or dropped item is an other contact
  const getCurrentDropPosition = (dragSource, dropPosition) => {
    if (
      !_.isEmpty(contacts) &&
      dragSource.treeItemType === TreeItemType.CONTACT
    ) {
      if (dropPosition === TreeItemPosition.MIDDLE) {
        return null
      }

      return contacts.length === 1 &&
        contacts[0] === (treeItem.fromUserId || treeItem.toUserId)
        ? dropPosition
        : null
    }

    return dropPosition
  }
  // Keeps reference to drop DOM element
  const dropTarget = useRef()

  // Current drop position
  const [dropPosition, setDropPosition] = useState()

  // Tree item drag
  const [dragProps, drag] = useDrag({
    item: {
      id: treeItem.id,
      type: DragType.TREE_ITEM,
      treeItemType: treeItem.tagId ? TreeItemType.TAG : TreeItemType.CONTACT,
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
    },
  })

  // Tree item drop
  const [dropProps, drop] = useDrop({
    accept: [DragType.TREE_ITEM, DragType.TASK],
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    canDrop: dragSource => {
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
    hover(dragSource, monitor) {
      // Not move a task into a contact
      if (dragSource.type === DragType.TASK && !treeItem.tagId) {
        return
      }

      // Cannot drop
      const canDrop = monitor.canDrop()
      if (!canDrop) {
        setDropPosition(null)
        return
      }

      const hoverBoundingRect = findDOMNode(
        dropTarget.current
      ).getBoundingClientRect()
      const thirdHeight = treeItem.parentId
        ? constants.TAG_TREE_ITEM_HEIGHT / 3
        : constants.TAG_TREE_SECTION_HEIGHT / 3

      // Current position of mouse
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      let currentDropPosition = TreeItemPosition.MIDDLE
      if (dragSource.type === DragType.TREE_ITEM) {
        if (hoverClientY < thirdHeight) {
          currentDropPosition = getCurrentDropPosition(
            dragSource,
            TreeItemPosition.TOP
          )
        } else if (hoverClientY < 2 * thirdHeight) {
          currentDropPosition = getCurrentDropPosition(
            dragSource,
            TreeItemPosition.MIDDLE
          )

          if (currentDropPosition === null) {
            return
          }
        } else {
          currentDropPosition = getCurrentDropPosition(
            dragSource,
            TreeItemPosition.BOTTOM
          )
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
        // Not drop task on a contact type item
        if (!treeItem.tagId) {
          toast.info(toastCommon.infoMessages.treeItems.canDropTaskOnTagOnly, {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.INFO_DURATION,
          })

          return
        }

        return {
          target: TaskDropTarget.TAG_TREE,
          item,
          tags,
        }
      }

      return null
    },
  })

  const attachDrop = useCallback(domElement => {
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

export { useTreeItemDragDrop }
