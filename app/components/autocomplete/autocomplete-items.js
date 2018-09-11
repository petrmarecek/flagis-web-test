import React from 'react'
import PropTypes from 'prop-types'
import AutocompleteItem from './autocomplete-item'

const AutocompleteItems = ({ items, dataType, onDelete }) => (
  items[dataType] !== null ? items[dataType].map(item => (
    <AutocompleteItem
      key={item.id}
      item={item}
      dataType={dataType}
      onDelete={onDelete} />
  )) : null
)

AutocompleteItems.propTypes = {
  items: PropTypes.object,
  dataType: PropTypes.string,
  onDelete: PropTypes.func,
}

export default AutocompleteItems


