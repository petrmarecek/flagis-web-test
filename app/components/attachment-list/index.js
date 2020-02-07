import React from 'react'
import PropTypes from 'prop-types'

// components
import AttachmentListItem from 'components/attachment-list/attachment-list-item'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

// styles
import { ListWrapper } from './styles'

const AttachmentList = ({
  attachments,
  attachmentDelete,
  disabled,
  attachmentScrollHeight,
}) => {
  const scrollStyle = {
    height: `calc(100vh - ${attachmentScrollHeight}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px #fff',
    boxShadowBottom: 'inset 0 -10px 10px -5px #fff',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar style={scrollStyle} isScrollBottom>
      <ListWrapper>
        <ul>
          {!attachments.isFetching &&
            attachments.items.map(attachment => (
              <AttachmentListItem
                key={attachment.id}
                attachment={attachment}
                attachmentDelete={attachmentDelete}
                disabled={disabled}
              />
            ))}
        </ul>
      </ListWrapper>
    </ShadowScrollbar>
  )
}

AttachmentList.propTypes = {
  attachments: PropTypes.object,
  attachmentDelete: PropTypes.func,
  disabled: PropTypes.bool,
  attachmentScrollHeight: PropTypes.number,
}

export default AttachmentList
