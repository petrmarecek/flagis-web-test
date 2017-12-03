import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { ICONS } from "../icons/icon-constants"
import Icon from '../icons/icon'

import TagAutocompleteInput from '../elements/tag-autocomplete/tag-autocomplete-input'
import AddTreeItemSectionForm from './add-tree-item-section-form'

export default class AddTreeItemForm extends Component {

  static propTypes = {
    parentId: PropTypes.string,
    forbiddenTitles: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    source: PropTypes.string,
  }

  componentDidMount() {
    if (!this.isSection()) {
      this.refs.input.getWrappedInstance().focus()
    }
  }

  handleOnBlur = () => {
    this.props.onCancel()
  }

  handleSubmit = tag => {

    // Get result of the add form
    const result = {
      parentId: this.props.parentId,
      title: tag.title,
      isSection: this.props.parentId === null
    }

    // Validate
    if (AddTreeItemForm.isEmpty(tag.title)) {
      this.props.onCancel()
      return
    }

    // Propagate
    this.props.onSubmit(result)
  }

  handleSubmitting = event => {

    // Validate not empty
    if (AddTreeItemForm.isEmpty(event.title)) {
      event.canceled = true
      return
    }

    // TODO: Validate name conflict
  }

  static isEmpty(title) {
    return title === null || title.trim() === ''
  }

  renderSectionAddForm() {
    const classObj = this.getFormClass()
    return (
      <div ref="container" className={classObj}>
        <div className="input-container">
          <AddTreeItemSectionForm
            placeholder="Add new section"
            onCancel={this.handleOnBlur}
            onSubmiting={this.handleSubmitting}
            onSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  }

  renderItemAddForm(parentId, selectedTags) {
    const classObj = this.getFormClass()
    const context = { source: 'tree', parentId }
    return (
      <div ref="container" className={classObj}>
        <span className="icon main">
          <Icon
            icon={ICONS.TAG}
            width={20}
            height={11}
            color="#91a19a"/>
        </span>
        <div className="input-container">
          <TagAutocompleteInput
            id="tree"
            ref="input"
            context={context}
            allowMultiSelect={false}
            placeholder="Add filter"
            onSubmit={this.handleSubmit}
            onSubmitting={this.handleSubmitting}
            onCancel={this.handleOnBlur}
            selectedTags={selectedTags}/>
        </div>
      </div>)
  }

  isSection() {
    return this.props.parentId === null
  }

  getFormClass() {
    const isSection = this.isSection()
    return classnames({
      'add-tree-item': true,
      'add-tree-item--type-item': !isSection,
      'add-tree-item--type-section': isSection
    })
  }

  render() {
    const selectedTags = []
    return this.isSection()
      ? this.renderSectionAddForm()
      : this.renderItemAddForm(this.props.parentId, selectedTags)
  }

}
