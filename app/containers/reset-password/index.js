import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Logo from 'assets/img/logo.svg'

import { visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, resetPassword } from 'redux/store/auth/auth.actions'
import { validateResetPassword } from 'redux/utils/validate'

import InputField from 'components/common/input-field'
import Loader from 'components/common/loader'

class ResetPassword extends PureComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    controlRedirectTasks: PropTypes.func,
    handleSubmit: PropTypes.func,
    visibleLoader: PropTypes.func,
    resetPassword: PropTypes.func,
    loader: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.controlRedirectTasks()
  }

  onSubmit = values => {
    const numberCharacter = '/reset-password/'.length
    const resetToken = this.props.location.pathname.substring(numberCharacter)
    this.props.visibleLoader()
    this.props.resetPassword({
      resetToken: resetToken,
      password: values.get('newPassword'),
    })
  }

  render() {
    return (
      <div className="landing-container">
        <nav className="navbar-landing">
          <div className="navbar-landing__flex-container navbar-landing__flex-container--flex-row">
            <div className="navbar-landing__logo">
              <img src={Logo}/>
            </div>
          </div>
        </nav>
        <div className="form-window">
          <div className="form-window-body">
            <form className="common-form" method="post">
              <div className="form-fields">
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loader: getLoader(state),
})
const mapDispatchToProps = {
  controlRedirectTasks,
  visibleLoader,
  resetPassword,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'resetPassword',
    validate: validateResetPassword,
  }),
)(ResetPassword)
