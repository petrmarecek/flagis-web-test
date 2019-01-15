import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import AddTagTreeItemForm from 'components/common/add-tag-tree-item-form'
import TreeItem from 'components/tag-tree/tag-tree-item'

import { ItemsList } from './styles'

const TagTreeItems = props => {
  const {
    treeItem,
    addControlParentId,
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
        <AddTagTreeItemForm
          parentId={treeItem.id}
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
