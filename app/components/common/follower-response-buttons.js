import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { css, keyframes } from 'styled-components'
import { pulse } from 'react-animations'
import {
  transition,
  borderRadius,
  boxShadow,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const show = keyframes`${pulse}`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  ${borderRadius('4px')};
  ${boxShadow(`0 0 1px 0 ${colors.americanSilver}`)};
  border: 1px solid ${colors.coldWind};
  height: 26px;
  width: 117px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  margin-right: ${props => (props.rejected ? '0' : '6px')};
  color: ${props => (props.rejected ? colors.pompelmo : colors.hanumanGreen)};
  font-size: 16px;
  animation: ${props => (props.animation ? css`500ms linear ${show}` : 'none')};
  cursor: pointer;

  :hover {
    ${transition('500ms')};
    background-color: ${props =>
      props.rejected ? colors.pompelmo : colors.hanumanGreen};
    color: ${colors.white};
    border: 1px solid
      ${props => (props.rejected ? colors.pompelmo : colors.hanumanGreen)};
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
            Take back
          </Button>
        </Container>
      )
    }

    return (
      <Container>
        {!isAccepted && <Button onClick={onHandleAcceptClicked}>Accept</Button>}
        <Button onClick={onHandleRejectClicked} rejected>
          Reject
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
