import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import styled, { css } from 'styled-components'
import { commonInput, commonInputSmall } from '../styled-components-mixins'

const activeLabel = css`
  left: 0;
  top: -14px;
  font-size: 12px;
`

const Field = styled.div`
  margin: 20px 0 0;
  position: relative;
`

const Input = styled.input`
  ${props => (props.smallSize ? commonInputSmall : commonInput)}
  width: 100%;
  color: ${props => (props.error ? 'red' : '#293034')};
  border-color: ${props => (props.error ? 'red' : '#44ffb1')};
  height: 32px;
`

const Label = styled.label`
  display: block;
  position: absolute;
  left: 5px;
  top: ${props => (props.smallSize ? '5px' : '-5px')};
  cursor: auto;
  font-size: ${props => (props.smallSize ? '18px' : '24px')};
  color: #8c9da9;
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
    smallSize,
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
        smallSize={smallSize}
      />
      <Label
        htmlFor={id}
        isFocused={Boolean(value || isFocused)}
        smallSize={smallSize}
      >
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
  smallSize: PropTypes.bool,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  onHandleFocus: PropTypes.func,
  onHandleBlur: PropTypes.func,
}

export default withStateHandlers(() => ({ isFocused: false }), {
  onHandleFocus: () => () => ({ isFocused: true }),
  onHandleBlur: () => () => ({ isFocused: false }),
})(InputField)
