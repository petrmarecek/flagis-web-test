import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import includes from 'lodash/includes'
import constants from 'utils/constants'
import {
  compose,
  withStateHandlers,
  withHandlers,
  shouldUpdate,
} from 'recompose'

import {
  getColorIndex,
  getTagColor,
  getTagRelations,
} from 'redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import TreeItemList from 'components/tag-tree/tag-tree-items'

// styles
import {
  ItemWrapper,
  Item,
  ItemTagIcon,
  ItemTitle,
  ItemRelations,
  ItemIcons,
  ItemIcon,
  ItemChildren,
} from './styles'
import colors from 'components/styled-components-mixins/colors'

const TagTreeItemDragDrop = {
  type: 'tree-item',

  collectDragSource(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }
  },
  collectDropTarget(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }
  },

  taskSource: {
    beginDrag: props => ({
      treeItem: props.treeItem,
    }),
  },

  taskTarget: {
    canDrop(props, monitor) {
      // Not section
      if (!props.treeItem.parentId) {
        return false
      }

      // Not self
      const dragSource = monitor.getItem()
      if (props.treeItem.id === dragSource.treeItem.id) {
        return false
      }

      // Not my child (check wheter drop target is not on of children of drag source)
      if (includes(props.parents, dragSource.treeItem.id)) {
        return false
      }

      return Boolean(props.treeItem.parentId)
    },

    hover(props, monitor, component) {
      const canDrop = monitor.canDrop()

      if (!canDrop) {
        component.setState({ dropPosition: null })
        return
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
      const thirdHeight = props.treeItem.parentId
        ? constants.TAG_TREE_ITEM_HEIGHT / 3
        : constants.TAG_TREE_SECTION_HEIGHT / 3

      // Current position of mouse
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      let dropPosition = null
      if (hoverClientY < thirdHeight) {
        dropPosition = 'TOP'
      } else if (hoverClientY < 2 * thirdHeight) {
        dropPosition = 'MIDDLE'
      } else {
        dropPosition = 'BOTTOM'
      }

      component.setState({ dropPosition })
    },

    drop(props, monitor, component) {
      const dragSource = monitor.getItem().treeItem.toJS()
      const dragTarget = props.treeItem.toJS()
      const dropPosition = component.state.dropPosition

      props.onDrop({
        dragSource,
        dragTarget,
        dropPosition,
      })
    },
  },
}

const TagTreeItem = props => {
  const {
    // Data
    treeItem,
    parents,
    parentTagRelations,
    selection,
    tagsRelations,
    addControlParentId,
    isOver,
    isDragging,
    isHover,
    dropPosition,
    colorTheme,

    // Handlers
    onAddChild,
    onAddControlCancel,
    onDrop,
    onCollapse,
    onSubitemCreated,
    onTreeItemEdit,
    onTreeItemDelete,
    onHandleSetHover,
    onHandleUnsetHover,
    onHandleTreeItemSelected,
    onHandleClicked,
    onHandleCollapse,
    onHandleAddChildClicked,
    onHandleEditIconClicked,
    onHandleDeleteIconClicked,

    // Drag and Drop
    connectDragSource,
    connectDropTarget,
  } = props

  const isChildItems = treeItem.childItems.size > 0
  const itemParents = [...parents, treeItem.id]
  const tag = treeItem.tag
  const colorIndex = getColorIndex(tag.colorIndex, tag.title)
  const tagColor = getTagColor(colorIndex)

  const currentTagRelations = getTagRelations(
    tagsRelations,
    parentTagRelations,
    treeItem.tagId
  )

  const draggingData = {
    dragOver: isOver && dropPosition === 'MIDDLE',
    dragOverTop: isOver && dropPosition === 'TOP',
    dragOverBottom: isOver && dropPosition === 'BOTTOM',
  }

  const renderArrowIcon = children => {
    const title = treeItem.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0 ? (
      <ItemIcon
        title={title}
        iconMargin="0 6px 0 6px"
        animation
        collapsed={treeItem.collapsed}
      >
        <Icon
          icon={ICONS.ARROW_DOUBLE_DOWN}
          width={10}
          height={12}
          scale={0.85}
          color={[colors[colorTheme].tagTreeItemIcon]}
          onClick={onHandleCollapse}
        />
      </ItemIcon>
    ) : null
  }

  return connectDragSource(
    <li>
      <ItemWrapper dragging={isDragging}>
        {connectDropTarget(
          <div>
            <Item
              onClick={onHandleClicked}
              onMouseEnter={onHandleSetHover}
              onMouseLeave={onHandleUnsetHover}
              selected={selection.includes(treeItem.id)}
              colorTheme={colorTheme}
              {...draggingData}
            >
              <ItemTagIcon>
                <Icon
                  icon={isChildItems ? ICONS.TAG_MULTI : ICONS.TAG}
                  width={20}
                  height={12}
                  color={[tagColor]}
                />
              </ItemTagIcon>
              <ItemTitle>{treeItem.tag.title}</ItemTitle>
              {!isHover ? (
                <ItemRelations
                  selected={selection.includes(treeItem.id)}
                  colorTheme={colorTheme}
                >
                  {currentTagRelations.size}
                </ItemRelations>
              ) : (
                <ItemIcons>
                  {renderArrowIcon(treeItem.childItems)}
                  <ItemIcon title="Delete" iconMargin="0 4px 0 0">
                    <Icon
                      icon={ICONS.TRASH}
                      width={12}
                      height={13}
                      scale={0.5}
                      color={[colors[colorTheme].tagTreeItemIcon]}
                      hoverColor={[colors.trashHover]}
                      onClick={onHandleDeleteIconClicked}
                    />
                  </ItemIcon>
                  <ItemIcon title="Go to edit tag" iconMargin="0 10px 0 0">
                    <Icon
                      icon={ICONS.PENCIL}
                      width={11}
                      height={11}
                      scale={0.73}
                      color={[colors[colorTheme].tagTreeItemIcon]}
                      onClick={onHandleEditIconClicked}
                    />
                  </ItemIcon>
                  <ItemIcon title="Add sub filter" iconMargin="0 10px 0 0">
                    <Icon
                      icon={ICONS.PLUS}
                      width={12}
                      height={12}
                      scale={0.38}
                      color={[colors[colorTheme].tagTreeItemIcon]}
                      onClick={onHandleAddChildClicked}
                    />
                  </ItemIcon>
                </ItemIcons>
              )}
            </Item>
          </div>
        )}
        <ItemChildren collapsed={treeItem.collapsed}>
          <TreeItemList
            addControlParentId={addControlParentId}
            onAddChild={onAddChild}
            onAddControlCancel={onAddControlCancel}
            onCollapse={onCollapse}
            onDrop={onDrop}
            onSubitemCreated={onSubitemCreated}
            onSubmit={onSubitemCreated}
            onTreeItemEdit={onTreeItemEdit}
            onTreeItemDelete={onTreeItemDelete}
            onTreeItemSelected={onHandleTreeItemSelected}
            parents={itemParents}
            parentTagRelations={currentTagRelations}
            selection={selection}
            tagsRelations={tagsRelations}
            treeItem={treeItem}
            colorTheme={colorTheme}
          />
        </ItemChildren>
      </ItemWrapper>
    </li>
  )
}

