import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createTag } from 'redux/store/tags/tags.actions'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class AddTagForm extends Component {

  static propTypes = {
    createTag: PropTypes.func.isRequired,
  }

  state = {
    subject: '',
    focused: false,
  }

  handleAddTag = () => {

    if (!AddTagForm.isNotEmpty(this.state.subject))
      return

    // extract data
    const tag = {
      title: this.state.subject
    }

    // dispatch action
    this.props.createTag(tag)

    // reset form
    this.setState({ subject: '' })
  }

  handleSubjectChanged = event => {
    this.setState({ subject: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.handleAddTag()
  }

  handleFocus = () => this.setState({ focused: true })
  handleBlur = () => this.setState({ focused: false })

  static isNotEmpty(str) {
    return str.trim().length !== 0
  }

  render() {
    const addButtonDisabled = !this.state.subject.trim()
    const plusColor = addButtonDisabled
      ? '#d7e3ec'
      : '#44FFB1'

    return (
      <form className="add-tag" autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="add-tag__submit" type="submit" onClick={this.handleSubmit} disabled={addButtonDisabled}>
          <Icon
            icon={ICONS.PLUS}
            width={16}
            height={16}
            scale={0.55}
            color={plusColor}/>
        </div>
        <div className="add-tag__subject-container">
          <input
            className="add-tag__subject"
            type="text"
            name="subject"
            ref="subject"
            placeholder="Add new tag"
            value={this.state.subject}
            onChange={this.handleSubjectChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur} />
        </div>
      </form>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { createTag }
export default connect(mapStateToProps, mapDispatchToProps)(AddTagForm)
