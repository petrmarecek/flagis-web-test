import React, {PureComponent} from 'react'
import { createPortal } from 'react-dom'
import domUtils from 'redux/utils/dom'
import Hints from '../hints'
import { Input } from './styles'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import commonUtils from 'redux/utils/common'

/* eslint react/prop-types: 0 */

const getInputPosition = (location, ref) => {
  const position = domUtils.getOffset(ref)
  position.top += 30
  position.left -= location === 'taskDetailTags'
    ? 115
    : 0

  return position
}

const withAutocompleteInput = WrappedComponent => {
  return class WithAutocompleteInput extends PureComponent {

    state = {
      showHints: false,
      parentId: this.props.parentId,
      position: null,
      hintsData: this.props.hints,
      selectIndex: 0,
      value: '',
      inputRef: null,
    }

    getInputRef = ref => {
      this.props.onAddInputRef(ref)
      this.setState({ inputRef: ref })
    }

    static getDerivedStateFromProps(props, state) {
      const { hintsData, inputRef, value, parentId } = state
      const { hints, dataType, isAllowUpdate, location } = props

      if (!isAllowUpdate) {
        return null
      }

      if (value !== '') {
        return null
      }

      if (props.parentId !== parentId) {
        return ({
          hintsData: { [dataType]: hints[dataType] },
          parentId: props.parentId
        })
      }

      if ((hints[dataType].length !== hintsData[dataType].length)) {
        inputRef.focus()

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
      const { inputRef } = this.state
      const { hints, dataType, location } = this.props
      const value = event.target.value
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })

      const hintsData = {
        [dataType]: hints[dataType].filter(item => itemValue(item)[dataType].startsWith(value))
      }

      this.setState({
        showHints: true,
        position: getInputPosition(location, inputRef),
        hintsData,
        value,
        selectIndex: 0,
      })
    }

    onHandleSelectIndex = index => {
      this.setState({ selectIndex: index })
    }

    onHandleKeyDown = event => {
      const { selectIndex, inputRef, hintsData } = this.state
      const { dataType, onBlurTagTree } = this.props
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
          this.setState({ selectIndex: index === 0 ? hintsLength : --index })
          return

        // arrow down key
        case 40:
          this.setState({ selectIndex: index === hintsLength ? 0 : ++index })
          return

        default:
          return
      }
    }

    onHandleChange = event => {
      const { hints, dataType } = this.props
      const value = event.target.value
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })

      const hintsData = {
        [dataType]: hints[dataType].filter(item => itemValue(item)[dataType].startsWith(value))
      }

      this.setState({ hintsData, value, selectIndex: 0 })
    }

    onHandleClickOutside = event => {
      const { inputRef } = this.state
      const { onBlurTagTree } = this.props

      if (event.target === inputRef) {
        inputRef.focus()
        return
      }

      this.setState({ showHints: false })
      if (onBlurTagTree) {
        onBlurTagTree()
      }
    }

    onHandleSubmit = () => {
      const itemValue = item => ({
        tags: item.title,
        contacts: item.email,
      })
      const { hintsData, selectIndex, value, inputRef } = this.state
      const { location, parentId, dataType, validationItems, onBlurTagTree } = this.props
      const isNewHint = hintsData[dataType].length === 0
      let hint = hintsData[dataType][selectIndex]
      const context = { isNewHint, parentId }
      const hintValue = isNewHint ? value : itemValue(hint)[dataType]

      if (isNewHint && validationItems.includes(hintValue.toLowerCase())) {
        toast.error(errorMessages.autocomplete.createConflict, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_ERROR_DURATION,
        })
        return
      }

      if (isNewHint) {
        hint = {
          id: commonUtils.clientUid(),
          title: value,
          isNew: isNewHint
        }
      }

      this.props.hintSelected(location, context, hint)

      inputRef.value = ''
      this.setState({ showHints: false, value: '' })
      if (onBlurTagTree) {
        onBlurTagTree()
      }
    }

    render() {
      return (
        <WrappedComponent
          getInputRef={this.getInputRef}
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
  const hintsElement = document.getElementById('floating-components-hints')
  const hints = (
    <Hints
      hints={props.hintsData}
      dataType={props.dataType}
      position={props.position}
      value={props.value}
      selectIndex={props.selectIndex}
      onSelectIndex={props.onHandleSelectIndex}
      onHandleClickOutside={props.onHandleClickOutside}
      onSubmit={props.onHandleSubmit} />
  )

  return (
    <div>
      <Input
        innerRef={ref => { props.getInputRef(ref) }}
        type="text"
        autoComplete="off"
        size={props.location === 'taskDetailTags' ? 5 : 10}
        placeholder={props.placeholder}
        onFocus={props.onHandleFocus}
        onKeyDown={props.onHandleKeyDown}
        onChange={props.onHandleChange}
        mainSearch={props.location === 'mainSearch'} />
      {hintsElement && props.showHints && createPortal(hints, hintsElement)}
    </div>
  )
}

export default withAutocompleteInput(AutocompleteInput)
