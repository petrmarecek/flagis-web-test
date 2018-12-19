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
  margin-right: ${props => props.rejected ? '0' : '6px'};
  background-color: ${props => props.rejected ? '#FF6A6A' : '#44FFB1'};
  font-size: 16px;
  color: #fff;
  border: none;

  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }
`;

const FollowerResponseButtons = ({ isAccepted, onHandleAcceptClicked, onHandleRejectClicked }) => (
  <Container>
    {!isAccepted && <Button onClick={onHandleAcceptClicked}>ACCEPT</Button>}
    <Button onClick={onHandleRejectClicked} rejected>REJECT</Button>
  </Container>
)

FollowerResponseButtons.propTypes = {
  isAccepted: PropTypes.bool,
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
