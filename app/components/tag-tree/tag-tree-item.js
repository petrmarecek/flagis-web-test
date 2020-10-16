import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, shouldUpdate } from 'recompose'

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
import { useTreeItemDragDrop } from 'hooks/useTreeItemDragDrop'

const TagTreeItem = props => {
  const {
    // Data
    treeItem,
    parents,
    parentTagRelations,
    selection,
    tagsRelations,
    addControlParentId,
    colorTheme,

    // Handlers
    onAddChild,
    onAddControlCancel,
    onDrop,
    onCollapse,
    onSubitemCreated,
    onTreeItemEdit,
    onTreeItemDelete,
    onHandleTreeItemSelected,
    onHandleClicked,
    onHandleCollapse,
    onHandleAddChildClicked,
    onHandleEditIconClicked,
    onHandleDeleteIconClicked,
  } = props

  const {
    dragHandle,
    dragProps,
    dropHandle,
    dropProps,
    dropPosition,
  } = useTreeItemDragDrop({
    treeItem,
    parents: parents.map(item => item.id),
    tags: [...parents, treeItem]
      .map(item => (item.tag ? item.tag.id : null))
      .filter(item => item),
    onDrop,
  })

  const isChildItems = treeItem.childItems.size > 0
  const itemParents = [...parents, treeItem]
  const tag = treeItem.tag
  const colorIndex = getColorIndex(tag.colorIndex, tag.title)
  const tagColor = getTagColor(colorIndex)

  const currentTagRelations = getTagRelations(
    tagsRelations,
    parentTagRelations,
    treeItem.tagId
  )

  const draggingData = {
    dragOver: dropProps.isOver && dropPosition === 'MIDDLE',
    dragOverTop: dropProps.isOver && dropPosition === 'TOP',
    dragOverBottom: dropProps.isOver && dropPosition === 'BOTTOM',
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

  return (
    <li ref={dragHandle}>
      <ItemWrapper dragging={dragProps.isDragging}>
        <div ref={dropHandle}>
          <Item
            onClick={onHandleClicked}
            selected={selection.includes(treeItem.id)}
            colorTheme={colorTheme}
            isChildItems={isChildItems}
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
            <ItemRelations
              className="tag-tree-item--relations"
              selected={selection.includes(treeItem.id)}
              colorTheme={colorTheme}
            >
              {currentTagRelations.size}
            </ItemRelations>
            <ItemIcons className="tag-tree-item--icons">
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
          </Item>
        </div>
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
  onHandleTreeItemSelected: PropTypes.func,
  onHandleClicked: PropTypes.func,
  onHandleCollapse: PropTypes.func,
  onHandleAddChildClicked: PropTypes.func,
  onHandleEditIconClicked: PropTypes.func,
  onHandleDeleteIconClicked: PropTypes.func,
}

const checkPropsChange = (props, nextProps) => {
  // props and state
  const {
    treeItem,
    selection,
    addControlParentId,
    tagsRelations,
    colorTheme,
  } = props

  // nextProps and nextState
  const nextTreeItem = nextProps.treeItem
  const nextSelection = nextProps.selection
  const nextAddControlParentId = nextProps.addControlParentId
  const nextTagsRelations = nextProps.tagsRelations
  const nextColorTheme = nextProps.colorTheme

  return (
    !treeItem.equals(nextTreeItem) ||
    (!selection.equals(nextSelection) &&
      (nextSelection.includes(treeItem.id) ||
        selection.includes(treeItem.id))) ||
    (addControlParentId !== nextAddControlParentId &&
      (nextAddControlParentId === treeItem.id ||
        addControlParentId === treeItem.id ||
        nextTreeItem.childItems.size > 0))
  )
}

export default compose(
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
