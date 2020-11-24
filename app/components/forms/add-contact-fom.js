import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { afterSubmitContacts } from 'redux/utils/form-submit'
import { validateAddContact } from 'redux/utils/validate'
import { createContact } from 'redux/store/contacts/contacts.actions'
import { getContactsEmail } from 'redux/store/contacts/contacts.selectors'
import { getUserEmail } from 'redux/store/auth/auth.selectors'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import AddField from 'components/forms/fields/add-field'

// styles
import styled from 'styled-components'
import { boxSizing, boxShadow, borderRadius } from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'

const AddForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  background-color: ${props => props.theme.addContactForm.wrapperBgColor};
  height: 38px;
  ${borderRadius('3px')};
  ${boxShadow(`0 1px 6px 0 ${props => props.theme.addContactForm.wrapperShadowColor}`)}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')};
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
  const plusColor = addButtonDisabled ? colors.doveGrey : colors.hanumanGreen

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
          title={addButtonDisabled ? '' : 'Add new contact'}
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
  userEmail: getUserEmail(state),
})

const mapDispatchToProps = { createContact }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: props => value => {
      const { validEmails, userEmail } = props
      const email = value.get('email')

      // validation for email of user
      if (userEmail === email) {
        toast.error(toastCommon.errorMessages.contact.userEmailConflict, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.ERROR_DURATION,
        })

        return
      }

      // validation for existing emails
      if (validEmails.includes(email.toLowerCase())) {
        toast.error(
          toastCommon.errorMessages.createEntity.createConflict('contact'),
          {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          }
        )

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
