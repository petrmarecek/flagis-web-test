import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default class InputField extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    const { input: { value, onChange }, meta: { touched, error}, label, id, type } = this.props
    const controlCss = cx({
      'field__control': true,
      'field__control--with-value': Boolean(value),
      'field__control--error': Boolean(touched && error),
    })

    return (
      <div className="field">
        <div className="field__wrap">
          <input
            id={id}
            ref="control"
            className={controlCss}
            type={type}
            value={value}
            onChange={onChange} />
          <label className="field__label" htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
}
