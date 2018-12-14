import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const globalSpinner = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  background-color: #3E484F;
  z-index: 1000;
`;

const Spinner = styled.div`
  width: 100%;
  text-align: center;
  margin: ${props => props.global ? '0' : '10px'};
  ${props => props.global ? globalSpinner : null}
`;

const Item = styled.div`
  width: 10px;
  height: 10px;
  background-color: #D7E3EC;
  border-radius: 100%;
  display: inline-block;
  animation: sk-delay 1.7s infinite ease-in-out both;
  margin-right: 5px;
  opacity: 0;
  animation-delay: ${props => props.delay}s;
`;

const Loader = ({ global }) => (
  <Spinner global={global}>
    <Item delay={-0.60}/>
    <Item delay={-0.40}/>
    <Item delay={-0.20}/>
    <Item delay={0}/>
  </Spinner>
)

Loader.propTypes = {
  global: PropTypes.bool,
}

export default Loader
