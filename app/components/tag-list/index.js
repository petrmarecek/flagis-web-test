import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { compose, branch, renderComponent, withHandlers } from 'recompose'
import { getVisibleTags, getCurrentTagId, getTagsRelations } from 'redux/store/tags/tags.selectors'
import { selectTag } from 'redux/store/tags/tags.actions'
import { setDetail } from 'redux/store/app-state/app-state.actions'

import TagItem from 'components/tag-list/tag-item'
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

import { EmptyList } from 'components/styled-components-mixins'

const TagList = ({ tags, currentTag, tagsRelations, onHandleTagClick }) => {

  if (tags.items.length === 0) {
    return <EmptyList>No tags found</EmptyList>
  }

  const scrollStyle = {
    height: 'calc(100vh - 152px)',
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(231, 236, 237, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(231, 236, 237, 1)',
    overflow: 'hidden'
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <ul>
        {tags.items.map(tag => (
          <TagItem
            key={tag.id}
            tag={tag}
            selected={currentTag === tag.id}
            onClick={onHandleTagClick}
            tagRelations={tagsRelations.has(tag.id) ? tagsRelations.get(tag.id).size : null} />
        ))}
      </ul>
    </ShadowScrollbar>
  )
}

TagList.propTypes = {
  tags: PropTypes.object,
  currentTag: PropTypes.string,
  tagsRelations: PropTypes.object,
  selectTag: PropTypes.func,
  setDetail: PropTypes.func,
  onHandleTagClick: PropTypes.func,
}

const mapStateToProps = state => ({
  tags: getVisibleTags(state),
  currentTag: getCurrentTagId(state),
  tagsRelations: getTagsRelations(state),
})

const mapDispatchToProps = {
  selectTag,
  setDetail,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    props => props.tags.isFetching,
    renderComponent(Loader)
  ),
  withHandlers({
    onHandleTagClick: props => tagId => {
      props.selectTag(tagId)
      props.setDetail('tag')
    }
  })
)(TagList)