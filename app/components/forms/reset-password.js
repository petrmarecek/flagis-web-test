import React from 'react'
import { compose, lifecycle, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { setLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader } from 'redux/store/app-state/app-state.selectors'
import {
  controlRedirectTasks,
  resetPassword,
} from 'redux/store/auth/auth.actions'
import { validateResetPassword } from 'redux/utils/validate'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import InputField from 'components/forms/fields/input-field'
import Loader from 'components/common/loader'

import {
  ButtonDefault,
  Form,
  FormBody,
  FormBodyFields,
  FormRow,
  FormRowButton,
} from '../styled-components-mixins'

const ResetPassword = ({ loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLandingPrimary location={location} isLogoNav />
    <Form maxWidth={400}>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormRow>
            <Field
              id="newPassword"
              name="newPassword"
              type="password"
              label="New password"
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
          <FormRowButton>
            <ButtonDefault type="submit" value="Submit" />
          </FormRowButton>
        </FormBodyFields>
        {loader && <Loader global />}
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
      props.setLoader(loaderTypes.FORM)
      props.resetPassword({
        resetToken: resetToken,
        password: values.get('newPassword'),
      })
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
  })
)(ResetPassword)
