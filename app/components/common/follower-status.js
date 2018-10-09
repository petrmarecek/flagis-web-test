import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { keyframes } from 'styled-components'
import { transition, boxSizing } from 'components/styled-components-mixins'
import { pulse } from 'react-animations'

const show = keyframes`${pulse}`;
const hide = keyframes`
    0%    {opacity: 0;}
    99%   {opacity: 0;}
    100%  {opacity: 1;}
`;

const Container = styled.div`
  position: absolute;
  left: 5px;
  top: 2px;
  height: 26px;
  margin: 0 5px;
  animation: ${props => props.animation ? `500ms ${hide}, 1s ${show} linear 400ms` : 'none'};
`;

const Button = styled.button`
  ${boxSizing('border-box')}
  display: flex;
  justify-content: center;
  background-color: #44FFB1;
  width: 123px;
  border: none;
  padding: 0;
  
  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }
`;

const Title = styled.span`
  font-size: 16px;
  line-height: 26px;
  color: ${props => props.color};
`;

const FollowerStatus = ({ status, animation, handleSendTask }) => {
  const getStatus = {
     new: (
       <Button onClick={handleSendTask}>
         <Title color='#fff'>SEND TASK</Title>
       </Button>
     ),
     pending: <Title color='#8C9DA9'>WAITING FOR RESPONSE</Title>,
     rejected: <Title color='#FF6A6A'>REJECTED</Title>
  }

  return (
    <Container animation={animation}>
      {getStatus[status]}
    </Container>
  )
}

FollowerStatus.propTypes = {
  status: PropTypes.string,
  animation: PropTypes.bool,
  onSendTask: PropTypes.func,
  handleSendTask: PropTypes.func,
}

export default withHandlers({
  handleSendTask: props => () => props.onSendTask()
})(FollowerStatus)
