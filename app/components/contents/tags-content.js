import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateTagSearch } from 'redux/store/tags/tags.actions'
import { getTagsSearch } from 'redux/store/tags/tags.selectors'

// components
import TagListContainer from 'components/tag-list'
import SearchBox from 'components/common/search-box'
import AddTagForm from 'components/common/add-tag-form'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelScroll,
} from '../panels/styles'

const TagsContent = ({ search, onHandleSearchChange }) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary smallOffsetPadding>
        <CenterPageTitle>Tags</CenterPageTitle>
        <SearchBox onChange={onHandleSearchChange} value={search} />
      </CenterPanelTopPrimary>
      <AddTagForm />
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={104} offsetBottom={10}>
      <TagListContainer />
    </CenterPanelScroll>
  </div>
)

TagsContent.propTypes = {
  search: PropTypes.string,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = state => ({
  search: getTagsSearch(state),
})

const mapDispatchToProps = { updateTagSearch }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleSearchChange: props => search => props.updateTagSearch(search),
  })
)(TagsContent)
