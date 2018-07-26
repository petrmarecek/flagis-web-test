import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateTagSearch } from 'redux/store/tags/tags.actions'
import { getTagsSearch } from 'redux/store/tags/tags.selectors'

import TagList from 'components/tag-list/tag-list-container'
import SearchBox from 'components/common/search-box'
import AddTagForm from 'components/common/add-tag-form'

import { CenterPanelTop, CenterPanelScroll } from '../panels/styles'

class TagsContent extends PureComponent {

  static propTypes = {
    updateTagSearch: PropTypes.func.isRequired,
    search: PropTypes.string,
  }

  handleSearchChange = search => {
    this.props.updateTagSearch(search)
  }

  render() {
    return (
      <div>
        <CenterPanelTop>
          <div className="tag-top-menu">
            <SearchBox
              onChange={this.handleSearchChange}
              value={this.props.search} />
          </div>
          <AddTagForm />
        </CenterPanelTop>
        <CenterPanelScroll smallOffsetBottom>
          <div className="tag-list">
            <TagList />
          </div>
        </CenterPanelScroll>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: getTagsSearch(state),
})

const mapDispatchToProps = { updateTagSearch }

export default connect(mapStateToProps, mapDispatchToProps)(TagsContent)
