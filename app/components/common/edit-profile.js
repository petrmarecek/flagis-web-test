import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'

import { deselectError, visibleLoader } from 'redux/store/app-state/app-state.actions'
import { getChangeNameForm, getLoader } from 'redux/store/app-state/app-state.selectors'
import { changeName } from 'redux/store/auth/auth.actions'
import { getUsername } from 'redux/store/auth/auth.selectors'
import { validateChangeName } from 'redux/utils/validate'

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

const EditProfile = ({ errorChangeName, loader, handleSubmit, onSubmit }) => (
  <Form>
    <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
      <FormBodyFields>
        <FormErrors>
          <ErrorList>
            {errorChangeName.message &&
              <ErrorListItem>
                <ErrorListItemText>
                  {errorChangeName.message}
                </ErrorListItemText>
                <ErrorListItemIcon
                  icon={ICONS.ERROR}
                  width={12}
                  height={14}
                  color={["red"]}/>
              </ErrorListItem>}
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

EditProfile.propTypes = {
  errorChangeName: PropTypes.object,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  errorChangeName: getChangeNameForm(state),
  loader: getLoader(state),
  initialValues: getUsername(state)
})

const mapDispatchToProps = {
  changeName,
  visibleLoader,
  deselectError,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'changeName',
    validate: validateChangeName,
    enableReinitialize: true,
  }),
  withHandlers({
    onSubmit: props => values => {
      props.visibleLoader()
      props.changeName({
        firstName: values.get('firstName'),
        lastName: values.get('lastName'),
      })
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.deselectError('changeName')
    }
  })
)(EditProfile)
