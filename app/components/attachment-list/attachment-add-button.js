import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { isEmpty } from 'lodash'
import common from './common'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

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
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      toast.error(toastCommon.errorMessages.files.sizeValidation, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })
      return
    }
    onFileUploaded(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: common.MAX_SIZE,
  })

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
  handleClick: PropTypes.func,
  onFileUploaded: PropTypes.func,
}

export default AttachmentAddButton
