import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getColorIndex } from 'redux/utils/component-helper'

class TaskListItemTag extends PureComponent {

  static propTypes = {
    model: PropTypes.object,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClicked = this.handleClicked.bind(this)
  }

  handleClicked(event) {
    event.stopPropagation()
    this.props.onClick(this.props.model)
  }

  render() {
    const model = this.props.model
    const colorIndex = getColorIndex(model.colorIndex, model.title)
    const tagClass = `tag cl-${colorIndex}`

    return (
      <span className={tagClass} onClick={this.handleClicked}>{this.props.model.title}</span>
    )
  }
}

export default TaskListItemTag
