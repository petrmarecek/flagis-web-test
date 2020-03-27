import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { isEmpty } from 'lodash'
import common from './common'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { getLoader } from 'redux/store/app-state/app-state.selectors'

// components
import Loader from 'components/common/loader'
import Avatar from 'react-avatar'

// styles
import styled, { css } from 'styled-components'
import colors from 'components/styled-components-mixins/colors'
import { fontMain, transition } from 'components/styled-components-mixins'

const Wrapper = styled.div`
  min-height: 162px;
  margin: 45px 34px 0 34px;
  position: relative;
`

const UserImage = styled.div`
  margin: 0 0 15px 0;
  width: 90px;
  height: 90px;

  img {
    object-fit: cover;
  }
`

const textCss = css`
  ${fontMain}
  font-size: 14px;
  margin: 0 0 7px 0;
`

const Email = styled.div`
  ${textCss}
  color: ${props => colors[props.colorTheme].primaryText};
`

const Button = styled.div`
  ${textCss}
  cursor: pointer;
  width: 130px;
  color: ${props => colors[props.colorTheme].imagePickerButton};

  :hover {
    color: ${props => colors[props.colorTheme].imagePickerButtonHover};
    ${transition('color 250ms')}
  }
`

const ProfilePicture = ({
  loader,
  imageUrl,
  email,
  username,
  colorTheme,
  onChangePhoto,
  onResetPhoto,
}) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      toast.error(toastCommon.errorMessages.files.sizeValidation, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })
      return
    }

    onChangePhoto(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: common.ACCEPTED_TYPES,
    maxSize: common.MAX_SIZE,
    multiple: false,
  })

  return (
    <Wrapper>
      {loader && <Loader />}
      {!loader && (
        <span>
          <UserImage>
            <Avatar
              size="90"
              textSizeRatio={2}
              color={colors.defaultAvatar}
              src={imageUrl}
              round
              name={`${
                username !== null
                  ? `${username.get('firstName')} ${username.get('lastName')}`
                  : ''
              }`}
            />
          </UserImage>
          <Email colorTheme={colorTheme}>{email}</Email>
          <Button {...getRootProps()} colorTheme={colorTheme}>
            <input {...getInputProps()} />
            Change profile photo
          </Button>
          <Button onClick={() => onResetPhoto()} colorTheme={colorTheme}>
            Clear photo
          </Button>
        </span>
      )}
    </Wrapper>
  )
}

ProfilePicture.propTypes = {
  loader: PropTypes.bool,
  imageUrl: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.object,
  colorTheme: PropTypes.string,
  onChangePhoto: PropTypes.func,
  onResetPhoto: PropTypes.func,
}

const mapStateToProps = state => ({
  loader: getLoader(state).profilePicture,
})

export default connect(mapStateToProps)(ProfilePicture)
