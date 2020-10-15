import React, { useMemo } from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import TagTreeSection from 'components/tag-tree/tag-tree-section'

const TagTree = props => {
  const { treeItems } = props
  const propsData = R.omit(['treeItems'], props)

  // When user has set more than one section, value is true (old tag tree with sections)
  const isWithSections = useMemo(() => treeItems.size > 1, [treeItems])

  return (
    <ul>
      {treeItems.map((treeItem, i) => (
        <TagTreeSection
          index={i}
          key={treeItem.id}
          isSectionNameVisible={isWithSections}
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
