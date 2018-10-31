import React from 'react'
import {compose, lifecycle, withHandlers} from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { ToastContainer, style } from 'react-toastify'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader, getAppStateItem } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, login } from 'redux/store/auth/auth.actions'
import { validateSignIn } from 'redux/utils/validate'

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
  FormLink,
} from '../styled-components-mixins'

const SignIn = ({ errorSignIn, loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLanding location={location}/>
    <Form>
      <FormBody>
          <FormBodyFields>
            <FormErrors>
              <ErrorList>
                {errorSignIn.message &&
                <ErrorListItem>
                  <ErrorListItemText>
                    {errorSignIn.message}
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
                id="email"
                name="email"
                type="text"
                label="E-mail"
                component={InputField} />
            </FormRow>
            <FormRow>
              <Field
                id="password"
                name="password"
                type="password"
                label="Password"
                component={InputField} />
            </FormRow>
            <FormRow>
              <input
                type="submit"
                className="btn-default"
                value="Sign In"
                onClick={handleSubmit((values) => onSubmit(values))} />
            </FormRow>

            <FormRow pointer>
              <FormLink to="/email-reset-password">Forgot your password?</FormLink>
              <br/>
              <br/>
              <FormLink to="/sign-up">Register as a new user</FormLink>
            </FormRow>

          </FormBodyFields>
        {loader &&
        <FormLoader>
          <Loader />
        </FormLoader>}
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
  loader: getLoader(state),
})

const mapDispatchToProps = {
  login,
  visibleLoader,
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
      props.visibleLoader()
      props.login({
        email: values.get('email'),
        password: values.get('password')
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
          right: '25px'
        }
      })
    }
  })
)(SignIn)