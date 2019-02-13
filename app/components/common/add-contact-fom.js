import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { createContact } from 'redux/store/contacts/contacts.actions'
import { getContactsEmail } from 'redux/store/contacts/contacts.selectors'
import { afterSubmitContacts } from 'redux/utils/form-submit'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import AddField from 'components/common/add-field'
import styled from 'styled-components'
import { boxSizing, boxShadow } from '../styled-components-mixins/'
import { Field, reduxForm } from 'redux-form/immutable'
import { validateAddContact } from '../../redux/utils/validate'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

const AddForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  background-color: #fff;
  height: 38px;
  ${boxShadow('0 0 6px 0 #CECECE')}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')}
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 55px;
  height: 38px;
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

const AddContactForm = ({ valid, handleSubmit, onSubmit }) => {
  const addButtonDisabled = !valid
  const plusColor = addButtonDisabled ? '#CECECE' : '#44FFB1'

  return (
    <AddForm
      autoComplete="off"
      onSubmit={handleSubmit(values => onSubmit(values))}
    >
      <SubjectContainer>
        <Field
          id="email"
          name="email"
          type="text"
          placeholder="Add E-Mail"
          component={AddField}
        />
      </SubjectContainer>
      <SubmitIcon
        onClick={handleSubmit(values => onSubmit(values))}
        disabled={addButtonDisabled}
      >
        <Icon
          icon={ICONS.PLUS}
          width={16}
          height={16}
          scale={0.55}
          color={[plusColor]}
        />
      </SubmitIcon>
    </AddForm>
  )
}

AddContactForm.propTypes = {
  valid: PropTypes.bool,
  validEmails: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  validEmails: getContactsEmail(state),
})

const mapDispatchToProps = { createContact }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onSubmit: props => value => {
      const { validEmails } = props
      const email = value.get('email')

      if (validEmails.includes(email.toLowerCase())) {
        toast.error(errorMessages.createEntity.createConflict('contact'), {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_ERROR_DURATION,
        })

        return
      }

      props.createContact(email)
    },
  }),
  reduxForm({
    form: 'addContactForm',
    validate: validateAddContact,
    onSubmitSuccess: afterSubmitContacts,
  })
)(AddContactForm)
