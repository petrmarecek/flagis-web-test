import React from 'react'
import { compose, lifecycle, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { setLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader } from 'redux/store/app-state/app-state.selectors'
import {
  controlRedirectTasks,
  emailResetPassword,
} from 'redux/store/auth/auth.actions'
import { validateEmailResetPassword } from 'redux/utils/validate'
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

const EmailResetPassword = ({ loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLandingPrimary location={location} />
    <Form maxWidth={500}>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormRow>
            <Field
              id="email"
              name="email"
              type="text"
              label="E-mail"
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

EmailResetPassword.propTypes = {
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  loader: getLoader(state).form,
})

const mapDispatchToProps = {
  emailResetPassword,
  setLoader,
  controlRedirectTasks,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'emailResetPassword',
    validate: validateEmailResetPassword,
    enableReinitialize: true,
  }),
  withHandlers({
    onSubmit: props => values => {
      props.setLoader(loaderTypes.FORM)
      props.emailResetPassword({ email: values.get('email') })
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    },
  })
)(EmailResetPassword)
