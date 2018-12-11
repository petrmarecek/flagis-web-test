import React from 'react'
import {compose, lifecycle, withHandlers} from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'

import { setLoader } from 'redux/store/app-state/app-state.actions'
import { getLoader } from 'redux/store/app-state/app-state.selectors'
import { controlRedirectTasks, emailResetPassword } from 'redux/store/auth/auth.actions'
import { validateEmailResetPassword } from 'redux/utils/validate'

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

const EmailResetPassword = ({ loader, location, handleSubmit, onSubmit }) => (
  <div className="landing-container">
    <NavigationLanding location={location} />
    <Form>
      <FormBody>
        <FormBodyFields>
          <FormRow>
            <Field
              id="email"
              name="email"
              type="text"
              label="E-mail"
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
      props.setLoader('form')
      props.emailResetPassword({ email: values.get('email') })
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.controlRedirectTasks()
    }
  })
)(EmailResetPassword)
