import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { verifyUser } from 'redux/store/auth/auth.actions'
import { getVerificationFailed } from 'redux/store/auth/auth.selectors'

// components
import NavigationLandingPrimary from '../navigation/navigation-landing-primary'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import styled, { css, keyframes } from 'styled-components'
import { fontMain, mediaQueries } from 'components/styled-components-mixins'
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
  ${fontMain} font-size: 24px;
  margin-bottom: 50px;
  text-align: center;
  line-height: 40px;
  color: ${props => (props.error ? colors.pompelmo : colors.darkJungleGreen)};
  animation: ${props =>
    props.error
      ? css`
          ${shakeAnimation} 1000ms
        `
      : css`
          ${fadeDownAnimation} 500ms
        `};

  ${mediaQueries.sm} {
    font-size: 20px;
  }
`

const IconWrapper = styled(Icon)`
  animation: 600ms ${hide}, 1000ms ${show} linear 600ms;
`

const VerificationEmailContent = ({
  location,
  verifyUser,
  isVerificationFailed,
}) => {
  useEffect(() => {
    const numberCharacter = '/verification/email/'.length
    const code = location.pathname.substring(numberCharacter)
    verifyUser({ code })
  }, [])

  return (
    <VerificationEmailContentWrapper>
      <NavigationLandingPrimary location={location} />
      {isVerificationFailed && (
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
      {!isVerificationFailed && (
        <Content>
          <Text>Your email was successfully verified.</Text>
          <IconWrapper
            icon={ICONS.TASK_COMPLETED}
            scale={3}
            width={72}
            height={72}
            color={[colors.hanumanGreen]}
          />
        </Content>
      )}
    </VerificationEmailContentWrapper>
  )
}

VerificationEmailContent.propTypes = {
  location: PropTypes.object,
  verifyUser: PropTypes.func,
  isVerificationFailed: PropTypes.bool,
}

const mapDispatchToProps = {
  verifyUser,
}

const mapStateToProps = state => ({
  isVerificationFailed: getVerificationFailed(state),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationEmailContent)
