import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { getStoredState, persistStore } from 'redux-persist-immutable'
import immutableTransform from 'redux-persist-transform-immutable'
import { AuthStore as auth } from './redux/data/records'
import api from './redux/utils/api'
import localforage from 'localforage'

import { Provider } from 'react-redux'
import LanguageProvider from 'containers/language-provider'
import { ConnectedRouter } from 'react-router-redux'
import App from 'containers/app'
import MainLoader from 'components/common/main-loader'

// auth store to persist storage
const persistConfig = {
  storage: localforage,
  whitelist: ['auth'],
  transforms: [
    immutableTransform({
      records: [auth],
      whitelist: ['auth'],
    }),
  ],
}

// get access token and set to api
getStoredState(persistConfig, (err, restoredState) => {
  if (
    typeof restoredState === 'object' &&
    typeof restoredState.auth === 'object' &&
    restoredState.auth.accessToken
  ) {
    api.setApiToken(restoredState.auth.accessToken)
  }

  if (err) {
    // eslint-disable-next-line no-warning-comments
    // TODO
  }
})

export default class AppRender extends PureComponent {
  static propTypes = {
    store: PropTypes.any.isRequired,
    message: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
  }

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentDidMount() {
    persistStore(this.props.store, persistConfig, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <MainLoader />
    }

    return (
      <Provider store={this.props.store}>
        <LanguageProvider messages={this.props.message}>
          <ConnectedRouter history={this.props.history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    )
  }
}
