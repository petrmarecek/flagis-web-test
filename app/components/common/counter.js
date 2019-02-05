import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { borderRadius } from '../styled-components-mixins/'

const Item = styled.div`
  ${borderRadius('10px')}
  font-weight: bold;
  color: #293034;
  padding: 2px 5px;
`

const Counter = ({ count, className }) => (
  <div className={className}>
    <Item>{count}</Item>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
}

export default Counter
