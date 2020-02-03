import React from 'react'
import { compose, lifecycle, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { ToastContainer, style } from 'react-toastify'

import {
  deselectError,
  setLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getLoader,
  getAppStateItem,
} from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, login } from 'redux/store/auth/auth.actions'
import { validateSignIn } from 'redux/utils/validate'

import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import InputField from 'components/forms/fields/input-field'
import Loader from 'components/common/loader'
import { ICONS } from 'components/icons/icon-constants'

import {
  ButtonDefault,
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
  FormLink,
} from '../styled-components-mixins'

const SignIn = ({ errorSignIn, loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLandingPrimary location={location} />
    <Form maxWidth={500}>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormErrors>
            <ErrorList>
              {errorSignIn.message && (
                <ErrorListItem>
                  <ErrorListItemText>{errorSignIn.message}</ErrorListItemText>
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
              id="email"
              name="email"
              type="text"
              label="E-mail"
              component={InputField}
            />
          </FormRow>
          <FormRow>
            <Field
              id="password"
              name="password"
              type="password"
              label="Password"
              component={InputField}
            />
          </FormRow>
          <FormRow>
            <ButtonDefault type="submit" value="Sign In" />
          </FormRow>

          <FormRow pointer>
            <FormLink to="/email-reset-password">
              Forgot your password?
            </FormLink>
            <br />
            <br />
            <FormLink to="/sign-up">Register as a new user</FormLink>
          </FormRow>
        </FormBodyFields>
        {loader && (
          <FormLoader>
            <Loader />
          </FormLoader>
        )}
      </FormBody>
    </Form>
    <div className="floating-components">
      <ToastContainer />
    </div>
  </div>
)

SignIn.propTypes = {
  errorSignIn: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  errorSignIn: getAppStateItem(state, 'signIn'),
  loader: getLoader(state).form,
})

const mapDispatchToProps = {
  login,
  setLoader,
  controlRedirectTasks,
  deselectError,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signIn',
    validate: validateSignIn,
  }),
  withHandlers({
    onSubmit: props => values => {
      props.setLoader('form')
      props.login({
        email: values.get('email'),
        password: values.get('password'),
      })
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
    componentDidMount() {
      this.props.deselectError('signIn')
      style({
        BOTTOM_RIGHT: {
          bottom: '30px',
          right: '25px',
        },
      })
    },
  })
)(SignIn)
