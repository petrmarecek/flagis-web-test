import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

import { createContact } from 'redux/store/contacts/contacts.actions'
import { afterSubmitContacts } from 'redux/utils/form-submit'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import AddField from 'components/common/add-field'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form/immutable'
import { validateEmail } from '../../redux/utils/validate'

const AddFormContainer = styled.form`
  margin-bottom: 6px;
  background-color: white;
  -webkit-box-shadow: 0 3px 4px 0 #d5dce0;
  -moz-box-shadow: 0 3px 4px 0 #d5dce0;
  box-shadow:0 3px 4px 0 #d5dce0;
`;

const Submit = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  float: right;
  margin: 0;
  height: 50px;
  padding: 11px 16px 10px 16px;
  width: 61px;
  cursor: pointer;
`;

const SubjectContainer = styled.div`
  margin-right: 61px;
  padding: 0;
`;

const AddContactForm = props => {

  const {
    handleSubmit,
    onSubmit,
    email,
  } = props

  const addButtonDisabled = !email.trim()
  const plusColor = addButtonDisabled
    ? '#d7e3ec'
    : '#44FFB1'

  return (
    <AddFormContainer
      autoComplete="off"
      onSubmit={handleSubmit((values) => onSubmit(values))}>
      <Submit
        onClick={handleSubmit((values) => onSubmit(values))}
        disabled={addButtonDisabled}>
        <Icon
          icon={ICONS.PLUS}
          width={29}
          height={29}
          color={[plusColor]}/>
      </Submit>
      <SubjectContainer>
        <Field
          id="email"
          name="email"
          type="text"
          placeholder="Add new contact"
          component={AddField} />
      </SubjectContainer>
    </AddFormContainer>
  )
}

AddContactForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onHandleSubjectChanged: PropTypes.func,
  email: PropTypes.string,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { createContact }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    () => ({ email: '' }),
    {
      onSubmit: (state, props) => value => {

        if (value.email.trim().length === 0) {
          return
        }

        // dispatch action
        props.createContact(value.email)

        // reset form
        value.email = ''
      }
  }),
  reduxForm({
    form: 'addContactForm',
    validate: validateEmail,
    onSubmitSuccess: afterSubmitContacts,
  }),
)(AddContactForm)
