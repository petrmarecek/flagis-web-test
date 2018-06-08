import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import includes from 'lodash/includes'

import { getTagColor, getTagRelations } from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import TreeItemList from 'components/tag-tree/tree-item-list'
import commonUtils from 'redux/utils/common'

const ITEM_HEIGHT = 27
const SECTION_HEIGHT = 32

const TreeItemDragDrop = {
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
        ? ITEM_HEIGHT / 3
        : SECTION_HEIGHT / 3

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
    }
  }
}

class TreeItem extends Component {

  static propTypes = {
    // Data
    treeItem: PropTypes.object,
    parents: PropTypes.array.isRequired,
    parentTagRelations: PropTypes.object,
    selection: PropTypes.object,
    tagsRelations: PropTypes.object,
    archivedTasks: PropTypes.bool,
    addControlParentId: PropTypes.string,
    isOver: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,

    // Handlers
    onAddChild: PropTypes.func,
    onAddControlCancel: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    onCollapse: PropTypes.func.isRequired,
    onSubitemCreated: PropTypes.func,
    onTreeItemEdit: PropTypes.func,
    onTreeItemDelete: PropTypes.func,
    onTreeItemSelected: PropTypes.func,

    // Drag and Drop
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  state = {
    dropPosition: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    // props and state
    const {
      treeItem,
      selection,
      addControlParentId,
      isOver,
      tagsRelations,
      parentTagRelations
    } = this.props
    const { dropPosition } = this.state
    const tagRelations = getTagRelations(tagsRelations, parentTagRelations, treeItem.tagId).size

    // nextProps and nextState
    const nextTreeItem = nextProps.treeItem
    const nextSelection = nextProps.selection
    const nextAddControlParentId = nextProps.addControlParentId
    const nextIsOver = nextProps.isOver
    const nextTagsRelations = nextProps.tagsRelations
    const nextParentTagRelations = nextProps.parentTagRelations
    const nextDropPosition = nextState.dropPosition
    const nextTagRelations = getTagRelations(nextTagsRelations, nextParentTagRelations, nextTreeItem.tagId).size

    return !treeItem.equals(nextTreeItem)
      || (tagRelations !== nextTagRelations)
      || ((dropPosition !== nextDropPosition) || (isOver !== nextIsOver))
      || (!selection.equals(nextSelection)
        && (nextSelection.includes(treeItem.id) || selection.includes(treeItem.id)))
      || ((addControlParentId !== nextAddControlParentId)
        && ((nextAddControlParentId === treeItem.id)
          || (addControlParentId === treeItem.id)
          || (nextTreeItem.childItems.size > 0)))
  }

  // Propagates selection to the top
  handleTreeItemSelected = selectedTreeItems => {
    selectedTreeItems.push(this.props.treeItem.toJS())
    this.props.onTreeItemSelected(selectedTreeItems)
  }

  // Item selected
  handleClicked = () => {

    // item select
    this.props.onTreeItemSelected([this.props.treeItem.toJS()])
  }

  // The event which occurs when the collapsing arrow was clicked
  handleCollapse = event => {
    event.stopPropagation()
    this.props.onCollapse(this.props.treeItem)
  }

  // The event when user click on the plus button
  handleAddChildClicked = event => {
    event.stopPropagation()
    this.props.onAddChild(this.props.treeItem.id)
  }

  handleEditIconClicked = event => {
    event.stopPropagation()
    this.props.onTreeItemEdit(this.props.treeItem.toJS())
  }

  handleDeleteIconClicked = event => {
    event.stopPropagation()
    this.props.onTreeItemDelete(this.props.treeItem.toJS())
  }

  getColorIndex() {
    return this.props.treeItem.tag.colorIndex === null
      ? commonUtils.computeIntHash(this.props.treeItem.tag.title, 10)
      : this.props.treeItem.tag.colorIndex
  }

  renderArrowIcon(children) {

    const arrowIconClass = classnames({
      'tree-item__icon': true,
      arrow: true,
      collapsed: this.props.treeItem.collapsed
    })

    const title = this.props.treeItem.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0
      ? <span
        ref="arrow"
        title={title}>
          <Icon
            className={arrowIconClass}
            icon={ICONS.ARROW_DOUBLE}
            width={10}
            height={12}
            scale={0.85}
            color="#fff"
            onClick={this.handleCollapse}/>
        </span>
      : null
  }

  render() {
    const colorIndex = this.getColorIndex()
    const tagColor = getTagColor(colorIndex)

    const {
      connectDragSource,
      connectDropTarget,
      isOver, tagsRelations,
      parentTagRelations,
      treeItem
    } = this.props
    const currentTagRelations = getTagRelations(tagsRelations, parentTagRelations, treeItem.tagId)
    const parents = [...this.props.parents, this.props.treeItem.id]

    // init classes
    const treeItemClasses = classnames({
      'tree-item-wrapper': true,
      'active': this.props.treeItem.active,
      'selected': this.props.selection.includes(this.props.treeItem.id),
      'folder': this.props.treeItem.childItems.size > 0,
    })

    //console.log({ isOver, dropPosition: this.state.dropPosition }, 'asdfasdf')
    const currentItemClasses = classnames({
      'tree-item': true,
      'drag-over': isOver && this.state.dropPosition === 'MIDDLE',
      'drag-over-top': isOver && this.state.dropPosition === 'TOP',
      'drag-over-bottom': isOver && this.state.dropPosition === 'BOTTOM',
      'tree-item--collapsed': this.props.treeItem.collapsed,
      'drag-item': true,
      'drop-item': true
    })

    const styleWidth = { maxWidth: `calc(100% - 30px)` }

    return connectDragSource(
      <li
        className={treeItemClasses}
        data-item-id={this.props.treeItem.id}
        draggable>
        {connectDropTarget(
          <a
            className={currentItemClasses}
            data-item-id={this.props.treeItem.id}
            onClick={this.handleClicked}>
            {this.props.treeItem.childItems.size === 0 &&
            <span className="tree-item__main-icon">
              <Icon
                icon={ICONS.TAG}
                width={20}
                height={11}
                color={tagColor}/>
            </span>}
            {this.props.treeItem.childItems.size > 0 &&
            <span className="tree-item__main-icon">
              <Icon
                icon={ICONS.TAG_MULTI}
                width={20}
                height={12}
                color={tagColor}/>
            </span>}
            <span className="tree-item__main-icon" />
            <span className="tree-item__title" style={styleWidth}>{this.props.treeItem.tag.title}</span>
            {!this.props.archivedTasks &&
            <span className="tree-item__relations">{currentTagRelations.size}</span>}
            <span className="tree-item__actions">
              <div>
                {this.renderArrowIcon(this.props.treeItem.childItems)}
                <span title="Delete">
                  <Icon
                    className="tree-item__icon delete"
                    icon={ICONS.TRASH}
                    width={12}
                    height={13}
                    scale={0.5}
                    color="#fff"
                    hoverColor="#ff8181"
                    onClick={this.handleDeleteIconClicked}/>
                </span>
                <span title="Go to edit tag">
                  <Icon
                    className="tree-item__icon margin"
                    icon={ICONS.PENCIL}
                    width={11}
                    height={11}
                    scale={0.73}
                    color="#fff"
                    onClick={this.handleEditIconClicked}/>
                </span>
                <span title="Add sub filter">
                  <Icon
                    className="tree-item__icon margin"
                    icon={ICONS.PLUS}
                    width={12}
                    height={12}
                    scale={0.38}
                    color="#fff"
                    onClick={this.handleAddChildClicked}/>
                </span>
              </div>
            </span>
          </a>
        )}
        <TreeItemList
          addControlParentId={this.props.addControlParentId}
          onAddChild={this.props.onAddChild}
          onAddControlCancel={this.props.onAddControlCancel}
          onCollapse={this.props.onCollapse}
          onDrop={this.props.onDrop}
          onSubitemCreated={this.props.onSubitemCreated}
          onSubmit={this.props.onSubitemCreated}
          onTreeItemEdit={this.props.onTreeItemEdit}
          onTreeItemDelete={this.props.onTreeItemDelete}
          onTreeItemSelected={this.handleTreeItemSelected}
          parents={parents}
          parentTagRelations={currentTagRelations}
          selection={this.props.selection}
          tagsRelations={this.props.tagsRelations}
          treeItem={this.props.treeItem}
          archivedTasks={this.props.archivedTasks}/>
      </li>
    )
  }
}

export default
  DragSource(TreeItemDragDrop.type, TreeItemDragDrop.taskSource, TreeItemDragDrop.collectDragSource)(
    DropTarget(TreeItemDragDrop.type, TreeItemDragDrop.taskTarget, TreeItemDragDrop.collectDropTarget)(
      TreeItem
    )
  )

// https://github.com/tamagokun/example-react-dnd-nested/tree/master/app
