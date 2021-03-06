import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import styled, { css } from 'styled-components'
import { commonInput, commonInputSmall } from '../../styled-components-mixins'
import { colors } from '../../styled-components-mixins/colors'

const activeLabel = css`
  left: 0;
  top: -18px;
  font-size: 12px;
`

const Field = styled.div`
  margin: 20px 0 0;
  position: relative;
`

const TextArea = styled.textarea`
  ${props => (props.smallSize ? commonInputSmall : commonInput)}
  width: 100%;
  color: ${props => props.color};
  border-color: ${props => props.borderColor};
  height: ${props => props.height}px;
  resize: none;
`

const Label = styled.label`
  display: block;
  position: absolute;
  left: 5px;
  top: ${props => (props.smallSize ? '5px' : '-5px')};
  cursor: auto;
  font-size: ${props => (props.smallSize ? '18px' : '24px')};
  color: ${colors.lostAtSea};
  transition: all 0.125s ease-out;
  ${props => (props.isFocused ? activeLabel : null)}
`

const TextareaField = props => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    label,
    id,
    type,
    smallSize,
    disabled,
    height,
    isFocused,
    onHandleFocus,
    onHandleBlur,
  } = props

  const isError = touched && error
  const color = isError ? colors.pompelmo : colors.darkJungleGreen
  const borderColor = isError
    ? colors.pompelmo
    : isFocused
    ? colors.hanumanGreen
    : colors.snowShadow

  return (
    <Field>
      <TextArea
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={onHandleFocus}
        onBlur={onHandleBlur}
        color={color}
        height={height}
        borderColor={borderColor}
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

TextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  smallSize: PropTypes.bool,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  onHandleFocus: PropTypes.func,
  onHandleBlur: PropTypes.func,
}

export default withStateHandlers(() => ({ isFocused: false }), {
  onHandleFocus: () => () => ({ isFocused: true }),
  onHandleBlur: () => () => ({ isFocused: false }),
})(TextareaField)