TagTreeItem.propTypes = {
  // Data
  treeItem: PropTypes.object,
  parents: PropTypes.array.isRequired,
  parentTagRelations: PropTypes.object,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  addControlParentId: PropTypes.string,
  isOver: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isHover: PropTypes.bool,
  dropPosition: PropTypes.string,
  colorTheme: PropTypes.string,

  // Handlers
  onAddChild: PropTypes.func,
  onAddControlCancel: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onSubitemCreated: PropTypes.func,
  onTreeItemEdit: PropTypes.func,
  onTreeItemDelete: PropTypes.func,
  onTreeItemSelected: PropTypes.func,
  onHandleSetHover: PropTypes.func,
  onHandleUnsetHover: PropTypes.func,
  onHandleTreeItemSelected: PropTypes.func,
  onHandleClicked: PropTypes.func,
  onHandleCollapse: PropTypes.func,
  onHandleAddChildClicked: PropTypes.func,
  onHandleEditIconClicked: PropTypes.func,
  onHandleDeleteIconClicked: PropTypes.func,

  // Drag and Drop
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

const checkPropsChange = (props, nextProps) => {
  // props and state
  const {
    treeItem,
    selection,
    addControlParentId,
    isOver,
    tagsRelations,
    parentTagRelations,
    dropPosition,
    isHover,
  } = props
  const tagRelations = getTagRelations(
    tagsRelations,
    parentTagRelations,
    treeItem.tagId
  ).size

  // nextProps and nextState
  const nextTreeItem = nextProps.treeItem
  const nextSelection = nextProps.selection
  const nextAddControlParentId = nextProps.addControlParentId
  const nextIsOver = nextProps.isOver
  const nextTagsRelations = nextProps.tagsRelations
  const nextParentTagRelations = nextProps.parentTagRelations
  const nextDropPosition = nextProps.dropPosition
  const nextIsHover = nextProps.isHover
  const nextTagRelations = getTagRelations(
    nextTagsRelations,
    nextParentTagRelations,
    nextTreeItem.tagId
  ).size

  return (
    !treeItem.equals(nextTreeItem) ||
    isHover !== nextIsHover ||
    tagRelations !== nextTagRelations ||
    (dropPosition !== nextDropPosition || isOver !== nextIsOver) ||
    (!selection.equals(nextSelection) &&
      (nextSelection.includes(treeItem.id) ||
        selection.includes(treeItem.id))) ||
    (addControlParentId !== nextAddControlParentId &&
      (nextAddControlParentId === treeItem.id ||
        addControlParentId === treeItem.id ||
        nextTreeItem.childItems.size > 0))
  )
}

export default DragSource(
  TagTreeItemDragDrop.type,
  TagTreeItemDragDrop.taskSource,
  TagTreeItemDragDrop.collectDragSource
)(
  compose(
    DropTarget(
      TagTreeItemDragDrop.type,
      TagTreeItemDragDrop.taskTarget,
      TagTreeItemDragDrop.collectDropTarget
    ),
    withStateHandlers(() => ({ dropPosition: '', isHover: false }), {
      onHandleSetHover: () => () => ({ isHover: true }),
      onHandleUnsetHover: () => () => ({ isHover: false }),
    }),
    withHandlers({
      onHandleTreeItemSelected: props => selectedTreeItems => {
        selectedTreeItems.push(props.treeItem.toJS())
        props.onTreeItemSelected(selectedTreeItems)
      },
      onHandleClicked: props => () =>
        props.onTreeItemSelected([props.treeItem.toJS()]),
      onHandleCollapse: props => event => {
        event.stopPropagation()
        props.onCollapse(props.treeItem)
      },
      onHandleAddChildClicked: props => event => {
        event.stopPropagation()
        props.onAddChild(props.treeItem.id)
      },
      onHandleEditIconClicked: props => event => {
        event.stopPropagation()
        props.onTreeItemEdit(props.treeItem.toJS())
      },
      onHandleDeleteIconClicked: props => event => {
        event.stopPropagation()
        props.onTreeItemDelete(props.treeItem.toJS())
      },
    }),
    shouldUpdate(checkPropsChange)
  )(TagTreeItem)
)
