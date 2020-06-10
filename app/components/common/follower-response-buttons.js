import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { css, keyframes } from 'styled-components'
import { pulse } from 'react-animations'
import { transition } from 'components/styled-components-mixins'

const show = keyframes`${pulse}`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  height: 26px;
  width: 117px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => (props.rejected ? '0' : '6px')};
  background-color: ${props => (props.rejected ? '#FF6A6A' : '#44FFB1')};
  font-size: 16px;
  color: #fff;
  border: none;
  animation: ${props => (props.animation ? css`500ms linear ${show}` : 'none')};
  cursor: pointer;

  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }
`

const FollowerResponseButtons = props => {
  const {
    isTakeBack,
    isAccepted,
    onHandleTakeBackClicked,
    onHandleAcceptClicked,
    onHandleRejectClicked,
  } = props

  const getRender = () => {
    if (isTakeBack) {
      return (
        <Container>
          <Button onClick={onHandleTakeBackClicked} rejected animation>
            TAKE BACK
          </Button>
        </Container>
      )
    }

    return (
      <Container>
        {!isAccepted && <Button onClick={onHandleAcceptClicked}>ACCEPT</Button>}
        <Button onClick={onHandleRejectClicked} rejected>
          REJECT
        </Button>
      </Container>
    )
  }

  return getRender()
}

FollowerResponseButtons.propTypes = {
  isTakeBack: PropTypes.bool,
  isAccepted: PropTypes.bool,
  takeBackClicked: PropTypes.func,
  acceptClicked: PropTypes.func,
  rejectClicked: PropTypes.func,
  onHandleTakeBackClicked: PropTypes.func,
  onHandleAcceptClicked: PropTypes.func,
  onHandleRejectClicked: PropTypes.func,
}

export default withHandlers({
  onHandleTakeBackClicked: props => event => {
    event.stopPropagation()
    props.takeBackClicked()
  },
  onHandleAcceptClicked: props => event => {
    event.stopPropagation()
    props.acceptClicked()
  },
  onHandleRejectClicked: props => event => {
    event.stopPropagation()
    props.rejectClicked()
  },
})(FollowerResponseButtons)
