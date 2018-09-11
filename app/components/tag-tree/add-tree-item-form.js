import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getTagsOfTree } from '../../redux/store/tree/tree.selectors'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'
import AddTreeItemSectionForm from 'components/tag-tree/add-tree-item-section-form'

class AddTreeItemForm extends PureComponent {

  static propTypes = {
    parentId: PropTypes.string,
    forbiddenTitles: PropTypes.array,
    selectedItems: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  state = {
    inputRef: null
  }

  componentDidUpdate() {
    this.state.inputRef.focus()
  }

  handleAddInputRef = ref => {
    this.setState({ inputRef: ref })
  }

  handleOnBlur = () => {
    this.props.onCancel()
  }

  handleSubmit = tag => {

    // Get result of the add form
    const result = {
      title: tag.title,
      parentId: this.props.parentId,
      order: Date.now()
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

  renderItemAddForm() {
    const classObj = this.getFormClass()

    return (
      <div ref="container" className={classObj}>
        <span className="icon main">
          <Icon
            icon={ICONS.TAG}
            width={20}
            height={11}
            color={["#91a19a"]}/>
        </span>
        <div className="input-container">
          <Autocomplete
            dataType="tags"
            location="tagTree"
            placeholder="Add filter"
            selectedItems={this.props.selectedItems}
            parentId={this.props.parentId}
            onAddInputRef={this.handleAddInputRef}
            onBlurTagTree={this.handleOnBlur}
            isWithoutItems
            isFocusTagTree />
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

const mapStateToProps = (state, props) => ({
  selectedItems: getTagsOfTree(state, props.parentId)(state)
})

export default connect(mapStateToProps)(AddTreeItemForm)
