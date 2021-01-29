import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import AddTagTreeItemSectionForm from 'components/common/add-tag-tree-item-section-form'
import TagTreeItem from 'components/tag-tree/tag-tree-item'

import { ItemsList } from './styles'

const TagTreeItems = props => {
  const {
    treeItem,
    parents,
    addControlParentId,
    onSubItemCreated,
    onAddControlCancel,
  } = props
  const propsData = R.omit(['treeItem'], props)

  const padding = () => {
    if (parents.length === 2) {
      return '0 0 0 9px'
    }

    if (treeItem.parentId === null) {
      return '15px 0 0 0'
    }

    return '0 0 0 16px'
  }

  return (
    <ItemsList padding={padding} collapsed={treeItem.collapsed}>
      {treeItem.childItems.map((item, key) => (
        <TagTreeItem
          key={item.id}
          treeItem={item}
          isLastItem={key === treeItem.childItems.size - 1}
          {...propsData}
        />
      ))}
      {addControlParentId === treeItem.id && (
        <AddTagTreeItemSectionForm
          parentId={treeItem.id}
          onCancel={onAddControlCancel}
          onSubmit={onSubItemCreated}
        />
      )}
    </ItemsList>
  )
}

TagTreeItems.propTypes = {
  treeItem: PropTypes.object.isRequired,
  parents: PropTypes.array.isRequired,
  addControlParentId: PropTypes.string,
  onAddControlCancel: PropTypes.func,
  onSubItemCreated: PropTypes.func,
}

export default TagTreeItems
