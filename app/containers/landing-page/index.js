
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import Logo from 'assets/img/logo.svg'
import CheckImg from 'assets/img/check.svg'
import AndroidImg from 'assets/img/android_b.svg'

import MainImg from 'assets/img/img.png'
import MainImg2x from 'assets/img/img@2x.png'
import MainImg3x from 'assets/img/img@3x.png'

import { controlRedirectTasks } from 'redux/store/auth/auth.actions'
import NavigationLanding from 'components/navigation/navigation-landing'

class LandingPage extends PureComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    controlRedirectTasks: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.controlRedirectTasks()
  }

  detectMobileSystem = () => {
    let system = ''
    if (navigator.userAgent.match(/Android/i)) {
      system = {
        text: 'Get Flagis for Android',
        href: 'https://play.google.com/store/apps/details?id=com.flagis.mobile&ah=DFhuZmCYbFHAjJ2y8pWz6B5JeCE&hl=en-GB',
        isOther: false,
      }
      return system
    } /*else if (navigator.userAgent.match(/iphone/i)) {
      system = {
        text: 'Get Flagis for iOS',
        href: 'https://play.google.com/store/apps/details?id=com.flagis.mobile&ah=DFhuZmCYbFHAjJ2y8pWz6B5JeCE&hl=en-GB',
        isOther: false,
      }
      return system
    }*/ else {
      system = {
        isOther: true,
      }
      return system
    }
  }

  render() {
    const mobileSystem = this.detectMobileSystem()
    const isOtherSystem = mobileSystem.isOther
    const visibilityMobileLedge = cx({
      'landing-container__mobile-ledge': !isOtherSystem,
      'landing-container__mobile-ledge--hidden': isOtherSystem,
    })

    return (
      <div className="landing-container">
        <div className={visibilityMobileLedge}>
          <div className="landing-container__mobile-ledge__flex-container landing-container__mobile-ledge__flex-container--flex-row">
            <div className="landing-container__mobile-ledge__logo">
              <div className="landing-container__mobile-ledge__logo__border">
                <img src={Logo} />
              </div>
            </div>

            <div className="landing-container__mobile-ledge__text">
              <p>{mobileSystem.text}</p>
            </div>

            <div className="landing-container__mobile-ledge__google">
              <a href={mobileSystem.href}>
                <p><b>GET FREE</b></p>
              </a>
            </div>
          </div>
        </div>
        <NavigationLanding location={this.props.location}/>
        <div className="landing-page">
          <div className="landing-page__main">
            <div className="landing-page__flex-container landing-page__flex-container--flex-row landing-page__flex-container--flex-column">
              <div className="landing-page__text-main">
                <p className="landing-page__text-main--color">Manage<br/> all your things</p><p><b>that matter!</b></p>
              </div>
              <div className="landing-page__img">
                <img src={MainImg} srcSet={`${MainImg} 681w, ${MainImg2x} 1362w, ${MainImg3x} 2043w`} />
              </div>
            </div>
          </div>

          <div className="landing-page__info">
            <div className="landing-page__flex-container landing-page__flex-container--flex-row landing-page__flex-container--flex-column">
              <div className="landing-page__check-img">
                <img src={CheckImg} />
              </div>
              <div className="landing-page__text-info">
                <p><b>One clear view over tasks</b> that matter to you.</p>
              </div>
            </div>
            <div className="landing-page__line" />
            <div className="landing-page__flex-container landing-page__flex-container--flex-row landing-page__flex-container--flex-column">
              <div className="landing-page__check-img">
                <img src={CheckImg} />
              </div>
              <div className="landing-page__text-info">
                <p>Use tags for marking your tasks and <b>manage them the way you like</b>.</p>
              </div>
            </div>
            <div className="landing-page__line" />
            <div className="landing-page__flex-container landing-page__flex-container--flex-row landing-page__flex-container--flex-column">
              <div className="landing-page__check-img">
                <img src={CheckImg} />
              </div>
              <div className="landing-page__text-info">
                <p><b>Create your own permanent hierarchic filters</b> of tags to keep your regular views.</p>
              </div>
            </div>
          </div>

          <div className="landing-page__flex-container landing-page__flex-container--flex-row landing-page__flex-container--flex-column">
            <div className="landing-page__link-down landing-page__link-down--center">
              <Link className="form-link form-link__button-down" to="/sign-up">Sign up for Free</Link>
            </div>

            <div className="landing-page__google">
              <a href="https://play.google.com/store/apps/details?id=com.flagis.mobile&ah=DFhuZmCYbFHAjJ2y8pWz6B5JeCE&hl=en-GB">
                <img src={AndroidImg} />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = () => ({})
const mapDispatchToProps = { controlRedirectTasks }

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)

