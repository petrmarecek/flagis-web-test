import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import filepicker from 'filepicker-js'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

filepicker.setKey('A7hMFRb7XS6KIA4fg4DChz')

class FilePicker extends PureComponent {

  static propTypes = {
    onFileUploaded: PropTypes.func,
    test: PropTypes.string,
  }

  handleClick = () => {
    filepicker.pick({language: 'en'}, (blob) => {
      this.props.onFileUploaded(blob)
    })
  }

  render() {
    return (
      <div className="attachment-add">
        <Icon
          className="attachment-add__icon-pin"
          icon={ICONS.PIN}
          width={23}
          height={26}
          color="#8C9DA9"
          onClick={this.handleClick}/>
        <button className="attachment-add__button" onClick={this.handleClick}>Add attachment</button>
      </div>
    )
  }
}

export default FilePicker
