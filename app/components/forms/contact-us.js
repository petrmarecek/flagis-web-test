import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'

// redux
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { sendContactUs } from 'redux/store/auth/auth.actions'
import { getUsername, getUserEmail } from 'redux/store/auth/auth.selectors'
import {
  deselectError,
  setLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getLoader,
  getAppStateItem,
} from 'redux/store/app-state/app-state.selectors'
import { validateContactUs } from 'redux/utils/validate'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { getFromValues } from 'redux/store/forms/forms.selectors'
import { afterSubmitContactUs } from 'redux/utils/form-submit'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

// components
import InputField from 'components/forms/fields/input-field'
import TextareaField from 'components/forms/fields/textarea-field'
import CheckboxField from 'components/forms/fields/checkbox-field'
import Loader from 'components/common/loader'
import AgreeLabel from './labels/agree-label'
import { ICONS } from 'components/icons/icon-constants'

// styles
import styled from 'styled-components'
import {
  ButtonDefault,
  Form,
  FormBody,
  FormBodyFields,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormRowButton,
  ButtonDefaultSmall,
} from '../styled-components-mixins'

const ContactUsWrapper = styled.div`
  padding: ${props => (props.nonPadding ? '0' : '0 25px 50px')};
`

const ContactUsContainer = ({
  errorContactUs,
  loader,
  pathname,
  contactUsValues,
  handleSubmit,
  onSubmit,
}) => {
  const isUserContactUs = pathname === routes.user.account.settings.contactUs
  const isAgree = contactUsValues && contactUsValues.get('agree')

  return (
    <ContactUsWrapper nonPadding={isUserContactUs}>
      <Form
        maxWidth={500}
        nonMargin={isUserContactUs}
        leftPadding={isUserContactUs}
      >
        <FormBody
          onSubmit={
            isUserContactUs
              ? handleSubmit(values => onSubmit(values))
              : isAgree
              ? handleSubmit(values => onSubmit(values))
              : null
          }
        >
          <FormBodyFields>
            <FormErrors>
              <ErrorList>
                {errorContactUs.message && (
                  <ErrorListItem>
                    <ErrorListItemText>
                      {errorContactUs.message}
                    </ErrorListItemText>
                    <ErrorListItemIcon
                      icon={ICONS.ERROR}
                      width={12}
                      height={14}
                      color={['red']}
                    />
                  </ErrorListItem>
                )}
              </ErrorList>
            </FormErrors>
            <FormRow>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                label="First name"
                smallSize={isUserContactUs}
                component={InputField}
              />
            </FormRow>
            <FormRow>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                smallSize={isUserContactUs}
                component={InputField}
              />
            </FormRow>
            <FormRow>
              <Field
                id="email"
                name="email"
                type="text"
                label="E-mail"
                smallSize={isUserContactUs}
                component={InputField}
              />
            </FormRow>
            <FormRow>
              <Field
                id="subject"
                name="subject"
                type="text"
                label="Subject"
                smallSize={isUserContactUs}
                component={InputField}
              />
            </FormRow>
            <FormRow>
              <Field
                id="message"
                name="message"
                type="text"
                label="Message/Feedback"
                height={200}
                smallSize={isUserContactUs}
                component={TextareaField}
              />
            </FormRow>
            {!isUserContactUs && (
              <FormRow>
                <Field id="agree" name="agree" component={CheckboxField}>
                  <AgreeLabel />
                </Field>
              </FormRow>
            )}
            <FormRowButton>
              {isUserContactUs && (
                <ButtonDefaultSmall type="submit" value="Contact Us" />
              )}
              {!isUserContactUs && (
                <ButtonDefault
                  type="submit"
                  value="Contact Us"
                  disabled={!isAgree}
                />
              )}
            </FormRowButton>
          </FormBodyFields>
          {loader && <Loader global />}
        </FormBody>
      </Form>
    </ContactUsWrapper>
  )
}

ContactUsContainer.propTypes = {
  errorContactUs: PropTypes.object,
  loader: PropTypes.bool,
  pathname: PropTypes.string,
  contactUsValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => {
  const userNames = getUsername(state)
  const email = { email: getUserEmail(state) }

  return {
    errorContactUs: getAppStateItem(state, 'contactUs'),
    contactUsValues: getFromValues(state, 'contactUs'),
    loader: getLoader(state).form,
    pathname: getRoutingPathname(state),
    initialValues: { ...userNames, ...email },
  }
}

const mapDispatchToProps = {
  setLoader,
  deselectError,
  sendContactUs,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'contactUs',
    validate: validateContactUs,
    onSubmitSuccess: afterSubmitContactUs,
  }),
  withHandlers({
    onSubmit: props => values => {
      props.setLoader(loaderTypes.FORM)
      props.sendContactUs({
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
        email: values.get('email'),
        subject: values.get('subject'),
        message: values.get('message'),
      })
    },
  })
)(ContactUsContainer)
