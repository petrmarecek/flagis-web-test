import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import styled from 'styled-components'

const AttachmentAddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const AddButton = styled.button`
  font-size: 14px;
  color: #1c2124;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  padding: 0;
  cursor: pointer;

  :active {
    outline: none;
  }
`

const AttachmentAddButton = ({ onFileUploaded }) => {
  const onDrop = useCallback(acceptedFiles => {
    onFileUploaded(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <AttachmentAddButtonWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <Icon icon={ICONS.PIN} width={23} height={26} color={['#1C2124']} />
      <AddButton>Add attachment</AddButton>
    </AttachmentAddButtonWrapper>
  )
}

AttachmentAddButton.propTypes = {
  test: PropTypes.string,
  onFileUploaded: PropTypes.func,
  handleClick: PropTypes.func,
}

export default AttachmentAddButton
