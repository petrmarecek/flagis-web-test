import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { ICONS } from 'components/icons/icon-constants'

import {
  AttachmentItemContainer,
  AttachmentItemIconFile,
  AttachmentItemIconRemove,
  AttachmentItemFileName,
} from './styles'

const AttachmentListItem = ({ attachment, disabled, onHandleAttachmentDelete }) => {

  return (
    <AttachmentItemContainer>
      <AttachmentItemIconFile
        icon={ICONS.FILE_EMPTY}
        width={18}
        height={18}
        scale={0.56}
        color={["#8C9DA9"]}/>
      {!disabled &&
      <AttachmentItemIconRemove
        icon={ICONS.CROSS_SIMPLE}
        width={11}
        height={11}
        scale={0.78}
        color={["#8c9da9"]}
        hoverColor={["#282f34"]}
        onClick={onHandleAttachmentDelete}/>}
      <AttachmentItemFileName>
        <a href={attachment.url} target="_blank">{attachment.fileName}</a>
      </AttachmentItemFileName>
    </AttachmentItemContainer>
  )
}

AttachmentListItem.propTypes = {
  attachment: PropTypes.object,
  disabled: PropTypes.bool,
  attachmentDelete: PropTypes.func,
  onHandleAttachmentDelete: PropTypes.func,
}

export default withHandlers({
  onHandleAttachmentDelete: props => event => {
    event.preventDefault()
    props.attachmentDelete(props.attachment.id)
  }
})(AttachmentListItem)
