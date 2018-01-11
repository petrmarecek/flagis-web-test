import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AttachmentListItem from 'components/attachment-list/attachment-list-item'

export default class AttachmentList extends Component{

  static propTypes = {
    attachments: PropTypes.object,
    attachmentDelete: PropTypes.func,
    disabled: PropTypes.bool,
  }

  render() {
    return (
      <div className="attachment-list-container">
        {!this.props.attachments.isFetching &&
          <ul className="attachment-list">
          {!this.props.disabled && this.props.attachments.items.map(attachment => (
            <AttachmentListItem
              key={attachment.id}
              attachment={attachment}
              attachmentDelete={this.props.attachmentDelete}/>
          ))}
          {this.props.disabled && this.props.attachments.items.map(attachment => (
            <AttachmentListItem
              key={attachment.id}
              attachment={attachment}
              attachmentDelete={this.props.attachmentDelete}
              disabled/>
          ))}
          </ul>
        }
      </div>
    )
  }
}
