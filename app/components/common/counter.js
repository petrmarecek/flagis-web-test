import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { borderRadius } from '../styled-components-mixins/'

const Item = styled.div`
  ${borderRadius('10px')};
  font-weight: bold;
  color: #293034;
  padding: 2px 5px;
  text-align: center;
`

const Counter = ({ count, className, title }) => (
  <div className={className} title={title}>
    <Item>{count}</Item>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
  title: PropTypes.string,
}

export default Counter
