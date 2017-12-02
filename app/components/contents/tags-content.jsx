import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateTagSearch } from '../../redux/store/tags/tags.actions.js'

import TagList from '../tag-list/tag-list-container'
import SearchBox from '../elements/search-box'
import AddTagForm from '../elements/add-tag-form'

class TagsContent extends Component {

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
        <div className="center-panel__top">
          <div className="tag-top-menu">
            <SearchBox
              onChange={this.handleSearchChange}
              value={this.props.search} />
          </div>
          <AddTagForm />
        </div>
        <div className="center-panel__scroll center-panel__scroll--small-offset center-panel__scroll--small-offset-bottom">
          <div className="tag-list">
            <TagList />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.tags.search,
})

const mapDispatchToProps = { updateTagSearch }

export default connect(mapStateToProps, mapDispatchToProps)(TagsContent)
