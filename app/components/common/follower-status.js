import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { css, keyframes } from 'styled-components'
import { transition, boxSizing } from 'components/styled-components-mixins'
import { pulse } from 'react-animations'

const show = keyframes`${pulse}`
const hide = keyframes`
    0%    {opacity: 0;}
    99%   {opacity: 0;}
    100%  {opacity: 1;}
`

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0 5px;
  animation: ${props =>
    props.animation ? css`500ms ${hide}, 500ms ${show} linear 500ms` : 'none'};
`

const Button = styled.button`
  ${boxSizing('border-box')}
  display: flex;
  justify-content: center;
  background-color: #44ffb1;
  width: 123px;
  border: none;
  padding: 0;
  cursor: pointer;

  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }
`

const Title = styled.span`
  font-size: 16px;
  line-height: 25px;
  color: ${props => props.color};
  animation: ${props =>
    props.animation ? css`500ms ${hide}, 500ms ${show} linear 500ms` : 'none'};
`

const FollowerStatus = ({ status, animation, onHandleSend }) => {
  const getStatus = {
    new: (
      <Button onClick={onHandleSend}>
        <Title color="#fff">SEND TASK</Title>
      </Button>
    ),
    pending: (
      <Title color="#8C9DA9" animation={animation}>
        WAITING FOR RESPONSE
      </Title>
    ),
    rejected: (
      <Title color="#FF6A6A" animation={animation}>
        REJECTED
      </Title>
    ),
  }

  return <Container animation={animation}>{getStatus[status]}</Container>
}

FollowerStatus.propTypes = {
  status: PropTypes.string,
  animation: PropTypes.bool,
  onSend: PropTypes.func,
  onHandleSend: PropTypes.func,
}

export default withHandlers({
  onHandleSend: props => () => props.onSend(),
})(FollowerStatus)
