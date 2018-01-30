import React, { Component } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'
import { NotificationContainer } from 'react-notifications'

import {
  deselectError,
  visibleLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getLoader,
  getAppStateItem,
} from 'redux/store/app-state/app-state.selectors'
import {
  controlRedirectTasks,
  login,
} from 'redux/store/auth/auth.actions'
import { getAuth } from 'redux/store/auth/auth.selectors'
import { validateSignIn } from 'redux/utils/validate'
import NavigationLanding from 'components/navigation/navigation-landing'
import InputField from 'components/forms/input-field'
import Loader from 'components/elements/loader'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class SignIn extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    controlRedirectTasks: PropTypes.func,
    login: PropTypes.func,
    deselectError: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    visibleLoader: PropTypes.func.isRequired,
    errorSignIn: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    loader: PropTypes.bool,
  }

  state = {
    errorMessage: List(),
  }

  componentWillMount() {
    this.props.controlRedirectTasks()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorSignIn.error) {
      this.setState((state) => ({
        errorMessage: state.errorMessage.push(nextProps.errorSignIn.message)
      }))
      this.props.deselectError('signIn')
    }
  }

  onSubmit = values => {
    this.setState((state) => ({
      errorMessage: state.errorMessage.clear()
    }))
    this.props.visibleLoader()
    this.props.login(values)
  }

  renderErrorMessage = () => {
    const error = this.state.errorMessage.map((string, i) => {
      return (
        <li key={i} className="error-list-item">
          <div key={i} className="error-list-item__text">
            {string}
          </div>
          <Icon
            className="error-list-item__icon"
            icon={ICONS.ERROR}
            width={12}
            height={14}
            color="red"/>
        </li>
      )
    })
    return error
  }

  render() {
    return (
      <div className="landing-container">
        <NavigationLanding location={this.props.location}/>
        <div className="form-window">
          <div className="form-window-body">
            <form className="common-form">
              <div className="form-fields">
                <div className="form-error">
                  <ul className="error-list">
                    {this.renderErrorMessage()}
                  </ul>
                </div>
                <div className="form-row">
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    label="E-mail"
                    component={InputField} />
                </div>
                <div className="form-row">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    component={InputField} />
                </div>
                <div className="form-row form-button-row">
                  <div className="field-label-offset">
                    <input
                      type="submit"
                      className="btn-default"
                      value="Sign In"
                      onClick={this.props.handleSubmit((values) => this.onSubmit(values))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field-control field-label-offset">
                    <Link className="form-link" to="/email-reset-password">Forgot your password?</Link>
                    <br/>
                    <br/>
                    <Link className="form-link" to="/sign-up">Register as a new user</Link>
                  </div>
                </div>
              </div>
              {this.props.loader &&
              <div className="common-form__loader">
                <Loader />
              </div>
              }
            </form>
          </div>
        </div>
        <div className="floating-components">
          <NotificationContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
  errorSignIn: getAppStateItem(state, 'signIn'),
  loader: getLoader(state),
})

const mapDispatchToProps = {
  controlRedirectTasks,
  login,
  deselectError,
  visibleLoader,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signIn',
    validate: validateSignIn,
  }),
)(SignIn)
