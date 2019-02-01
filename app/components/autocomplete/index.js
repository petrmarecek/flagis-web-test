import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { hintSelected } from 'redux/store/app-state/app-state.actions'
import { getTags, getTagsTitle } from 'redux/store/tags/tags.selectors'
import {
  getContacts,
  getContactsEmail,
} from 'redux/store/contacts/contacts.selectors'

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
    inputValue,
    hints,
    validationItems,
    isWithoutItems,
    isWithoutInput,
    isInputMode,
    isAllowUpdate,
    isHideItemDelete,
    parentId,
    onClearFilter,
    onBlurTagTree,
    onHandleAddInputRef,
    onHandleItemDelete,
    onHandleClearFilter,
    onHandleDeselectInput,
    onHandleHintSelected,
  } = props
  const paddingTop = location === 'taskDetailTags' || location === 'mainSearch'
  const taskDetailTags = location === 'taskDetailTags'

  return (
    <AutocompleteContainer
      taskDetailTags={taskDetailTags}
      paddingTop={paddingTop}
    >
      {!isWithoutItems && (
        <AutocompleteItems
          items={selectedItems}
          dataType={dataType}
          location={location}
          onDelete={onHandleItemDelete}
          isHideDelete={isHideItemDelete}
        />
      )}
      {!isWithoutItems && onClearFilter && (
        <Clear onClick={onHandleClearFilter}>
          <Icon
            icon={ICONS.CROSS_SIMPLE}
            width={10}
            height={10}
            scale={0.71}
            color={['#B1B5B8']}
          />
        </Clear>
      )}
      {!isWithoutInput && (
        <Search key="search" taskDetailTags={location === 'taskDetailTags'}>
          <AutocompleteInput
            location={location}
            dataType={dataType}
            hints={hints}
            validationItems={validationItems}
            isAllowUpdate={isAllowUpdate}
            placeholder={placeholder}
            inputValue={inputValue}
            isInputMode={isInputMode}
            parentId={parentId}
            onBlurTagTree={onBlurTagTree}
            onAddInputRef={onHandleAddInputRef}
            hintSelected={onHandleHintSelected}
            onDeselectInput={onHandleDeselectInput}
          />
        </Search>
      )}
    </AutocompleteContainer>
  )
}

Autocomplete.propTypes = {
  dataType: PropTypes.string,
  location: PropTypes.string,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  isWithoutItems: PropTypes.bool,
  isWithoutInput: PropTypes.bool,
  isInputMode: PropTypes.bool,
  isFocusTagTree: PropTypes.bool,
  isAllowUpdate: PropTypes.bool,
  isHideItemDelete: PropTypes.bool,
  selectedItems: PropTypes.object,
  parentId: PropTypes.string,
  hints: PropTypes.object,
  validationItems: PropTypes.object,
  onBlurTagTree: PropTypes.func,
  onAddInputRef: PropTypes.func,
  onItemDelete: PropTypes.func,
  onClearFilter: PropTypes.func,
  onDeselectInput: PropTypes.func,
  onHandleAddInputRef: PropTypes.func,
  onHandleItemDelete: PropTypes.func,
  onHandleClearFilter: PropTypes.func,
  onHandleDeselectInput: PropTypes.func,
  onHandleHintSelected: PropTypes.func,
}

const mapStateToProps = (state, props) => {
  const { selectedItems, dataType, isInputMode } = props
  let inputValue = ''
  const eqA = R.eqBy(R.prop('id'))

  // Get data of tags and contacts from store
  const storeData = {
    tags: {
      data: getTags(state).items,
      validationItems: getTagsTitle(state),
    },
    contacts: {
      data: getContacts(state).items,
      validationItems: getContactsEmail(state),
    },
  }

  // validationItems for create new item
  const validationItems = storeData[dataType].validationItems
  let data = storeData[dataType].data

  if (selectedItems[dataType] !== null) {
    // From data for hints remove selectedItems
    data = R.differenceWith(
      eqA,
      storeData[dataType].data,
      selectedItems[dataType].toArray()
    )

    // Get value of item for input mode
    if (isInputMode) {
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })
      const item = selectedItems[dataType].first()
      inputValue = itemValue(item)[dataType]
    }
  }

  return {
    inputValue,
    validationItems,
    hints: {
      [dataType]: data,
    },
  }
}

const mapDispatchToProps = { hintSelected }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleDeselectInput: props => () => props.onDeselectInput(),
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
    onHandleHintSelected: props => (location, context, hint) =>
      props.hintSelected(location, context, hint),
  })
)(Autocomplete)
