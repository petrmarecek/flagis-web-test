import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled from 'styled-components'
import { transition } from 'components/styled-components-mixins'

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

  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }
`;

const FollowerResponseButtons = ({ onHandleAcceptClicked, onHandleRejectClicked }) => (
  <Container>
    <Button onClick={onHandleAcceptClicked}>ACCEPT</Button>
    <Button onClick={onHandleRejectClicked} rejected>REJECT</Button>
  </Container>
)

FollowerResponseButtons.propTypes = {
  acceptClicked: PropTypes.func,
  rejectClicked: PropTypes.func,
  onHandleAcceptClicked: PropTypes.func,
  onHandleRejectClicked: PropTypes.func,
}

export default withHandlers({
  onHandleAcceptClicked: props => event => {
    event.stopPropagation()
    props.acceptClicked()
  },
  onHandleRejectClicked: props => event => {
    event.stopPropagation()
    props.rejectClicked()
  }
})(FollowerResponseButtons)
