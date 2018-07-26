import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { updateTagSearch } from 'redux/store/tags/tags.actions'
import { getTagsSearch } from 'redux/store/tags/tags.selectors'

import TagList from 'components/tag-list/tag-list-container'
import SearchBox from 'components/common/search-box'
import AddTagForm from 'components/common/add-tag-form'

import styled from 'styled-components'
import { userSelect } from '../styled-components-mixins'
import { CenterPanelTop, CenterPanelScroll } from '../panels/styles'

const TagTopMenu= styled.div`
  height: 48px;
  position: relative;
`;

const TagListContainer = styled.div`
  ${userSelect('none')}
  margin: 0 0 10px;
  clear: both;

  .loader {
    margin: 0 auto;
    padding-top: 1px;
    width: 30px;
  
    #canvasLoader {
      margin: 10px 0;
    }
  }
`;

const TagsContent = ({ search, onHandleSearchChange }) => (
  <div>
    <CenterPanelTop>
      <TagTopMenu>
        <SearchBox
          onChange={onHandleSearchChange}
          value={search} />
      </TagTopMenu>
      <AddTagForm />
    </CenterPanelTop>
    <CenterPanelScroll smallOffsetBottom>
      <TagListContainer>
        <TagList />
      </TagListContainer>
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
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSearchChange: props => search => props.updateTagSearch(search)
  })
)(TagsContent)

