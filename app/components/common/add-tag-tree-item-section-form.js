import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose'
import { isStringEmpty } from 'redux/utils/component-helper'
import { autocompleteLocations } from 'components/autocomplete/enums'

// redux
import { connect } from 'react-redux'
import { getColorTheme } from 'redux/store/auth/auth.selectors'
import { getTagsOfTree } from 'redux/store/tree/tree.selectors'

// component
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'

// styles
import styled from 'styled-components'
import {
  fontMain,
  commonInputSmall,
  placeholderColor,
} from '../styled-components-mixins'
import colors from 'components/styled-components-mixins/colors'
import UserFilterIcon from 'components/icons/user-filter-icon'

const AddItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0;
  padding: 0 7px;
  position: relative;
  height: 26px;
  ${fontMain};
`

const ItemInput = styled.div`
  margin-left: 2px;

  input {
    ${fontMain};
    font-size: 14px;
    color: ${colors.tagTreeAddFilterInput};
    border: none !important;
    padding: 0;
  }
`

const AddSection = styled.div`
  margin: 10px 14px 0 7px;
`

const SectionInput = styled.input`
  ${commonInputSmall}
  ${placeholderColor(colors.tagTreeAddNewGroupInputPlaceholder)}
  color: ${props => colors[props.colorTheme].tagTreeAddNewGroupInput};
  font-size: 14px;
  padding: 5px;
`

const AddTagTreeItemSectionForm = props => {
  const {
    parentId,
    colorTheme,
    selectedItems,
    getInputRef,
    onHandleBlur,
    onHandleKeyDown,
    type,
  } = props

  if (parentId === null) {
    return (
      <AddSection>
        <SectionInput
          ref={getInputRef}
          placeholder="Add Title"
          type="text"
          onKeyDown={onHandleKeyDown}
          onBlur={onHandleBlur}
          colorTheme={colorTheme}
        />
      </AddSection>
    )
  }

  if (type === 'contacts') {
    return (
      <AddItem>
        <UserFilterIcon />
        <ItemInput>
          <Autocomplete
            dataType="contacts"
            location={autocompleteLocations.TAG_TREE}
            placeholder="Add contact filter"
            selectedItems={selectedItems}
            onAddInputRef={getInputRef}
            onBlurTagTree={onHandleBlur}
            parentId={parentId}
            isWithoutItems
            isFocusTagTree
          />
        </ItemInput>
      </AddItem>
    )
  }

  return (
    <AddItem>
      <Icon
        icon={ICONS.TAG}
        width={20}
        height={11}
        color={[colors.tagTreeAddFilterIcon]}
      />
      <ItemInput>
        <Autocomplete
          dataType="tags"
          location={autocompleteLocations.TAG_TREE}
          placeholder="Add tag filter"
          selectedItems={selectedItems}
          parentId={parentId}
          onAddInputRef={getInputRef}
          onBlurTagTree={onHandleBlur}
          isWithoutItems
          isFocusTagTree
        />
      </ItemInput>
    </AddItem>
  )
}

AddTagTreeItemSectionForm.propTypes = {
  parentId: PropTypes.string,
  colorTheme: PropTypes.string,
  selectedItems: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  inputRef: PropTypes.object,
  setInputRef: PropTypes.func,
  getInputRef: PropTypes.func,
  onHandleBlur: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
  type: PropTypes.string,
}

const mapStateToProps = (state, props) => ({
  selectedItems: getTagsOfTree(state, props.parentId)(state),
  colorTheme: getColorTheme(state),
})

export default compose(
  pure,
  connect(mapStateToProps),
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    getInputRef: props => ref => props.setInputRef(ref),
    onHandleBlur: props => () => props.onCancel(),
    onHandleSubmit: props => () => {
      const title = props.inputRef.value

      // validation
      if (isStringEmpty(title)) {
        props.onCancel()
        return
      }

      props.onSubmit(title)
    },
  }),
  withHandlers({
    onHandleKeyDown: props => event => {
      switch (event.which) {
        // escape
        case 27:
          props.onHandleBlur()
          return

        // sumit (enter key)
        case 13:
          event.preventDefault()
          props.onHandleSubmit()
          return

        default:
          return
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      window.setTimeout(() => {
        if (this.props.inputRef) {
          this.props.inputRef.focus()
        }
      }, 10)
    },
  })
)(AddTagTreeItemSectionForm)
