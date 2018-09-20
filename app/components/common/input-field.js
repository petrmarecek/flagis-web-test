import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const InputField = props => {

  const {
    input: { value, onChange },
    meta: { touched, error },
    label,
    id,
    type
  } = props

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
          className={controlCss}
          type={type}
          value={value}
          onChange={onChange} />
        <label className="field__label" htmlFor={id}>{label}</label>
      </div>
    </div>
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default InputField
