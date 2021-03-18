import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// utils
import { TreeItemPosition } from 'utils/enums'
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
  RelationBottom,
} from './styles'
import colors from 'components/styled-components-mixins/colors'
import { useTreeItemDragDrop } from 'hooks/useTreeItemDragDrop'
import UserFilterIcon from 'components/icons/user-filter-icon'

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
    contacts: [...parents, treeItem]
      .map(item =>
        item.fromUserId || item.toUserId
          ? item.fromUserId || item.toUserId
          : null
      )
      .filter(item => item),
    onDrop,
  })

  const { tag } = treeItem
  const children = treeItemEntitiesByParent.get(treeItem.parentId)
  const siblings = children.filter(item => item.id !== treeItem.id)
  const itemParents = [...parents, treeItem]
  const hasChildItems = treeItem.childItems.size > 0
  const hasMoreParents = parents.length > 1
  const isSelected = selection.includes(treeItem.id)
  const colorIndex = getColorIndex(
    tag ? tag.colorIndex : null,
    tag ? tag.title : ''
  )
  const tagColor = getTagColor(colorIndex)

  // computing relation
  let isNextSiblingSelected = false
  for (const sibling of siblings) {
    if (sibling.order > treeItem.order && selection.includes(sibling.id)) {
      isNextSiblingSelected = true
    }
  }
  const showRelation = isSelected || isNextSiblingSelected

  const currentTagRelations = getTagRelations(
    tagsRelations,
    parentTagRelations,
    treeItem.tagId || treeItem.fromUserId
  )

  const draggingData = {
    dragOver: dropProps.isOver && dropPosition === TreeItemPosition.MIDDLE,
    dragOverTop: dropProps.isOver && dropPosition === TreeItemPosition.TOP,
    dragOverBottom:
      dropProps.isOver && dropPosition === TreeItemPosition.BOTTOM,
  }

  const renderArrowIcon = treeChildren => {
    const title = treeItem.collapsed ? 'Expand' : 'Collapse'
    return treeChildren.size > 0 ? (
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

  const getUsername = () => {
    const profile = treeItem.fromUser || treeItem.toUser

    if (!profile.nickname) {
      return `${profile.email}`
    }

    return `@${profile.nickname}`
  }

  return (
    <li ref={dragHandle}>
      <ItemWithChildrenWrapper>
        <ItemWrapper>
          {hasMoreParents && (
            <Relation showRelation={showRelation}>
              <RelationTop
                colorTheme={colorTheme}
                smallWidth={isNextSiblingSelected}
              />
              {!isLastItem && (
                <RelationBottom
                  colorTheme={colorTheme}
                  hideRelation={isSelected && !isNextSiblingSelected}
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
              {tag ? (
                <Icon
                  icon={hasChildItems ? ICONS.TAG_MULTI : ICONS.TAG}
                  width={20}
                  height={12}
                  color={[tagColor]}
                />
              ) : (
                <UserFilterIcon />
              )}
            </ItemTagIcon>
            <ItemTitle>{tag ? tag.title : getUsername()}</ItemTitle>
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
              {Boolean(tag) && (
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
              )}
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
  // compare objects and arrays
  const isParentsEqual = _.isEqual(props.parents, nextProps.parents)
  const isTreeItemEqual = _.isEqual(props.treeItem, nextProps.treeItem)
  const isSelectionEqual = _.isEqual(props.selection, nextProps.selection)
  const isTagsRelationsEqual = _.isEqual(
    props.tagsRelations,
    nextProps.tagsRelations
  )
  const isParentTagRelations = _.isEqual(
    props.parentTagRelations,
    nextProps.parentTagRelations
  )
  const isTreeItemEntitiesByParentEqual = _.isEqual(
    props.treeItemEntitiesByParent,
    nextProps.treeItemEntitiesByParent
  )

  // compare strings
  const isLastItemEqual = props.isLastItem === nextProps.isLastItem
  const isColorThemeEqual = props.colorTheme === nextProps.colorTheme
  const isAddControlParentIdEqual =
    props.addControlParentId === nextProps.addControlParentId

  return (
    isParentsEqual &&
    isTreeItemEqual &&
    isSelectionEqual &&
    isTreeItemEntitiesByParentEqual &&
    isTagsRelationsEqual &&
    isParentTagRelations &&
    isLastItemEqual &&
    isColorThemeEqual &&
    isAddControlParentIdEqual
  )
}

export default React.memo(
  compose(
    withHandlers({
      onHandleTreeItemSelected: props => selectedTreeItems => {
        const selectedTreeItemsBackUp = _.cloneDeep(selectedTreeItems)
        selectedTreeItems.push(props.treeItem.toJS())
        props.onTreeItemSelected(
          selectedTreeItems,
          selectedTreeItemsBackUp.shift()
        )
      },
      onHandleClicked: props => () =>
        props.onTreeItemSelected(
          [props.treeItem.toJS()],
          props.treeItem.toJS()
        ),
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
