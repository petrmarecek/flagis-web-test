import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'

import {
  deselectError,
  setLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getChangePasswordForm,
  getLoader,
} from 'redux/store/app-state/app-state.selectors'
import { changePassword } from 'redux/store/auth/auth.actions'
import { validateChangePassword } from 'redux/utils/validate'
import { afterSubmitChangePassword } from 'redux/utils/form-submit'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

import InputField from 'components/forms/fields/input-field'
import Loader from 'components/common/loader'
import { ICONS } from 'components/icons/icon-constants'

import {
  ButtonDefaultSmall,
  Form,
  FormBody,
  FormBodyFields,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormRowButton,
} from '../styled-components-mixins'

const ChangePassword = ({
  errorChangePassword,
  loader,
  handleSubmit,
  onSubmit,
}) => (
  <Form maxWidth={500} nonMargin leftPadding>
    <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
      <FormBodyFields>
        <FormErrors>
          <ErrorList>
            {errorChangePassword.message && (
              <ErrorListItem>
                <ErrorListItemText>
                  {errorChangePassword.message}
                </ErrorListItemText>
                <ErrorListItemIcon
                  icon={ICONS.ERROR}
                  width={12}
                  height={14}
                  color={['red']}
                />
              </ErrorListItem>
            )}
          </ErrorList>
        </FormErrors>
        <FormRow>
          <Field
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Old Password"
            smallSize
            component={InputField}
          />
        </FormRow>
        <FormRow>
          <Field
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            smallSize
            component={InputField}
          />
        </FormRow>
        <FormRow>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmation"
            smallSize
            component={InputField}
          />
        </FormRow>
        <FormRowButton>
          <ButtonDefaultSmall type="submit" value="Change password" />
        </FormRowButton>
      </FormBodyFields>
      {loader && <Loader global />}
    </FormBody>
  </Form>
)

ChangePassword.propTypes = {
  errorChangePassword: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  errorChangePassword: getChangePasswordForm(state),
  loader: getLoader(state).form,
})

const mapDispatchToProps = {
  changePassword,
  setLoader,
  deselectError,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'changePassword',
    validate: validateChangePassword,
    onSubmitSuccess: afterSubmitChangePassword,
  }),
  withHandlers({
    onSubmit: props => values => {
      props.setLoader(loaderTypes.FORM)
      props.changePassword({
        oldPassword: values.get('oldPassword'),
        newPassword: values.get('newPassword'),
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.deselectError('changePassword')
    },
  })
)(ChangePassword)
