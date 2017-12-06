import React, { Component } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { visibleLoader } from 'redux/store/app-state/app-state.actions'
import {
  controlRedirectTasks,
  emailResetPassword
} from 'redux/store/auth/auth.actions'
import { validateEmailResetPassword } from 'redux/utils/validate'

import NavigationLanding from 'components/navigation/navigation-landing'
import InputField from 'components/forms/input-field'
import Loader from 'components/elements/loader'

class EmailResetPassword extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    controlRedirectTasks: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    visibleLoader: PropTypes.func,
    emailResetPassword: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    loader: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.props.controlRedirectTasks()
  }

  onSubmit = values => {
    this.props.emailResetPassword({ email: values.email })
    this.props.visibleLoader()
  }

  render() {
    return (
      <div className="landing-container">
        <NavigationLanding location={this.props.location}/>
        <div className="form-window">
          <div className="form-window-body">
            <form className="common-form" method="post">
              <div className="form-fields">
                <div className="form-error">
                </div>
                <div className="form-row">
                  <div className="field-control">
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      label="E-mail"
                      component={InputField}/>
                  </div>
                </div>
                <div className="form-row form-button-row">
                  <div className="field-label-offset">
                    <div className="field-control">
                      <input
                        type="submit"
                        className="btn-default"
                        value="Submit"
                        onClick={this.props.handleSubmit((values) => this.onSubmit(values))}/>
                    </div>
                  </div>
                </div>
              </div>
              {this.props.loader &&
              <div className="common-form__loader">
                <Loader />
              </div>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loader: state.getIn(['appState', 'loader', 'isVisible']),
})
const mapDispatchToProps = {
  controlRedirectTasks,
  visibleLoader,
  emailResetPassword,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'emailResetPassword',
    validate: validateEmailResetPassword,
  }),
)(EmailResetPassword)

