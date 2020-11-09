import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { placeholderColor, boxSizing } from '../../styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const AddFieldStyle = styled.input`
  ${placeholderColor(colors.doveGrey)}
  ${boxSizing('border-box')}
  width: 100%;
  border: none;
  font-size: 16px;
  height: 30px;
  padding: 5px 0 5px 24px;
  color: ${props => (props.isError ? 'red' : 'black')};
  background-color: ${colors.white};
`

const AddField = props => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    id,
    placeholder,
    type,
  } = props

  return (
    <AddFieldStyle
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      isError={touched && error}
    />
  )
}

AddField.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default AddField
