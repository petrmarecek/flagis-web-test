import React from 'react'
import PropTypes from 'prop-types'

import AttachmentListItem from 'components/attachment-list/attachment-list-item'
import { Scrollbars } from 'react-custom-scrollbars'

import { AttachmentListContainer } from './styles'

const AttachmentList = ({ attachments, attachmentDelete, disabled }) => {
  const scrollStyle = {
    height: `calc(100vh - 390px)`,
    overflow: 'hidden'
  }

  console.log(attachments)

  return (
    <Scrollbars
      ref={scrollbar => {
        if (scrollbar !== null) {
          scrollbar.scrollToBottom()
        }
      }}
      style={scrollStyle} >
      <AttachmentListContainer>
        <ul>
          {!attachments.isFetching && attachments.items.map(attachment => (
            <AttachmentListItem
              key={attachment.id}
              attachment={attachment}
              attachmentDelete={attachmentDelete}
              disabled={disabled}/>
          ))}
        </ul>
      </AttachmentListContainer>
    </Scrollbars>
  )
}

AttachmentList.propTypes = {
  attachments: PropTypes.object,
  attachmentDelete: PropTypes.func,
  disabled: PropTypes.bool,
}

export default AttachmentList
