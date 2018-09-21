import React from 'react'
import { compose, lifecycle, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getAppStateItem, getLoader } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, signUp, initEmail } from 'redux/store/auth/auth.actions'
import { getUserEmail } from 'redux/store/auth/auth.selectors'
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

const getToken = (pathname) => {
  const numberCharacter = '/sign-up/'.length
  return pathname.substring(numberCharacter)
}

const SignUp = ({ errorSignUp, loader, location, handleSubmit, onSubmit }) => {
  const tokenLength = getToken(location.pathname).length

  return(
    <div className="landing-container">
      <NavigationLanding location={location}/>
      <Form>
        <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
          <FormBodyFields>
            <FormErrors>
              <ErrorList>
                {errorSignUp.message &&
                <ErrorListItem>
                  <ErrorListItemText>
                    {errorSignUp.message}
                  </ErrorListItemText>
                  <ErrorListItemIcon
                    icon={ICONS.ERROR}
                    width={12}
                    height={14}
                    color={["red"]}/>
                </ErrorListItem>}
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
                disabled={tokenLength !== 0}
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
}

SignUp.propTypes = {
  errorSignUp: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = (state, props) => {
  const token = getToken(props.location.pathname)
  let email = getUserEmail(state)

  if (token.length === 0) {
    email = null
  }

  return {
    errorSignUp: getAppStateItem(state, 'signUp'),
    loader: getLoader(state),
    initialValues: { email }
  }
}

const mapDispatchToProps = {
  signUp,
  visibleLoader,
  controlRedirectTasks,
  initEmail,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signUp',
    validate: validateSignUp,
    enableReinitialize: true,
  }),
  withHandlers({
    onSubmit: props => values => {
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

      props.visibleLoader()
      props.signUp(data)
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
    componentDidMount() {
      const token = getToken(this.props.location.pathname)

      if (token.length !== 0) {
        this.props.initEmail(token)
      }
    },
  })
)(SignUp)
