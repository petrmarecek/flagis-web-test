import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { isStringEmpty } from 'redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import TagTreeItems from 'components/tag-tree/tag-tree-items'

// styles
import {
  SectionWrapper,
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderIcon,
  SectionContent,
  SectionFooter,
  AddFilterIcon,
  AddFilterText,
} from './styles'
import colors from 'components/styled-components-mixins/colors'

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
    colorTheme,
    selection,
    tagsRelations,
    isDragging,
    maxWidth,
    title,

    // Handlers
    getInputRef,
    onAddChild,
    onAddControlCancel,
    onCollapse,
    onSubitemCreated,
    onTreeItemEdit,
    onTreeItemDelete,
    onTreeItemSelected,
    onDrop,
    onHandleTitleClicked,
    onHandleAddChildClicked,
    onHandleDeleteIconClicked,
    onHandleCollapse,
    onHandleChangeTitle,
    onHandleSubmitTitle,
    onHandleKeyDown,

    // Drag and Drop
    connectDragSource,
    connectDropTarget,
  } = props

  const parents = [section.id]
  const styleWidth = { width: maxWidth - 125 }
  const renderArrowIcon = children => {
    const titleIcon = section.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0 ? (
      <SectionHeaderIcon
        title={titleIcon}
        leftOffset
        animation
        collapsed={section.collapsed}
      >
        <Icon
          icon={ICONS.ARROW_DOUBLE_DOWN}
          width={10}
          height={12}
          scale={0.85}
          color={[colors.tagTreeSectionIcon]}
          hoverColor={[colors[colorTheme].tagTreeSectionIconHover]}
          onClick={onHandleCollapse}
        />
      </SectionHeaderIcon>
    ) : null
  }

  return connectDragSource(
    connectDropTarget(
      <li>
        <SectionWrapper dragging={isDragging} collapsed={section.collapsed}>
          <SectionHeader colorTheme={colorTheme}>
            <SectionHeaderTitle
              type="text"
              value={title}
              onClick={onHandleTitleClicked}
              onChange={onHandleChangeTitle}
              onBlur={onHandleSubmitTitle}
              onKeyDown={onHandleKeyDown}
              onSubmit={onHandleSubmitTitle}
              innerRef={getInputRef}
              style={styleWidth}
            />
            <SectionHeaderIcon leftOffset title="Delete">
              <Icon
                icon={ICONS.TRASH}
                width={12}
                height={13}
                scale={0.5}
                color={[colors.tagTreeSectionIcon]}
                hoverColor={[colors.trashHover]}
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
              colorTheme={colorTheme}
            />
            {!section.collapsed && (
              <SectionFooter
                title="Add filter"
                onClick={onHandleAddChildClicked}
                addSubtag
                colorTheme={colorTheme}
              >
                <AddFilterIcon colorTheme={colorTheme}>
                  <Icon
                    icon={ICONS.PLUS}
                    width={15}
                    height={15}
                    scale={0.52}
                    color={[colors.tagTreeAddFilterIcon]}
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
  colorTheme: PropTypes.string,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  isDragging: PropTypes.bool,
  index: PropTypes.number,
  maxWidth: PropTypes.number,

  // state
  title: PropTypes.string,
  inputRef: PropTypes.object,

  // Handlers
  getInputRef: PropTypes.func,
  onAddChild: PropTypes.func,
  onAddControlCancel: PropTypes.func,
  onCollapse: PropTypes.func,
  onSubitemCreated: PropTypes.func,
  onTreeItemEdit: PropTypes.func,
  onTreeItemDelete: PropTypes.func,
  onTreeItemSelected: PropTypes.func,
  onUpdateSectionTitle: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onMoveSection: PropTypes.func.isRequired,
  onDropSection: PropTypes.func.isRequired,
  onHandleAddChildClicked: PropTypes.func,
  onHandleDeleteIconClicked: PropTypes.func,
  onHandleTitleClicked: PropTypes.func,
  onHandleCollapse: PropTypes.func,
  onHandleChangeTitle: PropTypes.func,
  onHandleResetTitle: PropTypes.func,
  onHandleSubmitTitle: PropTypes.func,

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
    withStateHandlers(
      props => ({ inputRef: null, title: props.section.title }),
      {
        getInputRef: () => ref => ({ inputRef: ref }),
        onHandleTitleClicked: ({ inputRef }) => () => {
          // fix problem for IE with double click
          window.setTimeout(() => {
            inputRef.blur()
            inputRef.focus()
          }, 1)
        },
        onHandleChangeTitle: ({ inputRef }) => () => ({
          title: inputRef.value,
        }),
        onHandleResetTitle: (state, props) => () => ({
          title: props.section.title,
        }),
        onHandleSubmitTitle: ({ title }, props) => () => {
          if (title === props.section.title) {
            return {}
          }

          if (isStringEmpty(title)) {
            return { title: props.section.title }
          }

          props.onUpdateSectionTitle(props.section, title)
          return {}
        },
      }
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
      onHandleKeyDown: props => event => {
        switch (event.which) {
          // escape
          case 27:
            event.preventDefault()
            props.onHandleResetTitle()
            props.inputRef.blur()
            return

          // sumit (enter key)
          case 13:
            event.preventDefault()
            props.onHandleSubmitTitle()
            props.inputRef.blur()
            return

          default:
            return
        }
      },
    })
  )(TagTreeSection)
)
