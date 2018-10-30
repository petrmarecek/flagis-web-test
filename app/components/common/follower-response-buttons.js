import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  height: 26px;
  width: 117px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${props => props.rejected ? '6px' : '0'};
  background-color: ${props => props.rejected ? '#FF6A6A' : '#44FFB1'};
  font-size: 16px;
  font-style: italic;
  color: #fff;
  border: none;
`;

const FollowerResponseButtons = ({ onHandleAcceptedClick, onHandleRejectedClick }) => (
  <Container>
    <Button onClick={onHandleAcceptedClick}>ACCEPTED</Button>
    <Button onClick={onHandleRejectedClick} rejected>REJECTED</Button>
  </Container>
)

FollowerResponseButtons.propTypes = {
  onAcceptedClick: PropTypes.func,
  onRejectedClick: PropTypes.func,
  onHandleAcceptedClick: PropTypes.func,
  onHandleRejectedClick: PropTypes.func,
}

export default withHandlers({
  onHandleAcceptedClick: props => () => props.onAcceptedClick(),
  onHandleRejectedClick: props => () => props.onRejectedClick()
})(FollowerResponseButtons)
