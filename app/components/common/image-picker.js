import React from 'react'
import PropTypes from 'prop-types'
import filestackConf from 'config/filestack'
import { withHandlers } from 'recompose'

// components
import Avatar from 'react-avatar'

// styles
import styled, { css } from 'styled-components'
import colors from 'components/styled-components-mixins/colors'
import { fontMain, transition } from 'components/styled-components-mixins'

const Wrapper = styled.div`
  margin: 45px 34px 0 34px;
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

const ImagePicker = ({
  imageUrl,
  email,
  username,
  colorTheme,
  onHandleChangePhoto,
  onHandleClearPhoto,
}) => (
  <Wrapper>
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
    <Button onClick={onHandleChangePhoto} colorTheme={colorTheme}>
      Change profile photo
    </Button>
    <Button onClick={onHandleClearPhoto} colorTheme={colorTheme}>
      Clear photo
    </Button>
  </Wrapper>
)

ImagePicker.propTypes = {
  imageUrl: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.object,
  colorTheme: PropTypes.string,
  onChangePhoto: PropTypes.func,
  onHandleChangePhoto: PropTypes.func,
  onHandleClearPhoto: PropTypes.func,
}

export default withHandlers({
  onHandleChangePhoto: props => () => {
    const { imageUrl } = props
    const { security } = filestackConf
    const client = filestackConf.filestackInit
    const fileKey = imageUrl
      ? imageUrl.substring(filestackConf.filestackUrlLength)
      : imageUrl

    const options = {
      accept: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/gif',
      ],
      transformations: {
        crop: true,
        circle: true,
        rotate: true,
      },
      uploadInBackground: false,
      maxSize: Math.pow(2, 19),
      onUploadDone: files => {
        const file = files.filesUploaded[0]
        props.onChangePhoto(file)

        if (fileKey !== null) {
          client.remove(fileKey, security)
        }
      },
    }

    client.picker(options).open()
  },
  onHandleClearPhoto: props => () => {
    const { imageUrl } = props
    const { security } = filestackConf
    const client = filestackConf.filestackInit
    const fileKey = imageUrl
      ? imageUrl.substring(filestackConf.filestackUrlLength)
      : imageUrl

    if (fileKey !== null) {
      client.remove(fileKey, security)
    }

    props.onChangePhoto(null)
  },
})(ImagePicker)
