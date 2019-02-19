import React from 'react'
import PropTypes from 'prop-types'
import filestackConf from 'config/filestack'
import { withHandlers } from 'recompose'

// components
import Avatar from 'react-avatar'

// styles
import styled from 'styled-components'
import colors from 'components/styled-components-mixins/colors'
import { fontMain, transition } from 'components/styled-components-mixins'

const Wrapper = styled.div`
  width: 130px;
  margin: 45px 0 0 34px;
`

const UserImage = styled.div`
  margin: 0 0 15px 0;
  width: 90px;
  height: 90px;
`

const Button = styled.div`
  ${fontMain}
  font-size: 14px;
  color: ${props => colors[props.colorTheme].imagePickerButton};
  margin: 0 0 7px 0;
  cursor: pointer;

  :hover {
    color: ${props => colors[props.colorTheme].imagePickerButtonHover};
    ${transition('color 250ms')}
  }
`

const ImagePicker = ({
  imageUrl,
  username,
  colorTheme,
  onHandleChangeImage,
  onHandleClearImage,
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
    <Button onClick={onHandleChangeImage} colorTheme={colorTheme}>
      Change profile photo
    </Button>
    <Button onClick={onHandleClearImage} colorTheme={colorTheme}>
      Clear photo
    </Button>
  </Wrapper>
)

ImagePicker.propTypes = {
  imageUrl: PropTypes.string,
  username: PropTypes.object,
  colorTheme: PropTypes.string,
  onChangeImage: PropTypes.func,
  onHandleChangeImage: PropTypes.func,
  onHandleClearImage: PropTypes.func,
}

export default withHandlers({
  onHandleChangeImage: props => () => {
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
        props.onChangeImage(file)

        if (fileKey !== null) {
          client.remove(fileKey, security)
        }
      },
    }

    client.picker(options).open()
  },
  onHandleClearImage: props => () => {
    const { imageUrl } = props
    const { security } = filestackConf
    const client = filestackConf.filestackInit
    const fileKey = imageUrl
      ? imageUrl.substring(filestackConf.filestackUrlLength)
      : imageUrl

    if (fileKey !== null) {
      client.remove(fileKey, security)
    }

    props.onChangeImage(null)
  },
})(ImagePicker)
