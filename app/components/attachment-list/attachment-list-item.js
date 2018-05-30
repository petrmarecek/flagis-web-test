import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class AttachmentListItem extends PureComponent {

  static propTypes = {
    attachment: PropTypes.object,
    attachmentDelete: PropTypes.func,
    disabled: PropTypes.bool,
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.attachmentDelete(this.props.attachment.id)
  }

  render() {
    return (
      <li className="attachment">
        <Icon
          className="attachment__icon-file"
          icon={ICONS.FILE_EMPTY}
          width={18}
          height={18}
          scale={0.56}
          color="#8C9DA9"/>
        {!this.props.disabled &&
        <Icon
          className="attachment__remove"
          icon={ICONS.CROSS_SIMPLE}
          width={11}
          height={11}
          scale={0.78}
          color="#8c9da9"
          hoverColor="#282f34"
          onClick={this.handleDelete}/>}
        <div className="attachment__filename">
          <a href={this.props.attachment.url} target="_blank">{this.props.attachment.fileName}</a>
        </div>
      </li>
    )
  }
}

export default AttachmentListItem
