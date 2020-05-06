import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import api from 'redux/utils/api'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'

// components
import NavigationLandingPrimary from '../navigation/navigation-landing-primary'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import styled, { keyframes } from 'styled-components'
import {
  fontMain,
  transition,
  borderRadius,
  mediaQueries,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'
import { pulse, fadeInDown, shake } from 'react-animations'

const show = keyframes`${pulse}`
const fadeDownAnimation = keyframes`${fadeInDown}`
const shakeAnimation = keyframes`${shake}`
const hide = keyframes`
    0%    {opacity: 0;}
    99%   {opacity: 0;}
    100%  {opacity: 1;}
`

const VerificationEmailContentWrapper = styled.div``

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 100px 50px 100px;

  ${mediaQueries.md} {
    margin: 100px 50px 50px 50px;
  }

  ${mediaQueries.sm} {
    margin: 100px 25px 50px 25px;
  }
`

const Text = styled.div`
  ${fontMain}
  font-size: 24px;
  margin-bottom: 50px;
  text-align: center;
  line-height: 40px;
  color: ${(props) => (props.error ? colors.pompelmo : colors.darkJungleGreen)};
  animation: ${(props) =>
    props.error ? `${shakeAnimation} 1000ms` : `${fadeDownAnimation} 500ms`};

  ${mediaQueries.sm} {
    font-size: 20px;
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 150px;
  border: none;
  ${borderRadius('75px')}
  font-size: 24px;
  color: ${colors.white};
  background: ${`linear-gradient(to right, ${colors.hanumanGreen} 50%, ${colors.darkJungleGreen} 50%)`};
  background-size: 200% 100%;
  background-position: right bottom;
  cursor: pointer;
  ${transition('500ms')}
  animation: 600ms ${hide}, 1000ms ${show} linear 600ms;

  :hover {
    background-position: left bottom;
  }
`

const IconWrapper = styled(Icon)`
  animation: 600ms ${hide}, 1000ms ${show} linear 600ms;
`

const VerificationEmailContent = ({ location, changeNavigation }) => {
  const [isVerified, setVerified] = useState(false)
  const handleSignUpNavigation = () => changeNavigation(routes.signIn)

  useEffect(() => {
    const verifyEmail = async (data) => {
      try {
        await api.verification.email(data)
        setVerified(true)
      } catch (error) {
        if (error.response.status === 401) {
          setVerified(true)
        } else {
          setVerified(false)
        }
      }
    }
    console.log('useEffect')
    const numberCharacter = '/verification/email/'.length
    const code = location.pathname.substring(numberCharacter)
    verifyEmail({ code })
  }, [])

  return (
    <VerificationEmailContentWrapper>
      <NavigationLandingPrimary location={location} />
      {!isVerified && (
        <Content>
          <Text error>Wrong verification!</Text>
          <IconWrapper
            icon={ICONS.IMPORTANT}
            width={50}
            height={50}
            scale={0.75}
            color={[colors.pompelmo]}
          />
        </Content>
      )}
      {isVerified && (
        <Content>
          <Text>
            Your email was successfully verified. You can already sign in!
          </Text>
          <Button onClick={handleSignUpNavigation}>Sign In</Button>
        </Content>
      )}
    </VerificationEmailContentWrapper>
  )
}

VerificationEmailContent.propTypes = {
  location: PropTypes.object,
  changeNavigation: PropTypes.func,
}

const mapDispatchToProps = {
  changeNavigation,
}

const mapStateToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationEmailContent)
