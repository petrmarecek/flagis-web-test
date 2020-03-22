import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { compose, lifecycle, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  deselectError,
  setLoader,
} from 'redux/store/app-state/app-state.actions'
import {
  getChangeNameForm,
  getLoader,
} from 'redux/store/app-state/app-state.selectors'
import {
  changeName,
  changeUserPhoto,
  resetUserPhoto,
} from 'redux/store/auth/auth.actions'
import {
  getUsername,
  getUserPhoto,
  getUserEmail,
  getColorTheme,
} from 'redux/store/auth/auth.selectors'
import { validateChangeName } from 'redux/utils/validate'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

// components
import ProfilePicture from 'components/profile-picture'
import InputField from 'components/forms/fields/input-field'
import Loader from 'components/common/loader'
import { ICONS } from 'components/icons/icon-constants'

// styles
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

const EditProfile = ({
  errorChangeName,
  email,
  imageUrl,
  initialValues,
  colorTheme,
  loader,
  handleSubmit,
  onSubmit,
  handleChangeUserPhoto,
  handleResetUserPhoto,
}) => (
  <div>
    <ProfilePicture
      imageUrl={imageUrl}
      email={email}
      username={initialValues}
      colorTheme={colorTheme}
      onChangePhoto={handleChangeUserPhoto}
      onResetPhoto={handleResetUserPhoto}
    />
    <Form nonMargin leftPadding maxWidth={500}>
      <FormBody onSubmit={handleSubmit(values => onSubmit(values))}>
        <FormBodyFields>
          <FormErrors>
            <ErrorList>
              {errorChangeName.message && (
                <ErrorListItem>
                  <ErrorListItemText>
                    {errorChangeName.message}
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
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              smallSize
              component={InputField}
            />
          </FormRow>
          <FormRow>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              smallSize
              component={InputField}
            />
          </FormRow>
          <FormRowButton>
            <ButtonDefaultSmall type="submit" value="Update Profile" />
          </FormRowButton>
        </FormBodyFields>
        {loader && <Loader global />}
      </FormBody>
    </Form>
  </div>
)

EditProfile.propTypes = {
  errorChangeName: PropTypes.object,
  initialValues: PropTypes.object,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  colorTheme: PropTypes.string,
  loader: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChangeUserPhoto: PropTypes.func,
  handleResetUserPhoto: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  errorChangeName: getChangeNameForm(state),
  email: getUserEmail(state),
  imageUrl: getUserPhoto(state),
  colorTheme: getColorTheme(state),
  initialValues: getUsername(state),
  loader: getLoader(state).form,
})

const mapDispatchToProps = {
  changeName,
  setLoader,
  deselectError,
  changeUserPhoto,
  resetUserPhoto,
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
      const { initialValues } = props
      const firstName = values.get('firstName')
      const lastName = values.get('lastName')

      if (initialValues !== null) {
        const initFirstName = initialValues.get('firstName')
        const initLastName = initialValues.get('lastName')

        if (initFirstName === firstName && initLastName === lastName) {
          return
        }
      }

      props.setLoader(loaderTypes.FORM)
      props.changeName({
        firstName: firstName,
        lastName: lastName,
      })
    },
    handleChangeUserPhoto: props => image => props.changeUserPhoto(image),
    handleResetUserPhoto: props => () => props.resetUserPhoto(),
  }),
  lifecycle({
    componentDidMount() {
      this.props.deselectError('changeName')
    },
  })
)(EditProfile)
