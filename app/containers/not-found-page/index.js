import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { controlRedirectSignIn, controlRedirectTasks } from 'redux/store/auth/auth.actions'

import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import styled, { keyframes } from 'styled-components'
import { transition } from 'components/styled-components-mixins'
import { bounceIn, tada } from 'react-animations'

const bIn = keyframes`${bounceIn}`;
const shake = keyframes`${tada}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 250px;
  bottom: 300px;
  right: 0;
  left: 0;
  background-color: #FF6A6A;
  z-index: 1;
  transform: skewY(-6deg);
  transform-origin: top left;
`;

const LogoContainer = styled.div`
  margin: 50px 0 0 75px;
  z-index: 2;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: -5px 0 0 0;
  padding: 50px 0;
  z-index: 2;
  animation: 1s ${bIn};
`;

const Title = styled.div`
  font-size: 54px;
  margin: 0 0 50px 0;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  height: 300px;
`;

const Button = styled.button`
  height: 64px;
  padding: 15px 35px 15px 35px;
  border: none;
  border-radius: 100px;
  font-size: 32px;
  color: #fff;
  background-color: #FF6A6A;
  font-weight: bold;
  animation: 1s ${shake} linear 1500ms;
  background: linear-gradient(to right, #00FFC7 50%, #FF6A6A 50%);
  background-size: 201% 100%;
  background-position: right bottom;
  ${transition('1s')}
  
  :hover {
    background-position:left bottom;
  }
`;

const NotFoundPage = ({ handleClick }) => (
  <div>
  <Container>
    <Background />
    <LogoContainer>
      <Icon
        icon={ICONS.LOGO}
        width={105}
        height={52}
        scale={1.61}
        color={['#293034', '#00FFC7']}
        onClick={handleClick} />
    </LogoContainer>
    <MessageContainer>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
      <Text>
        <FormattedMessage {...messages.text} />
      </Text>
    </MessageContainer>
    <ButtonContainer>
      <Button onClick={handleClick}>GO TO HOMEPAGE</Button>
    </ButtonContainer>
  </Container>
  </div>
)

NotFoundPage.propeTypes = {
  handleClick: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  controlRedirectSignIn,
  controlRedirectTasks
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleClick: props => () => {
      props.controlRedirectSignIn()
      props.controlRedirectTasks()
    }
  })
)(NotFoundPage)
