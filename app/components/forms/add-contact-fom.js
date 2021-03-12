import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { afterSubmitContacts } from 'redux/utils/form-submit'
import { validateAddContact } from 'redux/utils/validate'
import { createContact } from 'redux/store/contacts/contacts.actions'

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
  background-color: ${colors.white};
  height: 38px;
  ${borderRadius('3px')};
  ${boxShadow(`0 1px 6px 0 ${colors.americanSilver}`)}
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

const mapStateToProps = () => ({})

const mapDispatchToProps = { createContact }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: props => value => {
      const email = value.get('email')
      props.createContact(email)
    },
  }),
  reduxForm({
    form: 'addContactForm',
    validate: validateAddContact,
    onSubmitSuccess: afterSubmitContacts,
  })
)(AddContactForm)
