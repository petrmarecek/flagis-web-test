import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { keyframes } from 'styled-components'
import { transition } from 'components/styled-components-mixins'
import { bounceIn } from 'react-animations'

const pulser = keyframes`${bounceIn}`;

const Container = styled.div`
  position: absolute;
  left: 5px;
  top: 0;
  height: 26px;
  margin: 0 5px;
  animation: 1s ${pulser};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  background-color: #44FFB1;
  width: 123px;
  border: none;
  
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

const FollowerStatus = ({ status, handleSendTask }) => {
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
    <Container>
      {getStatus[status]}
    </Container>
  )
}

FollowerStatus.propTypes = {
  status: PropTypes.string,
  onSendTask: PropTypes.func,
  handleSendTask: PropTypes.func,
}

export default withHandlers({
  handleSendTask: props => () => props.onSendTask()
})(FollowerStatus)
