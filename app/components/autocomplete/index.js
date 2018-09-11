import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { hintSelected } from 'redux/store/app-state/app-state.actions'
import { getTags, getTagsTitle } from 'redux/store/tags/tags.selectors'
import { getContacts, getContactsEmail } from 'redux/store/contacts/contacts.selectors'

import AutocompleteItems from 'components/autocomplete/autocomplete-items'
import AutocompleteInput from 'components/autocomplete/autocomplete-input'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import { AutocompleteContainer, Clear, Search } from './styles'

const Autocomplete = props => {

  const {
    location,
    dataType,
    selectedItems,
    placeholder,
    hints,
    validationItems,
    isWithoutItems,
    isAllowUpdate,
    parentId,
    onClearFilter,
    onHideHints,
    onBlurTagTree,
    onHandleAddInputRef,
    onHandleItemDelete,
    onHandleClearFilter,
    onHandleHintSelected,
  } = props

  return (
    <AutocompleteContainer taskDetailTags={location === 'taskDetailTags'}>
      {!isWithoutItems &&
      <AutocompleteItems
        items={selectedItems}
        dataType={dataType}
        onDelete={onHandleItemDelete}/>}
      {!isWithoutItems && onClearFilter &&
      <Clear onClick={onHandleClearFilter}>
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={11}
          height={11}
          scale={0.78}
          color={["#8c9da9"]} />
      </Clear>}
      <Search key="search" taskDetailTags={location === 'taskDetailTags'}>
        <AutocompleteInput
          location={location}
          dataType={dataType}
          hints={hints}
          validationItems={validationItems}
          isAllowUpdate={isAllowUpdate}
          placeholder={placeholder}
          parentId={parentId}
          onHideHints={onHideHints}
          onBlurTagTree={onBlurTagTree}
          onAddInputRef={onHandleAddInputRef}
          hintSelected={onHandleHintSelected} />
      </Search>
    </AutocompleteContainer>
  )
}

Autocomplete.propTypes = {
  dataType: PropTypes.string,
  location: PropTypes.string,
  placeholder: PropTypes.string,
  isWithoutItems: PropTypes.bool,
  isFocusTagTree: PropTypes.bool,
  isAllowUpdate: PropTypes.bool,
  selectedItems: PropTypes.object,
  parentId: PropTypes.string,
  hints: PropTypes.object,
  validationItems: PropTypes.object,
  onHideHints: PropTypes.bool,
  onBlurTagTree: PropTypes.func,
  onAddInputRef: PropTypes.func,
  onHandleAddInputRef: PropTypes.func,
  onItemDelete: PropTypes.func,
  onClearFilter: PropTypes.func,
  onHandleItemDelete: PropTypes.func,
  onHandleClearFilter: PropTypes.func,
  onHandleHintSelected: PropTypes.func,
}

const mapStateToProps = (state, props) => {
  const { selectedItems, dataType } = props
  const eqA = R.eqBy(R.prop('id'))
  const storeData = {
    tags: {
      data: getTags(state).items,
      validationItems: getTagsTitle(state)
    },
    contacts: {
      data: getContacts(state).items,
      validationItems: getContactsEmail(state)
    }
  }
  const validationItems = storeData[dataType].validationItems
  let data = storeData[dataType].data

  if (selectedItems[dataType] !== null) {
    data = R.symmetricDifferenceWith(eqA, storeData[dataType].data, selectedItems[dataType].toArray())
  }

  return {
    validationItems,
    hints: {
      [dataType]: data
    },
  }
}

const mapDispatchToProps = { hintSelected }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleItemDelete: props => item => props.onItemDelete(item),
    onHandleClearFilter: props => event => {
      event.stopPropagation()
      props.onClearFilter()
    },
    onHandleAddInputRef: props => ref => {
      if (props.isFocusTagTree && ref) {
        props.onAddInputRef(ref)
      }
    },
    onHandleHintSelected: props => (location, context, hint) => props.hintSelected(location, context, hint),
  })
)(Autocomplete)
