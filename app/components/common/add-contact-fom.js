import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { createContact } from 'redux/store/contacts/contacts.actions'
import { afterSubmitContacts } from 'redux/utils/form-submit'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import AddField from 'components/common/add-field'
import styled from 'styled-components'
import { boxSizing, boxShadow } from '../styled-components-mixins/'
import { Field, reduxForm } from 'redux-form/immutable'
import { validateAddContact } from '../../redux/utils/validate'

const AddForm = styled.form`
  margin-bottom: 6px;
  background-color: white;
  ${boxShadow('0 3px 4px 0 #d5dce0')}
`;

const SubmitIcon = styled.div`
  ${boxSizing('border-box')}
  display: inline-block;
  float: right;
  margin: 0;
  height: 30px;
  padding: 7px 20px;
  width: 56px;
  cursor: pointer;
`;

const SubjectContainer = styled.div`
  margin-right: 56px;
  padding: 0;
`;

const AddContactForm = ({ valid, handleSubmit, onSubmit }) => {

  const addButtonDisabled = !valid
  const plusColor = addButtonDisabled
    ? '#d7e3ec'
    : '#44FFB1'

  return (
    <AddForm
      autoComplete="off"
      onSubmit={handleSubmit((values) => onSubmit(values))}>
      <SubmitIcon
        onClick={handleSubmit((values) => onSubmit(values))}
        disabled={addButtonDisabled}>
        <Icon
          icon={ICONS.PLUS}
          width={16}
          height={16}
          scale={0.55}
          color={[plusColor]}/>
      </SubmitIcon>
      <SubjectContainer>
        <Field
          id="email"
          name="email"
          type="text"
          placeholder="Add E-Mail"
          component={AddField} />
      </SubjectContainer>
    </AddForm>
  )
}

AddContactForm.propTypes = {
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { createContact }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: props => value => props.createContact(value.get('email'))
  }),
  reduxForm({
    form: 'addContactForm',
    validate: validateAddContact,
    onSubmitSuccess: afterSubmitContacts,
  }),
)(AddContactForm)
