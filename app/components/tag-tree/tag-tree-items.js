import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import AddTagTreeItemSectionForm from 'components/common/add-tag-tree-item-section-form'
import TreeItem from 'components/tag-tree/tag-tree-item'

import { ItemsList } from './styles'

const TagTreeItems = props => {
  const {
    treeItem,
    addControlParentId,
    addControlParentType,
    onSubitemCreated,
    onAddControlCancel,
  } = props
  const propsData = R.omit(['treeItem'], props)
  return (
    <ItemsList root={treeItem.parentId === null} collapsed={treeItem.collapsed}>
      {treeItem.childItems.map(item => (
        <TreeItem key={item.id} treeItem={item} {...propsData} />
      ))}
      {addControlParentId === treeItem.id && (
        <AddTagTreeItemSectionForm
          parentId={treeItem.id}
          type={addControlParentType}
          onCancel={onAddControlCancel}
          onSubmit={onSubitemCreated}
        />
      )}
    </ItemsList>
  )
}

TagTreeItems.propTypes = {
  treeItem: PropTypes.object.isRequired,
  addControlParentId: PropTypes.string,
  onAddControlCancel: PropTypes.func,
  onSubitemCreated: PropTypes.func,
}

export default TagTreeItems
