import React from 'react'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getAppStateItem, getLoader } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, signUpInvitation, signUp } from 'redux/store/auth/auth.actions'
import { validateSignUp } from 'redux/utils/validate'

import NavigationLanding from 'components/navigation/navigation-landing'
import InputField from 'components/common/input-field'
import Loader from 'components/common/loader'
import { ICONS } from 'components/icons/icon-constants'

import {
  Form,
  FormBody,
  FormBodyFields,
  FormLoader,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
} from '../../components/styled-components-mixins/'

const SignUp = ({ errorMessage, loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLanding location={location}/>
    <Form>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormErrors>
            <ErrorList>
              {errorMessage.map((string, i) => (
                <ErrorListItem key={i}>
                  <ErrorListItemText key={i}>
                    {string}
                  </ErrorListItemText>
                  <ErrorListItemIcon
                    icon={ICONS.ERROR}
                    width={12}
                    height={14}
                    color={["red"]}/>
                </ErrorListItem>
              ))}
            </ErrorList>
          </FormErrors>
          <FormRow>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              label="First name"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="email"
              name="email"
              type="text"
              label="E-mail"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="newPassword"
              name="newPassword"
              type="password"
              label="Password"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Password confirmation"
              component={InputField}/>
          </FormRow>
          <FormRow >
            <input
              type="submit"
              className="btn-default"
              value="Sign Up" />
          </FormRow>

          <FormRow pointer>
              <Link to="/sign-in">Already have an account? Sign In!</Link>
          </FormRow>

        </FormBodyFields>
        {loader &&
        <FormLoader>
          <Loader />
        </FormLoader>}
      </FormBody>
    </Form>
  </div>
)

SignUp.propTypes = {
  errorMessage: PropTypes.object,
  errorSignUp: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onControlError: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  errorSignUp: getAppStateItem(state, 'signUp'),
  loader: getLoader(state),
})

const mapDispatchToProps = {
  signUpInvitation,
  signUp,
  deselectError,
  visibleLoader,
  controlRedirectTasks,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signUp',
    validate: validateSignUp,
  }),
  withStateHandlers(
    () => ({ errorMessage: List() }),
    {
      onSubmit: ({ errorMessage }, props) => values => {
        const numberCharacter = '/sign-up/'.length
        const token = props.location.pathname.substring(numberCharacter)

        props.visibleLoader()
        // sign-up by invitation
        if (token.length !== 0) {
          props.signUpInvitation({
            token,
            email: values.get('email'),
            password: values.get('newPassword'),
            firstName: values.get('firstName'),
            lastName: values.get('lastName'),
          })

          return { errorMessage: errorMessage.clear() }
        }

        // sign-up
        props.signUp({
          email: values.get('email'),
          password: values.get('newPassword'),
          firstName: values.get('firstName'),
          lastName: values.get('lastName'),
        })

        return { errorMessage: errorMessage.clear() }
      },
      onControlError: ({ errorMessage }, props) => () => {
        if (props.errorSignUp.error) {
          props.deselectError('signUp')
          return { errorMessage: errorMessage.push(props.errorSignUp.message) }
        }

        return errorMessage
      }
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
    componentWillReceiveProps() {
      this.props.onControlError()
    }
  })
)(SignUp)
