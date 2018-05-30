import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class AddTreeItemSectionForm extends PureComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onSubmiting: PropTypes.func,
    onSubmit: PropTypes.func
  }

  componentDidMount() {
    this.refs.title.focus()
  }

  handleKeyDown = event => {

    switch (event.which) {
      // escape
      case 27:
        this.handleBlur()
        return

      // sumit (enter key)
      case 13:
        event.preventDefault()
        this.handleSubmit()
        return
      default:
        return
    }
  }

  handleSubmit() {

    // raise submitting event
    const title = this.refs.title.value
    const eventArgs = { canceled: false, title }
    this.props.onSubmiting(eventArgs)

    // if the event was stopped
    if (eventArgs.canceled) {
      return false
    }

    // raise submit event
    this.props.onSubmit({ id: -1, title })
    return true
  }

  handleBlur = () => {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render() {
    return (
      <input ref="title" placeholder="Add section" type="text"
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}/>
    )
  }
}

export default AddTreeItemSectionForm
