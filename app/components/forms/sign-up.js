import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import {
  deselectError,
  setLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getAppStateItem,
  getLoader,
} from 'redux/store/app-state/app-state.selectors'
import {
  controlRedirectTasks,
  signUp,
  initEmail,
} from 'redux/store/auth/auth.actions'
import { getUserEmail } from 'redux/store/auth/auth.selectors'
import { getFromValues, getForm } from 'redux/store/forms/forms.selectors'
import { validateSignUp } from 'redux/utils/validate'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import InputField from 'components/forms/fields/input-field'
import CheckboxField from 'components/forms/fields/checkbox-field'
import Loader from 'components/common/loader'
import AgreeLabel from './labels/agree-label'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styled
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
  FormLink,
  fontMain,
  mediaQueries,
} from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'
import styled, { keyframes } from 'styled-components'
import { pulse, fadeInDown } from 'react-animations'

const show = keyframes`${pulse}`
const fadeDownAnimation = keyframes`${fadeInDown}`
const hide = keyframes`
    0%    {opacity: 0;}
    99%   {opacity: 0;}
    100%  {opacity: 1;}
`

const SuccessSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 150px 100px 50px 100px;

  ${mediaQueries.md} {
    margin: 100px 50px 50px 50px;
  }

  ${mediaQueries.sm} {
    margin: 100px 25px 50px 25px;
  }
`

const Text = styled.div`
  ${fontMain}
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  animation: ${fadeDownAnimation} 500ms;

  ${mediaQueries.sm} {
    font-size: 20px;
  }
`

const IconWrapper = styled(Icon)`
  margin-top: 50px;
  animation: 600ms ${hide}, 1000ms ${show} linear 600ms;
`

const getToken = (pathname) => {
  const numberCharacter = '/sign-up/'.length
  return pathname.substring(numberCharacter)
}

const SignUp = ({
  errorSignUp,
  loader,
  location,
  signUpForm,
  signUpValues,
  handleSubmit,
  onSubmit,
}) => {
  const tokenLength = getToken(location.pathname).length
  const isAgree = signUpValues && signUpValues.get('agree')
  const isSubmitted =
    (!errorSignUp.message && signUpForm && signUpForm.get('submitSucceeded')) ||
    false

  return (
    <div className="landing-container">
      <NavigationLandingPrimary location={location} />
      {isSubmitted && (
        <SuccessSignUpWrapper>
          <Text>
            Well done! You have just signed up. Please, confirm your email.
          </Text>
          <Text>
            We have just sent you an email with a link for the confirmation.
          </Text>
          <IconWrapper
            icon={ICONS.TASK_COMPLETED}
            scale={3}
            width={72}
            height={72}
            color={[colors.hanumanGreen]}
          />
        </SuccessSignUpWrapper>
      )}
      {!isSubmitted && (
        <Form maxWidth={500}>
          <FormBody
            onSubmit={
              isAgree ? handleSubmit((values) => onSubmit(values)) : null
            }
          >
            <FormBodyFields>
              <FormErrors>
                <ErrorList>
                  {errorSignUp.message && (
                    <ErrorListItem>
                      <ErrorListItemText>
                        {errorSignUp.message}
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
                  component={InputField}
                />
              </FormRow>
              <FormRow>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  component={InputField}
                />
              </FormRow>
              <FormRow>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  label="E-mail"
                  disabled={tokenLength !== 0}
                  component={InputField}
                />
              </FormRow>
              <FormRow>
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  label="Password"
                  component={InputField}
                />
              </FormRow>
              <FormRow>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Password confirmation"
                  component={InputField}
                />
              </FormRow>
              <FormRow>
                <Field id="agree" name="agree" component={CheckboxField}>
                  <AgreeLabel />
                </Field>
              </FormRow>
              <FormRowButton>
                <ButtonDefault
                  type="submit"
                  value="Sign Up"
                  disabled={!isAgree}
                />
              </FormRowButton>

              <FormRow pointer>
                <FormLink to="/sign-in">
                  Already have an account? Sign In!
                </FormLink>
              </FormRow>
            </FormBodyFields>
            {loader && <Loader global />}
          </FormBody>
        </Form>
      )}
    </div>
  )
}

SignUp.propTypes = {
  errorSignUp: PropTypes.object,
  loader: PropTypes.bool,
  location: PropTypes.object,
  signUpValues: PropTypes.object,
  signUpForm: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
}

const mapStateToProps = (state, props) => {
  const token = getToken(props.location.pathname)
  let email = getUserEmail(state)

  if (token.length === 0) {
    email = null
  }

  return {
    errorSignUp: getAppStateItem(state, 'signUp'),
    signUpValues: getFromValues(state, 'signUp'),
    signUpForm: getForm(state, 'signUp'),
    loader: getLoader(state).form,
    initialValues: { email },
  }
}

const mapDispatchToProps = {
  signUp,
  setLoader,
  controlRedirectTasks,
  initEmail,
  deselectError,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signUp',
    validate: validateSignUp,
    enableReinitialize: true,
  }),
  withHandlers({
    onSubmit: (props) => (values) => {
      const token = getToken(props.location.pathname)
      const data = {
        email: values.get('email'),
        password: values.get('newPassword'),
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
      }

      if (token.length !== 0) {
        data.token = token
      }

      props.setLoader(loaderTypes.FORM)
      props.signUp(data)
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
    componentDidMount() {
      const token = getToken(this.props.location.pathname)
      this.props.deselectError('signUp')

      if (token.length !== 0) {
        this.props.initEmail(token)
      }
    },
  })
)(SignUp)
