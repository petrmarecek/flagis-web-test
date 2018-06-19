import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import commonUtils from 'redux/utils/common'
import { createTask } from 'redux/store/tasks/tasks.actions'
import { getTasksMenu } from 'redux/store/tasks-menu/tasks-menu.selectors'
import { getActiveTagsId } from 'redux/store/tags/tags.selectors'
import cx from "classnames"

class AddTaskForm extends PureComponent {

  static propTypes = {
    createTask: PropTypes.func.isRequired,
    tags: PropTypes.object,
    tasksMenu: PropTypes.object,
  }

  state = {
    subject: '',
    focused: false,
    isImportant: false,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tasksMenu.filters.important) {
      this.setState({ isImportant: true })
    } else {
      this.setState({ isImportant: false })
    }

    if (newProps.tasksMenu.filters.unimportant) {
      this.setState({ isImportant: false })
    }
  }

  handleAddTask = () => {
    const tasksMenu = this.props.tasksMenu

    if (!AddTaskForm.isNotEmpty(this.state.subject))
      return

    // due date sorting algorithm is activated
    const now = moment()
    const dueDate = tasksMenu.sort.dueDate || tasksMenu.filters.range
      ? now.startOf('day').set({
        'hour': 23,
        'minute': 45,
        'second': 0,
        'millisecond': 0
      })
      : null

    // extract data
    const task = {
      id: null,
      clientId: commonUtils.uid(),
      subject: this.state.subject,
      description: '',
      startDate: null,
      reminderDate: null,
      dueDate: dueDate,
      isCompleted: false,
      isImportant: this.state.isImportant,
      tags: this.props.tags,
    }

    // dispatch action
    this.props.createTask(task)

    // reset form
    this.setState({ subject: '' })
  }

  handleSubjectChanged = event => {
    this.setState({ subject: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.handleAddTask()
  }

  handleFocus = () => this.setState({ focused: true })
  handleBlur = () => this.setState({ focused: false })

  static isNotEmpty(str) {
    return str.trim().length !== 0
  }

  render() {
    const addButtonDisabled = !this.state.subject.trim()
    const tasksMenu = this.props.tasksMenu

    const subjectCss = cx({
      'add-task__subject': true,
      'important': Boolean(tasksMenu.filters.important),
    })

    const plusColor = addButtonDisabled
      ? '#d7e3ec'
      : '#44FFB1'

    return (
      <form className="add-task" autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="add-task__submit" onClick={this.handleSubmit} disabled={addButtonDisabled}>
          <Icon
            icon={ICONS.PLUS}
            width={29}
            height={29}
            color={[plusColor]}/>
        </div>
        <div className="add-task__subject-container">
          <input
            className={subjectCss}
            type="text"
            name="subject"
            ref="subject"
            placeholder="Add new task"
            value={this.state.subject}
            onChange={this.handleSubjectChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur} />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  tags: getActiveTagsId(state),
  tasksMenu: getTasksMenu(state),
})
const actionCreators = { createTask }
export default connect(mapStateToProps, actionCreators)(AddTaskForm)
