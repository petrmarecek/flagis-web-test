import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const AddFieldStyle = styled.input`
  &::-webkit-input-placeholder {
        color: #d7e3ec;
  }
  &:-moz-placeholder { /!* Firefox 18- *!/
      color: #d7e3ec;
  }

  &::-moz-placeholder { /!* Firefox 19+ *!/
      color: #d7e3ec;
  }

  &:-ms-input-placeholder {
      color: #d7e3ec;
  }
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 16px;
  height: 50px;
  padding: 5px 0 5px 10px;
  color: ${props => props.isError ? 'red' : 'black'};
`;

const AddField = props => {

  const {
    input: { value, onChange },
    meta: { touched, error },
    id,
    placeholder,
    type
  } = props

  return (
    <AddFieldStyle
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isError={(touched && error)}/>
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

