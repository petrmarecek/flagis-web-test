import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withHandlers } from 'recompose'
import {
  getVisibleTags,
  getCurrentTagId,
  getTagsRelations,
} from 'redux/store/tags/tags.selectors'
import { selectTag } from 'redux/store/tags/tags.actions'
import {
  setDetail,
  setScrollbarPosition,
} from 'redux/store/app-state/app-state.actions'
import { getScrollbarPosition } from 'redux/store/app-state/app-state.selectors'

// components
import TagListItem from 'components/tag-list/tag-list-item'
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

// styles
import { EmptyList } from 'components/styled-components-mixins'

const TagListContainer = ({
  tags,
  currentTag,
  scrollbarPosition,
  tagsRelations,
  onHandleTagClick,
  onHandleSetScrollbarPosition,
}) => {
  if (tags.items.length === 0) {
    return <EmptyList>No tags found</EmptyList>
  }

  const scrollStyle = {
    height: 'calc(100vh - 114px)',
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(239, 239, 239, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(239, 239, 239, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar
      style={scrollStyle}
      position={scrollbarPosition}
      setPosition={onHandleSetScrollbarPosition}
    >
      <ul>
        {tags.items.map(tag => (
          <TagListItem
            key={tag.id}
            tag={tag}
            selected={currentTag === tag.id}
            onClick={onHandleTagClick}
            tagRelations={
              tagsRelations.has(tag.id) ? tagsRelations.get(tag.id).size : null
            }
          />
        ))}
      </ul>
    </ShadowScrollbar>
  )
}

TagListContainer.propTypes = {
  tags: PropTypes.object,
  currentTag: PropTypes.string,
  scrollbarPosition: PropTypes.number,
  tagsRelations: PropTypes.object,
  selectTag: PropTypes.func,
  setDetail: PropTypes.func,
  onHandleTagClick: PropTypes.func,
  onHandleSetScrollbarPosition: PropTypes.func,
}

const mapStateToProps = state => ({
  tags: getVisibleTags(state),
  currentTag: getCurrentTagId(state),
  tagsRelations: getTagsRelations(state),
  scrollbarPosition: getScrollbarPosition(state, 'tag'),
})

const mapDispatchToProps = {
  selectTag,
  setDetail,
  setScrollbarPosition,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => props.tags.isFetching, renderComponent(Loader)),
  withHandlers({
    onHandleTagClick: props => tagId => {
      props.selectTag(tagId)
      props.setDetail('tag')
    },
    onHandleSetScrollbarPosition: props => position =>
      props.setScrollbarPosition('tag', position),
  })
)(TagListContainer)
