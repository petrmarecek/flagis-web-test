import React, { Component } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import { connect } from 'react-redux'

class TasksProgressBar extends Component {

  static propTypes = {
    tasksCount: PropTypes.number,
    completedTasksCount: PropTypes.number,
  }

  state = {
    width: this.props.completedTasksCount !== 0
      ? Math.round((this.props.completedTasksCount * 200) / this.props.tasksCount)
      : 0
  }

  componentDidMount() {
    velocity(this.refs.elem, 'transition.fadeIn', { duration: 600 })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.completedTasksCount !== 0) {
      const count = Math.round((newProps.completedTasksCount * 200) / newProps.tasksCount)
      this.setState({ width: count })
    } else {
      this.setState({ width: 0 })
    }
  }

  render() {
    const { tasksCount, completedTasksCount } = this.props
    const { width } = this.state
    const count = `${completedTasksCount}/${tasksCount}`
    return (
      <div
        ref="elem"
        className="tasks-progress-bar">
        <div className="tasks-progress-bar__count">
          {count}
        </div>
        <span className="tasks-progress-bar__line"/>
        <span className="tasks-progress-bar__line-completed" style={{width: `${width}px`}} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasksCount: state.tasks.items.size,
  completedTasksCount: state.tasks.completed.size,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TasksProgressBar)
