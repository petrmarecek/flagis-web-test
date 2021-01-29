import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

import {
  getColorIndex,
  getTagColor,
  getTagRelations,
} from 'redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import TagTreeItems from 'components/tag-tree/tag-tree-items'

// styles
import {
  ItemWithChildrenWrapper,
  ItemWrapper,
  Item,
  ItemTagIcon,
  ItemTitle,
  ItemRelations,
  ItemIcons,
  ItemIcon,
  ItemChildren,
  Relation,
  RelationTop,
  RelationCenter,
  RelationBottom,
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
    isLastItem,
    treeItemEntitiesByParent,

    // Handlers
    onAddChild,
    onAddControlCancel,
    onDrop,
    onCollapse,
    onSubItemCreated,
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

  const hasChildItems = treeItem.childItems.size > 0
  const itemParents = [...parents, treeItem]
  const tag = treeItem.tag
  const colorIndex = getColorIndex(tag.colorIndex, tag.title)
  const tagColor = getTagColor(colorIndex)
  const isSelected = selection.includes(treeItem.id)

  // computing relation
  const children = treeItemEntitiesByParent.get(treeItem.parentId)
  const siblings = children.filter(item => item.id !== treeItem.id)
  let isNextSiblingSelected = false
  for (const sibling of siblings) {
    if (sibling.order > treeItem.order && selection.includes(sibling.id)) {
      isNextSiblingSelected = true
    }
  }
  const showRelation = isSelected || isNextSiblingSelected

  const hasMoreParents = parents.length > 1
  const hasMoreChildren = children.size > 1
  let childrenClassNameModifier =
    hasMoreParents && hasMoreChildren && !isLastItem ? '--border-left' : ''
  if (childrenClassNameModifier === '--border-left' && isNextSiblingSelected) {
    childrenClassNameModifier = '--selected-border-left'
  }

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
      <ItemWithChildrenWrapper>
        <ItemWrapper>
          {hasMoreParents && (
            <Relation
              className="tag-tree-item__relation"
              showRelation={showRelation}
            >
              <RelationTop
                showRelation={showRelation}
                colorTheme={colorTheme}
              />
              <RelationCenter
                showRelation={showRelation}
                smallWidth={isNextSiblingSelected}
                colorTheme={colorTheme}
              />
              {!isLastItem && (
                <RelationBottom
                  className="tag-tree-item__relation-bottom"
                  showBorder={isNextSiblingSelected}
                  hideRelation={isSelected && !isNextSiblingSelected}
                  colorTheme={colorTheme}
                />
              )}
            </Relation>
          )}
          <Item
            onClick={onHandleClicked}
            isSelected={isSelected}
            colorTheme={colorTheme}
            hasChildItems={hasChildItems}
            ref={dropHandle}
            {...draggingData}
          >
            <ItemTagIcon>
              <Icon
                icon={hasChildItems ? ICONS.TAG_MULTI : ICONS.TAG}
                width={20}
                height={12}
                color={[tagColor]}
              />
            </ItemTagIcon>
            <ItemTitle>{treeItem.tag.title}</ItemTitle>
            <ItemRelations
              className="tag-tree-item__relations-count"
              selected={isSelected}
              colorTheme={colorTheme}
            >
              {currentTagRelations.size}
            </ItemRelations>
            <ItemIcons className="tag-tree-item__icons">
              <ItemIcon title="Add sub filter" iconMargin="0 10px 0 5px">
                <Icon
                  icon={ICONS.PLUS}
                  width={12}
                  height={12}
                  scale={0.38}
                  color={[colors[colorTheme].tagTreeItemIcon]}
                  onClick={onHandleAddChildClicked}
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
              {renderArrowIcon(treeItem.childItems)}
            </ItemIcons>
          </Item>
        </ItemWrapper>
        <ItemChildren
          className={`tag-tree-item__children${childrenClassNameModifier}`}
          showBorder={isNextSiblingSelected && hasMoreParents}
          colorTheme={colorTheme}
          collapsed={treeItem.collapsed}
        >
          <TagTreeItems
            addControlParentId={addControlParentId}
            onAddChild={onAddChild}
            onAddControlCancel={onAddControlCancel}
            onCollapse={onCollapse}
            onDrop={onDrop}
            onSubItemCreated={onSubItemCreated}
            onSubmit={onSubItemCreated}
            onTreeItemEdit={onTreeItemEdit}
            onTreeItemDelete={onTreeItemDelete}
            onTreeItemSelected={onHandleTreeItemSelected}
            parents={itemParents}
            parentTagRelations={currentTagRelations}
            selection={selection}
            tagsRelations={tagsRelations}
            treeItem={treeItem}
            colorTheme={colorTheme}
            treeItemEntitiesByParent={treeItemEntitiesByParent}
          />
        </ItemChildren>
      </ItemWithChildrenWrapper>
    </li>
  )
}

TagTreeItem.propTypes = {
  // Data
  treeItem: PropTypes.object,
  parents: PropTypes.array.isRequired,
  parentTagRelations: PropTypes.object,
  treeItemEntitiesByParent: PropTypes.object,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  addControlParentId: PropTypes.string,
  colorTheme: PropTypes.string,
  isLastItem: PropTypes.bool,

  // Handlers
  onAddChild: PropTypes.func,
  onAddControlCancel: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onSubItemCreated: PropTypes.func,
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

const areEqual = (props, nextProps) => {
  const isTreeItemEqual = _.isEqual(
    props.treeItem.toJS(),
    nextProps.treeItem.toJS()
  )
  const isSelected =
    props.selection.includes(props.treeItem.id) ||
    nextProps.selection.includes(props.treeItem.id)
  const isSelectionEqual = isSelected
    ? _.isEqual(props.selection.toJS(), nextProps.selection.toJS())
    : false
  const isAddControlParentIdEqual =
    props.addControlParentId === nextProps.addControlParentId
  const isTreeItemEntitiesByParentEqual = _.isEqual(
    props.treeItemEntitiesByParent,
    nextProps.treeItemEntitiesByParent
  )
  const isColorThemeEqual = _.isEqual(props.colorTheme, nextProps.colorTheme)
  const isParentsEqual = _.isEqual(props.parents, nextProps.parents)
  const isLastItemEqual = props.isLastItem === nextProps.isLastItem
  const isTagsRelationsEqual = _.isEqual(
    props.tagsRelations.get(props.treeItem.tag.id)
      ? props.tagsRelations.get(props.treeItem.tag.id).toJS
      : null,
    nextProps.tagsRelations.get(nextProps.treeItem.tag.id)
      ? nextProps.tagsRelations.get(nextProps.treeItem.tag.id).toJS
      : null
  )

  return (
    isTreeItemEqual &&
    isSelectionEqual &&
    isAddControlParentIdEqual &&
    isTreeItemEntitiesByParentEqual &&
    isColorThemeEqual &&
    isParentsEqual &&
    isLastItemEqual &&
    isTagsRelationsEqual
  )
}

export default React.memo(
  compose(
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
    })
  )(TagTreeItem),
  areEqual
)
