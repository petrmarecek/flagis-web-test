import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import {
  controlRedirectSignIn,
  controlRedirectTasks,
} from 'redux/store/auth/auth.actions'

import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import styled, { keyframes } from 'styled-components'
import { transition } from 'components/styled-components-mixins'
import { bounceIn, tada } from 'react-animations'

const bIn = keyframes`${bounceIn}`
const shake = keyframes`${tada}`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #fff;
  width: 100%;
`

const IconLogo = styled.div`
  margin: 50px 0 0 75px;
  z-index: 2;
`

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: -5px 0 0 0;
  padding: 50px 0;
  z-index: 2;
  animation: 1s ${bIn};
`

const Title = styled.div`
  font-size: 54px;
  margin: 0 0 50px 0;
  font-weight: bold;
  color: #ff6a6a;
`

const Text = styled.div`
  font-size: 32px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  height: 300px;
`

const Button = styled.button`
  height: 64px;
  padding: 15px 35px 15px 35px;
  border: none;
  border-radius: 100px;
  font-size: 32px;
  color: #fff;
  background-color: #ff6a6a;
  font-weight: bold;
  animation: 1s ${shake} linear 1500ms;
  background: linear-gradient(to right, #00ffc7 50%, #ff6a6a 50%);
  background-size: 201% 100%;
  background-position: right bottom;
  ${transition('1s')}

  :hover {
    background-position: left bottom;
  }
`

const NotFoundPage = ({ handleClick }) => (
  <div>
    <Wrapper>
      <IconLogo>
        <Icon
          icon={ICONS.LOGO}
          width={105}
          height={40}
          scale={1.57}
          color={['#293034', '#00FFC7']}
          onClick={handleClick}
        />
      </IconLogo>
      <MessageWrapper>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Text>
          <FormattedMessage {...messages.text} />
        </Text>
      </MessageWrapper>
      <ButtonWrapper>
        <Button onClick={handleClick}>GO TO HOMEPAGE</Button>
      </ButtonWrapper>
    </Wrapper>
  </div>
)

NotFoundPage.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  controlRedirectSignIn,
  controlRedirectTasks,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    handleClick: props => () => {
      props.controlRedirectSignIn()
      props.controlRedirectTasks()
    },
  })
)(NotFoundPage)
