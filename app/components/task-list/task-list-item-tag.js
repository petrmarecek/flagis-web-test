import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from 'redux/utils/common'

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

  getColorIndex() {
    return this.props.model.colorIndex === null
      ? utils.computeIntHash(this.props.model.title, 10)
      : this.props.model.colorIndex
  }

  render() {
    const colorIndex = this.getColorIndex()
    const tagClass = `tag cl-${colorIndex}`

    return (
      <span className={tagClass} onClick={this.handleClicked}>{this.props.model.title}</span>
    )
  }
}

export default TaskListItemTag
