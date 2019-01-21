import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import { connect } from 'react-redux'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import commonUtils from 'redux/utils/common'
import { createTask } from 'redux/store/tasks/tasks.actions'
import { getTimeLine } from 'redux/store/tasks/tasks.selectors'
import { getTasksMenu } from 'redux/store/tasks-menu/tasks-menu.selectors'
import { getActiveTagsId } from 'redux/store/tags/tags.selectors'
import { isStringEmpty } from '../../redux/utils/component-helper'

import styled from 'styled-components'
import {
  boxShadow,
  boxSizing,
  placeholderColor,
} from '../styled-components-mixins'

const AddForm = styled.form`
  margin-bottom: 6px;
  background-color: #fff;
  ${boxShadow('0 3px 4px 0 #d5dce0')}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')}
  display: inline-block;
  float: right;
  margin: 0;
  height: 50px;
  padding: 11px 16px 10px 16px;
  width: 61px;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`

const SubjectContainer = styled.div`
  position: relative;
  margin-right: 61px;
  padding: 0;
  height: 50px;
`

const Subject = styled.input`
  ${placeholderColor('#d7e3ec')}
  ${boxSizing('border-box')}
  position: absolute;
  border: none;
  width: 100%;
  font-size: 18px;
  line-height: 30px;
  padding: 10px 0 10px 17px;
  z-index: 5;
  margin: 0;
  font-weight: ${props => (props.isImportant ? 'bold' : 'normal')};
  background-color: #fff;
`

const AddTaskForm = ({ subject, tasksMenu, handleChange, handleSubmit }) => {
  const addButtonDisabled = isStringEmpty(subject)
  const plusColor = addButtonDisabled ? '#d7e3ec' : '#44FFB1'

  return (
    <AddForm autoComplete="off" onSubmit={handleSubmit}>
      <SubmitIcon onClick={handleSubmit} disabled={addButtonDisabled}>
        <Icon icon={ICONS.PLUS} width={29} height={29} color={[plusColor]} />
      </SubmitIcon>
      <SubjectContainer>
        <Subject
          type="text"
          name="subject"
          placeholder="Add new task"
          value={subject}
          onChange={handleChange}
          isImportant={tasksMenu.filters.important}
        />
      </SubjectContainer>
    </AddForm>
  )
}

AddTaskForm.propTypes = {
  subject: PropTypes.string,
  tasksMenu: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  tags: getActiveTagsId(state),
  tasksMenu: getTasksMenu(state),
  timeLine: getTimeLine(state),
})

const actionCreators = { createTask }

export default compose(
  connect(
    mapStateToProps,
    actionCreators
  ),
  withStateHandlers(() => ({ subject: '' }), {
    handleChange: () => event => ({ subject: event.target.value }),
    handleSubmit: ({ subject }, props) => event => {
      const { tasksMenu, timeLine, tags } = props
      const { filters } = tasksMenu
      event.preventDefault()

      if (isStringEmpty(subject)) {
        return {}
      }

      // due date sorting algorithm or some date filter is activated
      const dueDate =
        timeLine || filters.range
          ? moment()
              .startOf('day')
              .set({
                hour: 23,
                minute: 45,
                second: 0,
                millisecond: 0,
              })
          : null

      props.createTask({
        id: null,
        clientId: commonUtils.uid(),
        subject: subject,
        description: '',
        startDate: null,
        reminderDate: null,
        dueDate: dueDate,
        isCompleted: false,
        isImportant: filters.important,
        tags: tags,
      })
      return { subject: '' }
    },
  })
)(AddTaskForm)
