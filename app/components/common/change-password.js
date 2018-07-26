import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getChangePasswordForm, getLoader } from 'redux/store/app-state/app-state.selectors'
import { changePassword } from 'redux/store/auth/auth.actions'
import { validateChangePassword } from 'redux/utils/validate'
import { afterSubmitChangePassword } from 'redux/utils/form-submit'

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
} from '../styled-components-mixins/'

const ChangePassword = props => {
  const { errorMessage, loader, handleSubmit, onSubmit } = props

  const renderErrorMessage = () =>
    errorMessage.map((string, i) => (
      <ErrorListItem key={i}>
        <ErrorListItemText key={i}>
          {string}
        </ErrorListItemText>
        <ErrorListItemIcon
          icon={ICONS.ERROR}
          width={12}
          height={14}
          color={["red"]}/>
      </ErrorListItem>
  ))

  return (
    <Form>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormErrors>
            <ErrorList>
              {renderErrorMessage()}
            </ErrorList>
          </FormErrors>
          <FormRow>
            <Field
              id="oldPassword"
              name="oldPassword"
              type="password"
              label="Old Password"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="newPassword"
              name="newPassword"
              type="password"
              label="New Password"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmation"
              component={InputField}/>
          </FormRow>
          <FormRow >
            <input
              type="submit"
              className="btn-default"
              value="Change password"/>
          </FormRow>
        </FormBodyFields>
        {loader &&
        <FormLoader>
          <Loader />
        </FormLoader>}
      </FormBody>
    </Form>
  )
}

ChangePassword.propTypes = {
  errorMessage: PropTypes.object,
  errorChangePassword: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onControlError: PropTypes.func,
}

const mapStateToProps = state => ({
  errorChangePassword: getChangePasswordForm(state),
  loader: getLoader(state),
})

const mapDispatchToProps = {
  changePassword,
  deselectError,
  visibleLoader,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'changePassword',
    validate: validateChangePassword,
    onSubmitSuccess: afterSubmitChangePassword,
  }),
  withStateHandlers(
    () => ({ errorMessage: List() }),
    {
      onSubmit: ({ errorMessage }, props) => values => {
        props.visibleLoader()
        props.changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })

        return { errorMessage: errorMessage.clear() }
      },
      onControlError: ({ errorMessage }, props) => () => {

        if (props.errorChangePassword.error) {
          props.deselectError('changePassword')
          return { errorMessage: errorMessage.push(props.errorChangePassword.message) }
        }

        return errorMessage
      }
    }
  ),
  lifecycle({
    componentWillReceiveProps() {
      this.props.onControlError()
    }
  })
)(ChangePassword)
