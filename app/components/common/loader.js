import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'

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
  background-color: #3e484f;
  z-index: 1000;
`

const skDelayAnimation = keyframes`
    0%,
    80%,
    100% {
      transform: scale(0);
      opacity: 0;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
`

const Spinner = styled.div`
  width: 100%;
  text-align: center;
  margin: ${props => (props.global ? '0' : 'auto 10px')};
  ${props => (props.global ? globalSpinner : null)}
`

const Item = styled.div`
  width: 10px;
  height: 10px;
  background-color: #d7e3ec;
  border-radius: 100%;
  display: inline-block;
  animation: ${skDelayAnimation} 1.7s infinite ease-in-out both;
  margin-right: 5px;
  opacity: 0;
`

const Loader = ({ global }) => (
  <Spinner global={global}>
    <Item delay={-0.6} />
    <Item delay={-0.4} />
    <Item delay={-0.2} />
    <Item delay={0} />
  </Spinner>
)

Loader.propTypes = {
  global: PropTypes.bool,
}

export default Loader
