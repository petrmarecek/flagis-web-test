import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { colors } from 'components/styled-components-mixins/colors'

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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => (props.global ? colors.white : 'transparent')};
  opacity: ${props => (props.global ? '0.8' : '1')};
`

const Item = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props =>
    props.light ? colors.white : colors.darkJungleGreen};
  border-radius: 100%;
  display: inline-block;
  animation: ${skDelayAnimation} 1.7s infinite ease-in-out both;
  margin-right: 5px;
  opacity: 0;
`

const Loader = ({ global, light }) => (
  <Spinner global={global}>
    <Item delay={-0.6} light={light} />
    <Item delay={-0.4} light={light} />
    <Item delay={-0.2} light={light} />
    <Item delay={0} light={light} />
  </Spinner>
)

Loader.propTypes = {
  global: PropTypes.bool,
  light: PropTypes.bool,
}

export default Loader
