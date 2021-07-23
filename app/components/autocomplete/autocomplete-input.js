import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { createPortal, findDOMNode } from 'react-dom'
import domUtils from 'redux/utils/dom'
import commonUtils from 'redux/utils/common'
import { validateAddContact } from 'redux/utils/validate'
import {
  isObjectEmpty,
  getHintDirectionRender,
} from 'redux/utils/component-helper'
import constants from 'utils/constants'
import { autocompleteLocations } from 'components/autocomplete/enums'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

import Hints from '../hints'

import { InputContainer, Input } from './styles'

const getInputPosition = (location, ref) => {
  const position = domUtils.getOffset(ref)
  position.top += 30
  position.left -= location === autocompleteLocations.TASK_DETAIL_TAGS ? 115 : 0

  return position
}

const withAutocompleteInput = WrappedComponent => {
  return class WithAutocompleteInput extends PureComponent {
    static propTypes = {
      location: PropTypes.string,
      dataType: PropTypes.string,
      hints: PropTypes.object,
      validationItems: PropTypes.object,
      isAllowUpdate: PropTypes.bool,
      isInputMode: PropTypes.bool,
      placeholder: PropTypes.string,
      inputValue: PropTypes.string,
      parentId: PropTypes.string,
      onBlurTagTree: PropTypes.func,
      onAddInputRef: PropTypes.func,
      onDeselectInput: PropTypes.func,
      hintSelected: PropTypes.func,
    }

    state = {
      showHints: false,
      parentId: this.props.parentId,
      position: null,
      hintsData: this.props.hints,
      selectIndex: 0,
      value: this.props.inputValue,
      inputRef: null,
      scrollRef: null,
      hintRef: null,
    }

    getInputRef = ref => {
      this.props.onAddInputRef(ref)
      this.setState({ inputRef: ref })
    }

    getScrollRef = ref => {
      this.setState({ scrollRef: ref })
    }

    getHintRef = ref => {
      this.setState({ hintRef: ref })
    }

    getViewPosition = positionTop => {
      const directionRender = getHintDirectionRender(positionTop)
      let top = positionTop + constants.TITLE_HEIGHT
      let bottom = constants.WINDOW_HEIGHT - constants.OFFSET

      if (directionRender === 'bottomToTop') {
        top = constants.OFFSET - constants.TITLE_HEIGHT
        bottom =
          positionTop -
          constants.TITLE_HEIGHT -
          constants.AUTOCOMPLETE_INPUT_HEIGHT
      }

      return { top, bottom }
    }

    static getDerivedStateFromProps(props, state) {
      const { hintsData, inputRef, value, parentId, scrollRef } = state
      const { hints, dataType, isAllowUpdate, location } = props

      if (!isAllowUpdate) {
        return null
      }

      if (value !== '') {
        return null
      }

      // Switch task in task-detail(tag-hints in task-detail)
      if (props.parentId !== parentId) {
        return {
          hintsData: { [dataType]: hints[dataType] },
          parentId: props.parentId,
        }
      }

      // Show hints if hints were changed(tag-hints in task-detail)
      if (hints[dataType].length !== hintsData[dataType].length) {
        inputRef.focus()

        if (scrollRef) {
          scrollRef.scrollToTop()
        }

        return {
          showHints: true,
          position: getInputPosition(location, inputRef),
          hintsData: { [dataType]: hints[dataType] },
          selectIndex: 0,
        }
      }

      return null
    }

    onHandleFocus = event => {
      const { inputRef, value } = this.state
      const { hints, dataType, location, isInputMode } = this.props
      const inputValue = isInputMode ? value : event.target.value
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })

      // Filter hints by value of input
      const hintsData = {
        [dataType]: !isInputMode
          ? hints[dataType].filter(item => {
              const values = itemValue(item)[dataType]
              return values.toLowerCase().startsWith(inputValue.toLowerCase())
            })
          : hints[dataType],
      }

      this.setState({
        showHints: true,
        position: getInputPosition(location, inputRef),
        hintsData,
        value: inputValue,
        selectIndex: 0,
      })
    }

    onHandleSelectIndex = index => {
      this.setState({ selectIndex: index })
    }

    onHandleKeyDown = event => {
      const {
        showHints,
        selectIndex,
        inputRef,
        scrollRef,
        hintRef,
        hintsData,
        position,
      } = this.state
      const { dataType, onBlurTagTree } = this.props
      if (!showHints) {
        return
      }

      const viewPosition = this.getViewPosition(position.top)
      const hintPosition = findDOMNode(hintRef).getBoundingClientRect()
      const hintsLength = hintsData[dataType].length - 1
      let index = selectIndex

      switch (event.which) {
        // escape
        case 27:
          inputRef.blur()

          if (onBlurTagTree) {
            onBlurTagTree()
          }

          this.setState({ showHints: false })
          return

        // enter
        case 13:
          this.onHandleSubmit()
          return

        // arrow up key
        case 38:
          // Scrollbar is showed
          if (scrollRef !== null) {
            // if hint isn't showed, scroll top
            if (hintPosition.top - constants.HINT_HEIGHT < viewPosition.top) {
              scrollRef.view.scrollTop -= constants.HINT_HEIGHT
            }

            // if selectindex is 0, scroll to top
            if (index === 0) {
              scrollRef.scrollToBottom()
            }
          }

          this.setState({ selectIndex: index === 0 ? hintsLength : --index })
          return

        // arrow down key
        case 40:
          // Scrollbar is showed
          if (scrollRef !== null) {
            // if hint isn't showed, scroll bottom
            if (
              hintPosition.bottom + constants.HINT_HEIGHT >
              viewPosition.bottom
            ) {
              scrollRef.view.scrollTop += constants.HINT_HEIGHT
            }

            // if selectindex is max, scroll to bottom
            if (index === hintsLength) {
              scrollRef.scrollToTop()
            }
          }

          this.setState({ selectIndex: index === hintsLength ? 0 : ++index })
          return

        default:
          return
      }
    }

    onHandleChange = event => {
      const { hints, dataType, isInputMode } = this.props
      const value = event.target.value
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })

      // check max characters for tags
      if (
        dataType === 'tags' &&
        value.length > constants.TAGS_TITLE_MAX_CHARACTERS
      ) {
        return
      }

      // Deselect input for input mode
      if (isInputMode) {
        this.props.onDeselectInput()
      }

      // Filter hints by value of input
      const hintsData = {
        [dataType]: hints[dataType].filter(item => {
          const values = itemValue(item)[dataType]
          return values.toLowerCase().startsWith(value.toLowerCase())
        }),
      }

      this.setState({ hintsData, value, selectIndex: 0 })
    }

    onHandleClickOutside = event => {
      const { inputRef } = this.state
      const { onBlurTagTree } = this.props

      // Click to input
      if (event.target === inputRef) {
        inputRef.focus()

        return
      }

      this.setState({ showHints: false })
      if (onBlurTagTree) {
        onBlurTagTree()
      }
    }

    onHandleSubmit = (submitType = null) => {
      const { hintsData, selectIndex, value, inputRef } = this.state
      const {
        location,
        parentId,
        dataType,
        validationItems,
        onBlurTagTree,
        isInputMode,
      } = this.props

      // Click on Sent Me button in tasksMenu for assignee filter
      if (submitType === 'sendMe') {
        // Select Hint
        this.props.hintSelected(location, { isSendMe: true })

        // Reset state
        this.setState({ showHints: false, value: 'Me' })
        inputRef.blur()
        if (onBlurTagTree) {
          onBlurTagTree()
        }

        return
      }

      // Click on Sent All button in tasksMenu for assignee filter
      if (submitType === 'sendAll') {
        // Select Hint
        this.props.hintSelected(location, { isSendAll: true })

        // Reset state
        this.setState({ showHints: false, value: 'All' })
        inputRef.blur()
        if (onBlurTagTree) {
          onBlurTagTree()
        }

        return
      }

      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })
      const itemType = {
        tags: 'title',
        contacts: 'email',
      }
      const isNewHint = hintsData[dataType].length === 0
      let hint = hintsData[dataType][selectIndex]
      const context = { isNewHint, parentId }
      const hintValue = isNewHint ? value : itemValue(hint)[dataType]
      const hintType = dataType.slice(0, dataType.length - 1)

      // Email validation of new contact
      if (isNewHint && dataType === 'contacts') {
        const values = Map().set('email', value)
        const validation = validateAddContact(values)

        if (!isObjectEmpty(validation)) {
          toast.error(validation.email, {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          })

          return
        }
      }

      // Validation existing item(tag, contact) of new item
      if (isNewHint && validationItems.includes(hintValue.toLowerCase())) {
        toast.error(
          toastCommon.errorMessages.createEntity.createConflict(hintType),
          {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          }
        )

        return
      }

      // Data of new item
      if (isNewHint) {
        hint = {
          id: commonUtils.clientUid(),
          [itemType[dataType]]: value,
          isNew: isNewHint,
        }
      }

      // Select Hint
      this.props.hintSelected(location, context, hint)

      // Reset state
      this.setState({ showHints: false, value: isInputMode ? hintValue : '' })

      // Reset input
      inputRef.value = ''
      inputRef.blur()

      // Hide autocomplete in tag-tree
      if (onBlurTagTree) {
        onBlurTagTree()
      }
    }

    render() {
      return (
        <WrappedComponent
          getInputRef={this.getInputRef}
          getScrollRef={this.getScrollRef}
          getHintRef={this.getHintRef}
          onHandleFocus={this.onHandleFocus}
          onHandleSelectIndex={this.onHandleSelectIndex}
          onHandleKeyDown={this.onHandleKeyDown}
          onHandleChange={this.onHandleChange}
          onHandleSubmit={this.onHandleSubmit}
          onHandleClickOutside={this.onHandleClickOutside}
          {...this.state}
          {...this.props}
        />
      )
    }
  }
}

