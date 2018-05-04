import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import TreeItemList from 'components/tag-tree/tree-item-list'
import {findDOMNode} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd'

const TreeSectionDragDrop = {
  type: 'tree-section',

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

  sectionSource: {
    beginDrag: props => ({
      section: props.section,
      index: props.index,
    }),
  },

  sectionTarget: {

    canDrop(props) {
      // Not section
      if (props.section.parentId) {
        return false
      }

      // Is section
      return Boolean(!props.section.parentId)
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
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
      // Size of section / 2
      const hoverMiddleY = Math.round(hoverBoundingRect.height / 2)
      // Current position of mouse
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Dragging downwards (not yet too far)
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards (not yet too far)
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      const move = {
        sourceSectionId: dragSource.section.id,
        targetIndex: hoverIndex,
        direction: dragIndex < hoverIndex ? 'DOWN' : 'UP',
      }

      props.onMoveSection(move)
      dragSource.index = hoverIndex
    },

    drop(props, monitor) {
      const canDrop = monitor.canDrop()
      if (!canDrop) {
        return
      }

      const dragSource = monitor.getItem()
      const drop = {
        sourceSection: dragSource.section,
      }
      props.onDropSection(drop)
    },
  }
}

class TreeSection extends Component {

  static propTypes = {
    addControlParentId: PropTypes.string,
    onAddChild: PropTypes.func,
    onAddControlCancel: PropTypes.func,
    onCollapse: PropTypes.func,
    onSubitemCreated: PropTypes.func,
    onTreeItemEdit: PropTypes.func,
    onTreeItemDelete: PropTypes.func,
    onTreeItemSelected: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    section: PropTypes.object,
    selection: PropTypes.object,
    tagsRelations: PropTypes.object,
    archivedTasks: PropTypes.bool,
    maxWidth: PropTypes.number,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onMoveSection: PropTypes.func.isRequired,
    onDropSection: PropTypes.func.isRequired,
    index: PropTypes.number,
  }

  handleAddChildClicked = event => {
    event.stopPropagation()
    this.props.onAddChild(this.props.section.id)
  }

  // The event which occurs when the collapsing arrow was clicked
  handleCollapse = event => {
    event.stopPropagation()
    this.props.onCollapse(this.props.section)
  }

  handleEditIconClicked = event => {
    event.stopPropagation()
    this.props.onTreeItemEdit(this.props.section.toJS())
  }

  renderArrowIcon(children) {

    const arrowIconClass = classnames({
      'tree-section__icon': true,
      arrow: true,
      collapsed: this.props.section.collapsed
    })

    const title = this.props.section.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0
      ? <span
          ref="arrow"
          title={title}>
          <Icon
            className={arrowIconClass}
            icon={ICONS.ARROW_DOUBLE}
            width={13}
            height={15}
            scale={1.07}
            color="#fff"
            onClick={this.handleCollapse}/>
        </span>

      : null
  }

  render() {

    const parents = [this.props.section.id]
    const treeItemClasses = classnames({
      'tree-section-wrapper': true,
      'active': this.props.section.active,
      'selected': this.props.section.selected,
      'folder': this.props.section.childItems.size > 0,
      'drop-section': true,
    })

    const currentItemClasses = classnames({
      'tree-section': !this.props.section.parentId,
      'tree-section--collapsed': this.props.section.collapsed,
      'prevent-detail-hide': !this.props.section.parentId,
      'drag-item': true,
    })

    const styleWidth = { maxWidth: this.props.maxWidth - 125 }

    // render component
    const { connectDragSource, connectDropTarget, isDragging } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <li
        className={treeItemClasses}
        data-item-id={this.props.section.id}
        draggable
        style={{ opacity }} >
        <a
          className={currentItemClasses}
          data-item-id={this.props.section.id}
          onClick={this.handleClicked}>
          <span className="tree-section__title" style={styleWidth}>{this.props.section.title}</span>
          <span className="tree-section__icons">
            {this.renderArrowIcon(this.props.section.childItems)}
            <span title="Edit">
              <Icon
                className="tree-section__icon edit"
                icon={ICONS.PENCIL}
                width={15}
                height={15}
                color="#fff"
                onClick={this.handleEditIconClicked}/>
            </span>
          </span>
        </a>
        <TreeItemList
          addControlParentId={this.props.addControlParentId}
          tagsRelations={this.props.tagsRelations}
          onAddChild={this.props.onAddChild}
          onAddControlCancel={this.props.onAddControlCancel}
          onCollapse={this.props.onCollapse}
          onDrop={this.props.onDrop}
          onSubitemCreated={this.props.onSubitemCreated}
          onSubmit={this.props.onSubitemCreated}
          onTreeItemEdit={this.props.onTreeItemEdit}
          onTreeItemDelete={this.props.onTreeItemDelete}
          onTreeItemSelected={this.props.onTreeItemSelected}
          selection={this.props.selection}
          parents={parents}
          parentTagRelations={null}
          treeItem={this.props.section}
          archivedTasks={this.props.archivedTasks}/>
        {!this.props.section.collapsed &&
        <span className="tree-section__icon add-subtag" title="Add filter" >
          <Icon
            icon={ICONS.PLUS}
            width={15}
            height={15}
            scale={0.52}
            color="#fff"
            title="Edit"
            onClick={this.handleAddChildClicked}/>
        </span>}
      </li>
    ))
  }
}

export default
DragSource(TreeSectionDragDrop.type, TreeSectionDragDrop.sectionSource, TreeSectionDragDrop.collectDragSource)(
  DropTarget(TreeSectionDragDrop.type, TreeSectionDragDrop.sectionTarget, TreeSectionDragDrop.collectDropTarget)(
    TreeSection
  )
)
