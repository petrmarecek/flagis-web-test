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
import { isStringEmpty } from 'redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import styled from 'styled-components'
import {
  boxShadow,
  borderRadius,
  boxSizing,
  placeholderColor,
} from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'

const AddForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${colors.white};
  height: 60px;
  ${boxShadow(`0 2px 6px 0${colors.greyOfDarkness}`)}
  ${borderRadius('3px')}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 72px;
  height: 60px;
  margin: 0;
  cursor: pointer;
  visibility: ${props => (props.isDisabled ? 'hidden' : 'visible')};
`

const SubjectContainer = styled.div`
  position: relative;
  padding: 0;
  height: auto;
  width: 100%;
`

const Subject = styled.input`
  ${placeholderColor(colors.doveGrey)}
  ${boxSizing('border-box')}
  border: none;
  width: 100%;
  font-size: 16px;
  height: 56px;
  z-index: 5;
  padding-left: 24px;
  margin: 0;
  font-weight: ${props => (props.isImportant ? 'bold' : 'normal')};
  background-color: ${colors.white};
`

const AddTaskForm = ({ subject, tasksMenu, handleChange, handleSubmit }) => (
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
    <SubmitIcon onClick={handleSubmit} isDisabled={isStringEmpty(subject)}>
      <Icon
        icon={ICONS.PLUS_CIRCLE}
        width={30}
        height={30}
        color={[colors.hanumanGreen]}
        title={'Add new task'}
      />
    </SubmitIcon>
  </AddForm>
)

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
