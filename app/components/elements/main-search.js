import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { getActiveTags } from '../../redux/store/tags/tags.selectors'
import { selectActiveTags } from '../../redux/store/tags/tags.actions'
import TagAutocomplete from './tag-autocomplete/tag-autocomplete'

import { ICONS } from "../icons/icon-constants"
import Icon from '../icons/icon'

class MainSearch extends Component {

  static propTypes = {
    tags: PropTypes.object.isRequired,
    selectActiveTags: PropTypes.func.isRequired,
  }

  handleTagDeleted = tagToDelete => {

    const tagIds = this.props.tags
      .map(tag => tag.id)
      .reverse()
      .filter(id => id !== tagToDelete.id)

    this.props.selectActiveTags(tagIds)
  }

  handleClearFilter = () => {
    this.props.selectActiveTags(List())
  }

  render() {
    const handleClearFilter = this.props.tags.size !== 0
      ? this.handleClearFilter
      : null

    return (
      <div className="main-search">
        <Icon
          className="main-search__icon"
          icon={ICONS.TAG_FILTER}
          width={19}
          height={25}
          scale={1.25}
          color="#8c9ea9"/>
        <TagAutocomplete
          id="search"
          context={null}
          allowMultiSelect
          blurOnSubmit
          className="tag-autocomplete--large"
          focusOnDelete={false}
          placeholder="Tag filter"
          selectedTags={this.props.tags}
          onTagDeleted={this.handleTagDeleted}
          clearFilter={handleClearFilter} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: getActiveTags(state),
})
const mapDispatchToProps = {
  selectActiveTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch)
