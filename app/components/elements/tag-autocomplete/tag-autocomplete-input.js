import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import domUtils from 'redux/utils/dom'
import {
  tagAutocompleteBlur,
  tagAutocompleteFocus,
  tagAutocompleteGoNext,
  tagAutocompleteGoPrev,
  tagAutocompleteTextChanged,
  tagAutocompletePositionChanged,
  tagAutocompleteSubmit,
  tagAutocompleteReset,
} from 'redux/store/app-state/app-state.actions'
import {
  getTagAutocompletes,
  getTagHintsRaw,
} from 'redux/store/app-state/app-state.selectors'
import { getTags } from 'redux/store/tags/tags.selectors'
import { getCurrentTaskTags } from 'redux/store/tasks/tasks.selectors'
import commonUtils from 'redux/utils/common'

const HINTS_TOP_OFFSET = -30
const HINTS_LEFT_OFFSET = 115

class TagAutocompleteInput extends Component {

  static propTypes = {
    id: PropTypes.string,
    onCancel: PropTypes.func,
    placeholder: PropTypes.string,
    allowMultiSelect: PropTypes.bool,
    selectedItem: PropTypes.object,
    tags: PropTypes.object,
    context: PropTypes.object,
    text: PropTypes.string.isRequired,
    focus: PropTypes.number,
    hintsVisible: PropTypes.bool.isRequired,
    tagsCount: PropTypes.number.isRequired,
    blurOnSubmit: PropTypes.bool,

    tagAutocompleteBlur: PropTypes.func,
    tagAutocompleteFocus: PropTypes.func,
    tagAutocompleteGoNext: PropTypes.func,
    tagAutocompleteGoPrev: PropTypes.func,
    tagAutocompleteTextChanged: PropTypes.func,
    tagAutocompletePositionChanged: PropTypes.func,
    tagAutocompleteSubmit: PropTypes.func,
    tagAutocompleteReset: PropTypes.func,
  }

  selectionIndex = 0

  focus() {
    this.refs.title.focus()
  }

  componentDidMount() {

    // Move hints popup when window is resized
    window.addEventListener('resize', this.updateHintsPosition)
  }

  componentWillUnmount() {

    // Unsubscribe out-off control clicks
    window.removeEventListener('resize', this.updateHintsPosition)

    // Hide hints
    this.props.tagAutocompleteBlur(this.props.id)
  }

  componentDidUpdate(prevProps) {

    // This is little hack which allows us to set input focus trough Redux
    const { focus, hintsVisible, tagsCount } = this.props
    const { focus: previousFocus, tagsCount: previousTagsCount } = prevProps

    // If user clicked on tag hint -> reset focus to input
    if (focus && focus !== previousFocus) {
      this.focus()
    }

    // If number of tags changed and hints are visible --> update hints window position
    if (tagsCount !== previousTagsCount && hintsVisible) {
      this.updateHintsPosition()
    }
  }

  handleKeyDown = event => {

    switch (event.which) {

      // escape
      case 27:
        this.handleBlur()
        this.props.tagAutocompleteBlur(this.props.id)
        this.raiseCancelEvent()
        return

      // submit (enter key)
      case 13:
        event.preventDefault()
        this.handleSubmit()
        return

      // arrow up key
      case 38:
        event.preventDefault()
        this.selectionIndex--
        this.props.tagAutocompleteGoPrev(this.props.id)
        return

      // arrow down key
      case 40:
        event.preventDefault()
        this.selectionIndex++
        this.props.tagAutocompleteGoNext(this.props.id)
        return

      default:
        this.updateHintsPosition()
    }
  }

  handleChange = event => {

    // Get new search value
    const text = event.target.value

    // Update hints
    const position = this.getInputPosition()
    this.props.tagAutocompleteTextChanged(this.props.id, text, position)
  }

  handleSubmit = () => {
    const selectedItem = this.props.selectedItem.toJS()
    if (selectedItem === null || !selectedItem.title) {
      return
    }

    // raise submit event
    this.props.tagAutocompleteSubmit(this.props.id, this.props.context, {
      id: selectedItem.isNew ? commonUtils.clientUid() : selectedItem.id,
      isNew: selectedItem.isNew,
      title: selectedItem.title,
    })

    if (this.props.blurOnSubmit) {
      this.refs.title.blur()
    }
  }

  handleFocus = () => {
    this.props.tagAutocompleteFocus(this.props.id, {
      context: this.props.context,
      tags: this.props.tags.items,
      position: this.getInputPosition(),
      search: this.refs.title.value,
    })
  }

  handleBlur = () => {

    // Clear tag title
    if (this.props.id !== "treeUpdate") {
      this.props.tagAutocompleteReset(this.props.id)
      this.refs.title.blur()
    }
  }

  raiseCancelEvent() {
    if (this.props.onCancel) {
      this.props.onCancel(this.props.id)
    }
  }

  updateHintsPosition = () => {
    const position = this.getInputPosition()
    this.props.tagAutocompletePositionChanged(this.props.id, position)
  }

  getInputPosition() {
    const position = domUtils.getOffset(this.refs.title)
    position.top -= HINTS_TOP_OFFSET
    position.left -= this.props.id === 'task'
      ? HINTS_LEFT_OFFSET
      : 0

    return position
  }

  render() {
    const size = this.props.id === 'task'
      ? 5
      : 10

    return (
      <div ref="container" className="tag-autocomplete__input-container js-ignore-hints-hide">
        <input ref="title" className="tag-autocomplete__input" type="text"
          autoComplete="off"
          size={size}
          placeholder={this.props.placeholder}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={this.props.text} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const autocomplete = getTagAutocompletes(state)
  const autocompleteData = autocomplete[props.id]
  const tagHints = getTagHintsRaw(state)
  return {
    selectedItem: tagHints.selectedItem,
    hintsVisible: tagHints.isVisible,
    text: autocompleteData.text,
    focus: autocompleteData.focus,
    tagsCount: getCurrentTaskTags(state).size,
    tags: getTags(state),
  }
}

const mapDispatchToProps = {
  tagAutocompleteBlur,
  tagAutocompleteFocus,
  tagAutocompleteGoNext,
  tagAutocompleteGoPrev,
  tagAutocompleteTextChanged,
  tagAutocompletePositionChanged,
  tagAutocompleteSubmit,
  tagAutocompleteReset,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(TagAutocompleteInput)
