import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class NavigationLanding extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const signInBtnDisabled = this.props.location.pathname === '/sign-in'
    const signUpBtnDisabled = this.props.location.pathname === '/sign-up'

    return (
      <nav className="navbar-landing">
        <div className="navbar-landing__flex-container navbar-landing__flex-container--flex-row">
          <div className="navbar-landing__logo">
            <Link to="/landing-page">
              <img src="../../assets/img/logo.svg"/>
            </Link>
          </div>

          <div className="navbar-landing__link-up">
            <Link className="form-link form-link__button-in" to="/sign-in" disabled={signInBtnDisabled}>Sign in</Link>
            <Link className="form-link form-link__button-up" to="/sign-up" disabled={signUpBtnDisabled}>Sign up for Free</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationLanding
