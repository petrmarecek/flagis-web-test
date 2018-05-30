import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AttachmentListItem from 'components/attachment-list/attachment-list-item'
import { Scrollbars } from 'react-custom-scrollbars'

class AttachmentList extends PureComponent {
  static propTypes = {
    attachments: PropTypes.object,
    attachmentDelete: PropTypes.func,
    disabled: PropTypes.bool,
  }

  componentDidMount() {
    // Scroll auto bottom
    this.refs.scrollbars.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    const prevNumberAttachments = prevProps.attachments.items.size
    const numberAttachments = this.props.attachments.items.size

    // Add new attachment
    if (numberAttachments === (prevNumberAttachments + 1)) {
      // Scroll auto bottom
      this.refs.scrollbars.scrollToBottom()
    }
  }

  render() {
    const scrollStyle = {
      height: `calc(100vh - 390px)`,
      overflow: 'hidden'
    }

    return (
      <Scrollbars
        ref="scrollbars"
        style={scrollStyle} >
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
      </Scrollbars>
    )
  }
}

export default AttachmentList
