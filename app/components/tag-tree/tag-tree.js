import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import TagTreeSection from 'components/tag-tree/tag-tree-section'

const TagTree = props => {
  const { treeItems } = props
  const propsData = R.omit(['treeItems'], props)

  return (
    <ul>
      {treeItems.map((treeItem, i) => (
        <TagTreeSection
          index={i}
          key={treeItem.id}
          section={treeItem}
          {...propsData}
        />
      ))}
    </ul>
  )
}

TagTree.propTypes = {
  treeItems: PropTypes.object,
}

export default TagTree
