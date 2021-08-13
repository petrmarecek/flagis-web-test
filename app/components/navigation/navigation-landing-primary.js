import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { Link } from 'react-router-dom'
import Logo from 'assets/img/logo/logo.svg'

// styles
import {
  NavigationLandingPrimaryWrapper,
  LandingLogo,
  LandingButtons,
  LandingButtonSignIn,
  LandingButtonSignUp,
} from './styles'

const NavigationLandingPrimary = ({ isLogoNav, location }) => {
  const signInBtnDisabled = location.pathname === routes.signIn
  const signUpBtnDisabled = location.pathname === routes.signUp

  return (
    <NavigationLandingPrimaryWrapper>
      <LandingLogo>
        <a href="https://www.flagis.com">
          <img src={Logo} />
        </a>
      </LandingLogo>

      {!isLogoNav && (
        <LandingButtons>
          <LandingButtonSignIn active={signInBtnDisabled}>
            <Link to="/sign-in">Sign in</Link>
          </LandingButtonSignIn>
          <LandingButtonSignUp active={signUpBtnDisabled}>
            <Link to="/sign-up">Sign up for Free</Link>
          </LandingButtonSignUp>
        </LandingButtons>
      )}
    </NavigationLandingPrimaryWrapper>
  )
}

NavigationLandingPrimary.propTypes = {
  isLogoNav: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default NavigationLandingPrimary
