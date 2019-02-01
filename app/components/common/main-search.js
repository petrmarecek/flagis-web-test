import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { getActiveTags } from 'redux/store/tags/tags.selectors'
import { selectActiveTags } from 'redux/store/tags/tags.actions'
import Autocomplete from 'components/autocomplete'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #ccc;
  height: 60px;
`

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`

const MainSearch = ({ tags, handleClearFilter, handleItemDelete }) => (
  <Search>
    <SearchIcon
      icon={ICONS.TAG_FILTER}
      width={15}
      height={20}
      scale={0.86}
      color={['#B1B5B8']}
    />
    <Autocomplete
      dataType="tags"
      location="mainSearch"
      placeholder="Tag filter"
      selectedItems={tags.size === 0 ? { tags: null } : { tags }}
      parentId={null}
      onItemDelete={handleItemDelete}
      onClearFilter={tags.size === 0 ? null : handleClearFilter}
    />
  </Search>
)

MainSearch.propTypes = {
  tags: PropTypes.object.isRequired,
  selectActiveTags: PropTypes.func.isRequired,
  handleClearFilter: PropTypes.func,
  handleItemDelete: PropTypes.func,
}

const mapStateToProps = state => ({
  tags: getActiveTags(state),
})

const mapDispatchToProps = {
  selectActiveTags,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    handleClearFilter: props => () => props.selectActiveTags(List()),
    handleItemDelete: props => tagToDelete => {
      const tagIds = props.tags
        .map(tag => tag.id)
        .reverse()
        .filter(id => id !== tagToDelete.id)

      props.selectActiveTags(tagIds)
    },
  })
)(MainSearch)
