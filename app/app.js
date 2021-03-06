/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactGA from 'react-ga'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import config from 'config/index'
import 'sanitize.css/sanitize.css'
import 'animate.css/animate.min.css'

// Import root app-render
import AppRender from 'app-render'

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/img/favicon/favicon.ico'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-72x72.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-96x96.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-128x128.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-144x144.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-152x152.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-192x192.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-384x384.png'
import '!file-loader?name=[name].[ext]!./assets/img/favicon/icon-512x512.png'
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from 'redux/configure-store'

// Import i18n messages
import { translationMessages } from './i18n'

// Import CSS reset and Global Styles
import './assets/less/site.less'

// Create redux store with history
const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

const render = messages => {
  history.listen(location => {
    ReactGA.initialize(config.analyticsId)
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })

  ReactDOM.render(
    <AppRender store={store} message={messages} history={history} />,
    MOUNT_NODE
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
