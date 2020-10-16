import React from 'react'
import PropTypes from 'prop-types'
import { links } from 'utils/links'

// assets
import GooglePlay from 'assets/img/store-buttons/google-play.png'
import AppStore from 'assets/img/store-buttons/app-store.png'

const StoreButtons = ({ className }) => (
  <div className={className}>
    <a href={links.appStore} target="_blank">
      <img src={AppStore} alt="App store" />
    </a>
    <a href={links.googlePlay} target="_blank">
      <img src={GooglePlay} alt="Google play" />
    </a>
  </div>
)

StoreButtons.propTypes = {
  className: PropTypes.string,
}

export default StoreButtons
