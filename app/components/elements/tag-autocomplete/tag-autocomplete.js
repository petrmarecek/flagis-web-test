import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import TagAutocompleteItem from './tag-autocomplete-item'
import TagAutocompleteInput from './tag-autocomplete-input'
import Icon from '../../icons/icon'
import { ICONS } from '../../icons/icon-constants'

export default class TagAutocomplete extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    allowMultiSelect: PropTypes.bool.isRequired,
    selectedTags: PropTypes.object.isRequired,
    onTagDeleted: PropTypes.func.isRequired,
    focusOnDelete: PropTypes.bool.isRequired,
    blurOnSubmit: PropTypes.bool,
    context: PropTypes.object,
    className: PropTypes.string,
    clearFilter: PropTypes.func,
  }

  static defaultProps = {
    blurOnSubmit: false,
  }

  state = {
    selectedTags: this.props.selectedTags
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      selectedTags: newProps.selectedTags
    })
  }

  handleTagDeleted = tagInfo => {
    this.props.onTagDeleted(tagInfo)
    if (this.props.focusOnDelete) {
      // Give browser opportunity to re-render input so that we can
      // get a new position
      window.setTimeout(() => this.setFocusToInput(), 0)
    }
  }

  handleClick = () => {
    this.setFocusToInput()
  }

  setFocusToInput() {
    this.refs.input.getWrappedInstance().focus()
  }

  render() {

    const css = cx({ 'tag-autocomplete': true }, this.props.className)

    const cssResults = cx({
      'tag-autocomplete__results': true,
      'tag-autocomplete__results--task-detail': this.props.id === 'task'
    })

    const cssSearch = cx({
      'tag-autocomplete__search': true,
      'tag-autocomplete__search--task-detail': this.props.id === 'task'
    })

    const tags = this.state.selectedTags.map(tag =>
      <TagAutocompleteItem
        key={tag.id}
        model={tag}
        onDelete={this.handleTagDeleted} />)

    return (
      <div className={css} onClick={this.handleClick} ref="container" data-id={this.props.id}>
        <ul className={cssResults}>
          {tags}
          {this.props.clearFilter &&
          <li
            className="tag-autocomplete__clear"
            onClick={this.props.clearFilter}>
            <Icon
              icon={ICONS.CROSS_SIMPLE}
              width={11}
              height={11}
              scale={0.78}
              color="#8c9da9" />
          </li>}
          <li key="search" className={cssSearch}>
            <TagAutocompleteInput
              id={this.props.id}
              ref="input"
              blurOnSubmit={this.props.blurOnSubmit}
              context={this.props.context}
              placeholder={this.props.placeholder}
              allowMultiSelect={this.props.allowMultiSelect}
              selectedTags={this.state.selectedTags} />
          </li>
        </ul>
      </div>
    )
  }
}
