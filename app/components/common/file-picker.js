import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
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

const FilePicker = ({ onFileUploaded }) => {
  const onDrop = useCallback(acceptedFiles => {
    onFileUploaded(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <AddAttachment {...getRootProps()}>
      <input {...getInputProps()} />
      <Icon icon={ICONS.PIN} width={23} height={26} color={['#1C2124']} />
      <Button>Add attachment</Button>
    </AddAttachment>
  )
}

FilePicker.propTypes = {
  test: PropTypes.string,
  onFileUploaded: PropTypes.func,
  handleClick: PropTypes.func,
}
export default FilePicker
