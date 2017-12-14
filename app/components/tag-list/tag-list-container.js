import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TagItem from 'components/tag-list/tag-item'
import Loader from 'components/elements/loader'
import ShadowScrollbar from 'components/elements/shadow-scrollbar'

import {
  getVisibleTags,
  getCurrentTagId,
} from 'redux/store/tags/tags.selectors'
import { selectTag } from 'redux/store/tags/tags.actions'
import { setDetail } from 'redux/store/app-state/app-state.actions'

class TagListContainer extends Component {

  static propTypes = {
    tags: PropTypes.object.isRequired,
    currentTag: PropTypes.string,
    selectTag: PropTypes.func,
    setDetail: PropTypes.func,
  }

  handleItemClick = tagId => {
    this.props.selectTag(tagId)
    this.props.setDetail('tag')
  }

  render() {
    const scrollStyle = {
      height: 'calc(100vh - 152px)',
      shadowHeight: 20,
      boxShadowTop: 'inset 0 20px 20px -10px rgba(231, 236, 237, 1)',
      boxShadowBottom: 'inset 0 -20px 20px -10px  rgba(231, 236, 237, 1)',
    }

    return (
      <div>
        {this.props.tags.isFetching && <Loader />}
        {!this.props.tags.isFetching && this.props.tags.items.length === 0 &&
        <div className="empty-list">No tags found</div>}
        <ShadowScrollbar
          style={scrollStyle}>
        <ul>
          {this.props.tags.items.map(tag =>
            <TagItem
              key={tag.id}
              tag={tag}
              selected={this.props.currentTag === tag.id}
              onClick={this.handleItemClick}/>)
          }
        </ul>
        </ShadowScrollbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: getVisibleTags(state),
  currentTag: getCurrentTagId(state),
})

const mapDispatchToProps = {
  selectTag,
  setDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(TagListContainer)
