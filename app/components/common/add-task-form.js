import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import constants from 'utils/constants'
import { compose, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import commonUtils from 'redux/utils/common'
import { createTask } from 'redux/store/tasks/tasks.actions'
import { getTasksMenu } from 'redux/store/tasks-menu/tasks-menu.selectors'
import { getActiveTagsId } from 'redux/store/tags/tags.selectors'
import { isStringEmpty } from '../../redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import styled from 'styled-components'
import {
  boxShadow,
  boxSizing,
  placeholderColor,
} from '../styled-components-mixins'

const AddForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  background-color: #fff;
  height: 58px;
  ${boxShadow('0 0 6px 0 #CECECE')}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')}
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 60px;
  height: 58px;
  margin: 0;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`

const SubjectContainer = styled.div`
  position: relative;
  padding: 0;
  height: auto;
  width: 100%;
`

const Subject = styled.input`
  ${placeholderColor('#CECECE')}
  ${boxSizing('border-box')}
  border: none;
  width: 100%;
  font-size: 16px;
  height: 56px;
  z-index: 5;
  padding-left: 24px;
  margin: 0;
  font-weight: ${props => (props.isImportant ? 'bold' : 'normal')};
  background-color: #fff;
`

const AddTaskForm = ({ subject, tasksMenu, handleChange, handleSubmit }) => {
  const addButtonDisabled = isStringEmpty(subject)
  const plusColor = addButtonDisabled ? '#CECECE' : '#44FFB1'

  return (
    <AddForm autoComplete="off" onSubmit={handleSubmit}>
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
      <SubmitIcon onClick={handleSubmit} disabled={addButtonDisabled}>
        <Icon icon={ICONS.PLUS} width={29} height={29} color={[plusColor]} />
      </SubmitIcon>
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
})

const actionCreators = { createTask }

export default compose(
  connect(mapStateToProps, actionCreators),
  withStateHandlers(() => ({ subject: '' }), {
    handleChange: () => event => {
      const subject = event.target.value

      if (subject.length > constants.TASKS_TITLE_MAX_CHARACTERS) {
        return {}
      }

      return { subject }
    },
    handleSubmit: ({ subject }, props) => event => {
      const { tasksMenu, tags } = props
      const { filters } = tasksMenu
      event.preventDefault()

      if (isStringEmpty(subject)) {
        return {}
      }

      // due date sorting algorithm or some date filter is activated
      const dueDate = filters.range
        ? moment().startOf('day').set({
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
