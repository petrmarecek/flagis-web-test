import React from 'react'
import PropTypes from 'prop-types'
import { links } from 'utils/links'

// assets
import GooglePlay from 'assets/img/store-buttons/google-play.png'
import AppStore from 'assets/img/store-buttons/app-store.png'

const StoreButtons = ({ className }) => (
  <div className={className}>
    <a href={links.appStore}>
      <img src={AppStore} />
    </a>
    <a href={links.googlePlay}>
      <img src={GooglePlay} />
    </a>
  </div>
)

StoreButtons.propTypes = {
  className: PropTypes.string,
}

export default StoreButtons
