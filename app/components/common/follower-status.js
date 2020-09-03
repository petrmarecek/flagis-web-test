import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import styled, { css, keyframes } from 'styled-components'
import {
  transition,
  boxSizing,
  borderRadius,
  boxShadow,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'
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
  ${boxSizing('border-box')};
  ${borderRadius('4px')};
  ${boxShadow(`0 0 1px 0 ${colors.americanSilver}`)};
  border: 1px solid ${colors.coldWind};
  display: flex;
  justify-content: center;
  background-color: ${colors.white};
  width: 123px;
  padding: 0;
  cursor: pointer;
  color: ${colors.hanumanGreen};

  :hover {
    ${transition('500ms')};
    background-color: ${colors.hanumanGreen};
    color: ${colors.white};
    border: 1px solid ${colors.hanumanGreen};
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
        <Title>Send Task</Title>
      </Button>
    ),
    pending: (
      <Title color={colors.lostAtSea} animation={animation}>
        WAITING FOR RESPONSE
      </Title>
    ),
    rejected: (
      <Title color={colors.pompelmo} animation={animation}>
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
