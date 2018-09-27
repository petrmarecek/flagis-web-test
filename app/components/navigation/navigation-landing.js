import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Logo from 'assets/img/logo.svg'

const NavigationLanding = ({ isLogoNav, location }) => {
  const signInBtnDisabled = location.pathname === '/sign-in'
  const signUpBtnDisabled = location.pathname === '/sign-up'

  return (
    <nav className="navbar-landing">
      <div className="navbar-landing__flex-container navbar-landing__flex-container--flex-row">
        <div className="navbar-landing__logo">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>

        {!isLogoNav &&
        <div className="navbar-landing__link-up">
          <Link
            className="form-link form-link__button-in"
            to="/sign-in"
            disabled={signInBtnDisabled}>
            Sign in
          </Link>
          <Link
            className="form-link form-link__button-up"
            to="/sign-up"
            disabled={signUpBtnDisabled}>
            Sign up for Free
          </Link>
        </div>}
      </div>
    </nav>
  )
}

NavigationLanding.propTypes = {
  isLogoNav: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default NavigationLanding
