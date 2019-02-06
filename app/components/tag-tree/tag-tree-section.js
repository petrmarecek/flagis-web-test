import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import TagTreeItems from 'components/tag-tree/tag-tree-items'

import {
  SectionWrapper,
  SectionHeader,
  SectionHeaderIcon,
  SectionContent,
  SectionFooter,
  AddFilterIcon,
  AddFilterText,
} from './styles'

const TagTreeSectionDragDrop = {
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
  },
}

const TagTreeSection = props => {
  const {
    // Data
    section,
    addControlParentId,
    selection,
    tagsRelations,
    isDragging,

    // Handlers
    onAddChild,
    onAddControlCancel,
    onCollapse,
    onSubitemCreated,
    onTreeItemEdit,
    onTreeItemDelete,
    onTreeItemSelected,
    onDrop,
    onHandleAddChildClicked,
    onHandleDeleteIconClicked,
    onHandleCollapse,

    // Drag and Drop
    connectDragSource,
    connectDropTarget,
  } = props

  const parents = [section.id]
  const renderArrowIcon = children => {
    const title = section.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0 ? (
      <SectionHeaderIcon
        title={title}
        leftOffset
        animation
        collapsed={section.collapsed}
      >
        <Icon
          icon={ICONS.ARROW_DOUBLE_DOWN}
          width={10}
          height={12}
          scale={0.85}
          color={['#fff']}
          onClick={onHandleCollapse}
        />
      </SectionHeaderIcon>
    ) : null
  }

  return connectDragSource(
    connectDropTarget(
      <li>
        <SectionWrapper dragging={isDragging} collapsed={section.collapsed}>
          <SectionHeader>
            <SectionHeaderIcon leftOffset title="Delete">
              <Icon
                icon={ICONS.TRASH}
                width={12}
                height={13}
                scale={0.5}
                color={['#fff']}
                hoverColor={['#ff8181']}
                onClick={onHandleDeleteIconClicked}
              />
            </SectionHeaderIcon>
            {renderArrowIcon(section.childItems)}
          </SectionHeader>
          <SectionContent>
            <TagTreeItems
              addControlParentId={addControlParentId}
              tagsRelations={tagsRelations}
              onAddChild={onAddChild}
              onAddControlCancel={onAddControlCancel}
              onCollapse={onCollapse}
              onDrop={onDrop}
              onSubitemCreated={onSubitemCreated}
              onSubmit={onSubitemCreated}
              onTreeItemEdit={onTreeItemEdit}
              onTreeItemDelete={onTreeItemDelete}
              onTreeItemSelected={onTreeItemSelected}
              selection={selection}
              parents={parents}
              parentTagRelations={null}
              treeItem={section}
            />
            {!section.collapsed && (
              <SectionFooter
                title="Add filter"
                onClick={onHandleAddChildClicked}
                addSubtag
              >
                <AddFilterIcon>
                  <Icon
                    icon={ICONS.PLUS}
                    width={15}
                    height={15}
                    scale={0.52}
                    color={['#979797']}
                  />
                </AddFilterIcon>
                <AddFilterText>Add New Filter</AddFilterText>
              </SectionFooter>
            )}
          </SectionContent>
        </SectionWrapper>
      </li>
    )
  )
}

TagTreeSection.propTypes = {
  // Data
  section: PropTypes.object,
  addControlParentId: PropTypes.string,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  isDragging: PropTypes.bool,
  index: PropTypes.number,

  // Handlers
  onAddChild: PropTypes.func,
  onAddControlCancel: PropTypes.func,
  onCollapse: PropTypes.func,
  onSubitemCreated: PropTypes.func,
  onTreeItemEdit: PropTypes.func,
  onTreeItemDelete: PropTypes.func,
  onTreeItemSelected: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onMoveSection: PropTypes.func.isRequired,
  onDropSection: PropTypes.func.isRequired,
  onHandleAddChildClicked: PropTypes.func,
  onHandleDeleteIconClicked: PropTypes.func,
  onHandleCollapse: PropTypes.func,

  // Drag and Drop
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

export default DragSource(
  TagTreeSectionDragDrop.type,
  TagTreeSectionDragDrop.sectionSource,
  TagTreeSectionDragDrop.collectDragSource
)(
  compose(
    DropTarget(
      TagTreeSectionDragDrop.type,
      TagTreeSectionDragDrop.sectionTarget,
      TagTreeSectionDragDrop.collectDropTarget
    ),
    withHandlers({
      onHandleAddChildClicked: props => event => {
        event.stopPropagation()
        props.onAddChild(props.section.id)
      },
      onHandleDeleteIconClicked: props => event => {
        event.stopPropagation()
        props.onTreeItemEdit(props.section.toJS())
      },
      onHandleCollapse: props => event => {
        event.stopPropagation()
        props.onCollapse(props.section)
      },
    })
  )(TagTreeSection)
)
