import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getChangeNameForm, getLoader } from 'redux/store/app-state/app-state.selectors'
import { changeName } from 'redux/store/auth/auth.actions'
import { validateChangeName } from 'redux/utils/validate'
import { afterSubmitChangeName } from 'redux/utils/form-submit'

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

const EditProfile = props => {
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
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              component={InputField}/>
          </FormRow>
          <FormRow>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              component={InputField}/>
          </FormRow>
          <FormRow >
            <input
              type="submit"
              className="btn-default"
              value="Change name"/>
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

EditProfile.propTypes = {
  errorMessage: PropTypes.object,
  errorChangeName: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onControlError: PropTypes.func,
}

const mapStateToProps = state => ({
  errorChangeName: getChangeNameForm(state),
  loader: getLoader(state),
})

const mapDispatchToProps = {
  changeName,
  deselectError,
  visibleLoader,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'changeName',
    validate: validateChangeName,
    onSubmitSuccess: afterSubmitChangeName,
  }),
  withStateHandlers(
    () => ({
      errorMessage: List(),
    }),
    {
      onSubmit: ({ errorMessage }, props) => values => {
        props.visibleLoader()
        props.changeName({
          firstName: values.firstName,
          lastName: values.lastName,
        })

        return { errorMessage: errorMessage.clear() }
      },
      onControlError: ({ errorMessage }, props) => () => {

        if (props.errorChangeName.error) {
          props.deselectError('changeName')
          return { errorMessage: errorMessage.push(props.errorChangeName.message) }
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
)(EditProfile)
