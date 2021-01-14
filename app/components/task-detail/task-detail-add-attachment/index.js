import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { ATTACHMENT_MAX_UPLOAD_SIZE } from '../../../utils/constants'
import toast from '../../../utils/toastify-helper'
import * as toastCommon from '../../toast-notifications/toast-notifications-common'

import { Header, HeaderIcon, HeaderLeft, HeaderTitle, Wrapper } from './styles'

const TaskDetailAddAttachment = ({ isUpdatable, onUpload }) => {
  // Prepare drop handler
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      toast.error(toastCommon.errorMessages.files.sizeValidation, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })
      return
    }
    onUpload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: ATTACHMENT_MAX_UPLOAD_SIZE,
  })

  if (!isUpdatable) {
    return null
  }

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <Header>
        <HeaderLeft>
          <HeaderIcon />
        </HeaderLeft>
        <HeaderTitle>Add Attachment</HeaderTitle>
      </Header>
    </Wrapper>
  )
}

TaskDetailAddAttachment.defaultProps = {
  isUpdatable: true,
}

TaskDetailAddAttachment.propTypes = {
  isUpdatable: PropTypes.bool,
  onUpload: PropTypes.func.isRequired,
}

export default TaskDetailAddAttachment
