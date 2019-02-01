import React from 'react'
import PropTypes from 'prop-types'
import AutocompleteItem from './autocomplete-item'

const AutocompleteItems = ({
  items,
  dataType,
  location,
  isHideDelete,
  onDelete,
}) =>
  items[dataType] !== null
    ? items[dataType].map(item => (
        <AutocompleteItem
          key={item.id}
          item={item}
          dataType={dataType}
          location={location}
          onDelete={onDelete}
          isHideDelete={isHideDelete}
        />
      ))
    : null

AutocompleteItems.propTypes = {
  items: PropTypes.object,
  dataType: PropTypes.string,
  location: PropTypes.string,
  isHideDelete: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default AutocompleteItems
