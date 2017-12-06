import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class SearchBox extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  handleUpdate = event => {
    const value = event.target.value
    this.props.onChange(value)
  }

  handleKeyUp = event => {
    switch (event.which) {
      case 27:
        this.props.onChange('')
        return;
      default:
        // intentionally no action
        return
    }
  }

  render() {
    return (
      <div className="search">
        <Icon
          className="search__icon"
          icon={ICONS.MAGNIFIER}
          width={17}
          height={18}
          color="#8C9DA9"/>
        <input id="search" type="text" name="search" className="search__input"
          placeholder='Full text search' autoComplete="off"
          value={this.props.value}
          onChange={this.handleUpdate}
          onKeyUp={this.handleKeyUp} />
      </div>
    )
  }
}
