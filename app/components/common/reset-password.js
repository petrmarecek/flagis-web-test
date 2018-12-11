import React from 'react'
import {compose, lifecycle, withHandlers} from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { setLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, resetPassword } from 'redux/store/auth/auth.actions'
import { validateResetPassword } from 'redux/utils/validate'

import NavigationLanding from 'components/navigation/navigation-landing'
import InputField from 'components/common/input-field'
import Loader from 'components/common/loader'

import {
  Form,
  FormBody,
  FormBodyFields,
  FormLoader,
  FormRow,
} from '../styled-components-mixins'

const ResetPassword = ({ loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLanding location={location} isLogoNav />
    <Form>
      <FormBody>
          <FormBodyFields>
            <FormRow>
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  label="New password"
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
            <FormRow>
              <input
                type="submit"
                className="btn-default"
                value="Submit"
                onClick={handleSubmit((values) => onSubmit(values))}/>
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

ResetPassword.propTypes = {
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  loader: getLoader(state).form,
})

const mapDispatchToProps = {
  resetPassword,
  setLoader,
  controlRedirectTasks,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'resetPassword',
    validate: validateResetPassword,
  }),
  withHandlers({
    onSubmit: props => values => {
      const numberCharacter = '/reset-password/'.length
      const resetToken = props.location.pathname.substring(numberCharacter)
      props.setLoader('form')
      props.resetPassword({
        resetToken: resetToken,
        password: values.get('newPassword'),
      })
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    }
  })
)(ResetPassword)
