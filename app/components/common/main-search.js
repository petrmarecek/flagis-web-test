import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { getActiveTags } from 'redux/store/tags/tags.selectors'
import { selectActiveTags } from 'redux/store/tags/tags.actions'
import Autocomplete from 'components/autocomplete'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class MainSearch extends PureComponent {

  static propTypes = {
    tags: PropTypes.object.isRequired,
    selectActiveTags: PropTypes.func.isRequired,
  }

  handleItemDelete = tagToDelete => {

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
    let handleClearFilter = null
    let tags = null

    if (this.props.tags.size !== 0) {
     handleClearFilter = this.handleClearFilter
     tags = this.props.tags
    }

    return (
      <div className="main-search">
        <Icon
          className="main-search__icon"
          icon={ICONS.TAG_FILTER}
          width={19}
          height={25}
          scale={1.25}
          color={["#8c9ea9"]}/>
        <Autocomplete
          dataType="tags"
          location="mainSearch"
          placeholder="Tag filter"
          selectedItems={{ tags }}
          parentId={null}
          onItemDelete={this.handleItemDelete}
          onClearFilter={handleClearFilter} />
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
