import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MenuBoxGroupItems extends Component {

  static propTypes = {
    children: PropTypes.any,
  }

  render() {

    return (
      <div className="menu-box-group">
        {this.props.children}
      </div>
    )
  }
}
