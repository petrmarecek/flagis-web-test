import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { borderRadius } from '../styled-components-mixins/'

const Item = styled.div`
  ${borderRadius('7px')}
  font-size: 11;
  font-weight: bold;
  color: #293034;
  padding: 2px 5px;
  background-color: #44FFB1;
`;

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
