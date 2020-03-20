import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { colors } from 'components/styled-components-mixins/colors'
import { borderRadius } from 'components/styled-components-mixins'

const loaderHeight = '9px'
const loaderWidth = '23px'
const loadDuration = '1.8s'
const load = keyframes`
    0% {
      transform: translateX(10px);
    }

    50% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(10px);
    }
`

const LoaderWrapper = styled.div`
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

const LoaderItem = styled.div`
  ${borderRadius('5px')};
  transform: translate(-50%, -50%);
  width: ${loaderWidth};
  height: ${loaderHeight};
  background: ${props => (props.light ? colors.white : colors.darkJungleGreen)};
  animation: ${load} ${loadDuration} ease-in-out infinite;

  &:before,
  &:after {
    ${borderRadius('5px')};
    position: absolute;
    display: block;
    content: '';
    animation: ${load} ${loadDuration} ease-in-out infinite;
    height: ${loaderHeight};
    background: ${props =>
      props.light ? colors.white : colors.darkJungleGreen};
  }

  &:before {
    top: -14px;
    width: ${loaderWidth};
  }

  &:after {
    bottom: -14px;
    width: 9px;
  }
`

const Loader = ({ global, light }) => (
  <LoaderWrapper global={global}>
    <LoaderItem light={light} />
  </LoaderWrapper>
)

Loader.propTypes = {
  global: PropTypes.bool,
  light: PropTypes.bool,
}

export default Loader
