import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import filepicker from 'filepicker-js'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

filepicker.setKey('A7hMFRb7XS6KIA4fg4DChz')

import styled from 'styled-components'

const AddAttachment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`

const Button = styled.button`
  font-size: 14px;
  color: #1c2124;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  padding: 0;

  :active {
    outline: none;
  }
`

const FilePicker = ({ handleClick }) => (
  <AddAttachment onClick={handleClick}>
    <Icon
      icon={ICONS.PIN}
      width={23}
      height={26}
      color={['#1C2124']}
      onClick={handleClick}
    />
    <Button>Add attachment</Button>
  </AddAttachment>
)

FilePicker.propTypes = {
  test: PropTypes.string,
  onFileUploaded: PropTypes.func,
  handleClick: PropTypes.func,
}

export default withHandlers({
  handleClick: props => () => {
    filepicker.pick({ language: 'en' }, blob => {
      props.onFileUploaded(blob)
    })
  },
})(FilePicker)
