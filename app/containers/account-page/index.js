import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import {
  getAppStateItem,
  getLoader,
} from 'redux/store/app-state/app-state.selectors'
import {
  changePassword,
  logout,
} from 'redux/store/auth/auth.actions'
import { validateChangePassword } from 'redux/utils/validate'
import { afterSubmit } from 'redux/utils/form-submit'
import { getEmail } from 'redux/store/auth/auth.selectors'
import InputField from 'components/forms/input-field'
import Loader from 'components/elements/loader'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import {compose} from "recompose";

class AccountPage extends PureComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    deselectError: PropTypes.func.isRequired,
    visibleLoader: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    errorChangePassword: PropTypes.object,
    email: PropTypes.string,
    loader: PropTypes.bool,
  }

  state = {
    errorMessage: List(),
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorChangePassword.error) {
      this.setState((state) => ({
        errorMessage: state.errorMessage.push(nextProps.errorChangePassword.message)
      }))
      this.props.deselectError('changePassword')
    }
  }

  handleLogout = event => {
    event.preventDefault()
    this.props.logout()
  }

  onSubmit = values => {
    this.setState((state) => ({
      errorMessage: state.errorMessage.clear()
    }))
    this.props.visibleLoader()
    this.props.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })
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
    const email = this.props.email
    return (
      <div className="form-window">
        <div className="form-window-body">
          <div className="account-page">
            <Icon
              className="account-page__icon"
              icon={ICONS.ACCOUNT}
              width={19}
              height={20}
              scale={0.9}
              color="#a9a9a9"/>
            <p className="account-page__email">{email}</p>
            <p className="account-page__text" onClick={this.handleLogout}>Log out</p>
            <Icon
              className="account-page__log-out"
              icon={ICONS.LOG_OUT}
              width={20}
              height={20}
              scale={1.25}
              color="#282f34"
              onClick={this.handleLogout}/>
          </div>
          <Icon
            className="account-page__lock"
            icon={ICONS.LOCK}
            width={20}
            height={20}
            scale={0.52}
            color="#a9a9a9"/>
          <form className="common-form" method="post">
            <div className="form-fields">
              <div className="form-error">
                <ul className="error-list">
                  {this.renderErrorMessage()}
                </ul>
              </div>
              <div className="form-row">
                <div className="field-control">
                  <Field
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    label="Old password"
                    component={InputField}/>
                </div>
              </div>
              <div className="form-row">
                <div className="field-control">
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    label="New password"
                    component={InputField}/>
                </div>
              </div>
              <div className="form-row">
                <div className="field-control">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Password confirmation"
                    component={InputField}/>
                </div>
              </div>
              <div className="form-row form-button-row">
                <div className="field-label-offset">
                  <div className="field-control">
                    <input
                      type="submit"
                      className="btn-default"
                      value="Change password"
                      onClick={this.props.handleSubmit((values) => this.onSubmit(values))}/>
                  </div>
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
    )
  }
}

const mapStateToProps = state => ({
  errorChangePassword: getAppStateItem(state, 'changePassword'),
  email: getEmail(state),
  loader: getLoader(state),
})
const mapDispatchToProps = {
  changePassword,
  deselectError,
  visibleLoader,
  logout,
}
const form = reduxForm({
  form: 'changePassword',
  validate: validateChangePassword,
  onSubmitSuccess: afterSubmit,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'changePassword',
    validate: validateChangePassword,
    onSubmitSuccess: afterSubmit,
  }),
)(AccountPage)