const AutocompleteInput = props => {
  const {
    hintsData,
    dataType,
    position,
    value,
    placeholder,
    selectIndex,
    showHints,
    location,
    getInputRef,
    getScrollRef,
    getHintRef,
    onHandleFocus,
    onHandleKeyDown,
    onHandleChange,
    onHandleSelectIndex,
    onHandleClickOutside,
    onHandleSubmit,
  } = props

  const hintsElement = document.getElementById('floating-components-hints')
  const hints = (
    <Hints
      hints={hintsData}
      dataType={dataType}
      position={position}
      value={value}
      selectIndex={selectIndex}
      location={location}
      addScrollRef={getScrollRef}
      addHintRef={getHintRef}
      onSelectIndex={onHandleSelectIndex}
      onHandleClickOutside={onHandleClickOutside}
      onSubmit={onHandleSubmit}
    />
  )

  return (
    <InputContainer>
      <Input
        ref={ref => getInputRef(ref)}
        type="text"
        autoComplete="off"
        size={location === autocompleteLocations.TASK_DETAIL_TAGS ? 5 : 15}
        placeholder={placeholder}
        onFocus={onHandleFocus}
        onKeyDown={onHandleKeyDown}
        onChange={onHandleChange}
        mainSearch={location === autocompleteLocations.MAIN_SEARCH}
        value={value}
        title="Create or select existing"
      />
      {hintsElement && showHints && createPortal(hints, hintsElement)}
    </InputContainer>
  )
}

AutocompleteInput.propTypes = {
  hintsData: PropTypes.object,
  dataType: PropTypes.string,
  position: PropTypes.object,
  value: PropTypes.string,
  selectIndex: PropTypes.number,
  placeholder: PropTypes.string,
  showHints: PropTypes.bool,
  location: PropTypes.string,
  getInputRef: PropTypes.func,
  getScrollRef: PropTypes.func,
  getHintRef: PropTypes.func,
  onHandleFocus: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
  onHandleChange: PropTypes.func,
  onHandleSelectIndex: PropTypes.func,
  onHandleClickOutside: PropTypes.func,
  onHandleSubmit: PropTypes.func,
}

export default withAutocompleteInput(AutocompleteInput)
