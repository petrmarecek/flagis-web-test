import React from 'react'
import PropTypes from 'prop-types'
import AttachmentListItem from 'components/attachment-list/attachment-list-item'

const AttachmentList = props => {
  return (
    <div className="attachment-list-container">
      {!props.attachments.isFetching &&
        <ul className="attachment-list">
        {!props.disabled && props.attachments.items.map(attachment => (
          <AttachmentListItem
            key={attachment.id}
            attachment={attachment}
            attachmentDelete={props.attachmentDelete}/>
        ))}
        {props.disabled && props.attachments.items.map(attachment => (
          <AttachmentListItem
            key={attachment.id}
            attachment={attachment}
            attachmentDelete={props.attachmentDelete}
            disabled/>
        ))}
        </ul>
      }
    </div>
  )
}

AttachmentList.propTypes = {
  attachments: PropTypes.object,
  attachmentDelete: PropTypes.func,
  disabled: PropTypes.bool,
}

export default AttachmentList
