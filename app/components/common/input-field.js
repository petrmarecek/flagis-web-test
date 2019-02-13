import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import styled, { css } from 'styled-components'
import { commonInput } from '../styled-components-mixins'

const activeLabel = css`
  left: 0;
  top: -14px;
  font-size: 13px;
`

const Field = styled.div`
  margin: 20px 0 0;
  position: relative;
`

const Input = styled.input`
  ${commonInput}
  width: 100%;
  color: ${props => (props.error ? 'red' : '#293034')};
  border-color: ${props => (props.error ? 'red' : '#44ffb1')};
  height: 32px;
`

const Label = styled.label`
  display: block;
  position: absolute;
  left: 5px;
  top: 5px;
  cursor: auto;
  font-size: 24px;
  color: #8C9DA9;
  transition: all 0.125s ease-out;
  ${props => (props.isFocused ? activeLabel : null)}
`

const InputField = props => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    label,
    id,
    type,
    disabled,
    isFocused,
    onHandleFocus,
    onHandleBlur,
  } = props

  return (
    <Field>
      <Input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={onHandleFocus}
        onBlur={onHandleBlur}
        error={Boolean(touched && error)}
      />
      <Label htmlFor={id} isFocused={Boolean(value || isFocused)}>
        {label}
      </Label>
    </Field>
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  onHandleFocus: PropTypes.func,
  onHandleBlur: PropTypes.func,
}

export default withStateHandlers(() => ({ isFocused: false }), {
  onHandleFocus: () => () => ({ isFocused: true }),
  onHandleBlur: () => () => ({ isFocused: false }),
})(InputField)
