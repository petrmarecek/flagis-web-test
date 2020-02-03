import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { colors } from '../../styled-components-mixins/colors'
import { fontMain } from '../../styled-components-mixins'

const backgroundColor = colors.white
const checkedBackgroundColor = colors.hanumanGreen
const checkColor = colors.white

const Field = styled.div``

const Checkbox = styled.input`
  display: none;

  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: ${backgroundColor};
    box-shadow: 0 0 0 1px ${props => props.borderColor};
  }

  &:hover + label:before {
    box-shadow: 0 0 0 1px ${props => props.borderColor};
    background: ${checkedBackgroundColor};
  }

  &:checked + label:before {
    box-shadow: 0 0 0 1px ${props => props.borderColor};
    background: ${checkedBackgroundColor};
  }

  &:checked + label:after {
    content: '';
    background: ${checkColor};
    position: absolute;
    left: 4px;
    width: 2px;
    height: 2px;
    box-shadow: 0 0 0 ${checkColor}, 2px 0 0 ${checkColor},
      4px 0 0 ${checkColor}, 4px -2px 0 ${checkColor}, 4px -4px 0 ${checkColor},
      4px -6px 0 ${checkColor}, 4px -8px 0 ${checkColor},
      4px -10px 0 ${checkColor};
    transform: rotate(45deg);
  }
`

const Label = styled.label`
  ${fontMain}
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 14px;

  a {
    text-decoration: underline;
  }
`

const CheckboxField = props => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    label,
    children,
    id,
    checked,
    smallSize,
    disabled,
  } = props

  const isError = touched && error
  const borderColor = isError ? colors.pompelmo : colors.snowShadow

  return (
    <Field>
      <Checkbox
        id={id}
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        borderColor={borderColor}
        smallSize={smallSize}
      />
      <Label htmlFor={id}>{label || children}</Label>
    </Field>
  )
}

CheckboxField.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  smallSize: PropTypes.bool,
}

export default CheckboxField
