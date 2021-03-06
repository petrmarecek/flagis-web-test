import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// components
import { ICONS } from 'components/icons/icon-constants'

// styles
import { ItemWrapper, IconFile, IconRemove, FileName } from './styles'

const AttachmentListItem = ({
  attachment,
  disabled,
  onHandleAttachmentDelete,
}) => (
  <ItemWrapper>
    <IconFile
      icon={ICONS.FILE_EMPTY}
      width={18}
      height={18}
      scale={0.56}
      color={['#B1B5B8']}
    />
    {!disabled && (
      <IconRemove
        icon={ICONS.CROSS_SIMPLE}
        width={11}
        height={11}
        scale={0.78}
        color={['#e1e4e5']}
        hoverColor={['#1c2124']}
        onClick={onHandleAttachmentDelete}
      />
    )}
    <FileName>
      <a href={attachment.url} target="_blank">
        {attachment.fileName}
      </a>
    </FileName>
  </ItemWrapper>
)

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
  },
})(AttachmentListItem)
