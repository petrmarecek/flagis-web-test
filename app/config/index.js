const compileEnv = process.env.COMPILE_ENV || 'development'

const firebaseLocal = {
  apiKey: 'AIzaSyBWyOwLGhjOVZ9SHC3uuqiUR8wnf4ZGABk',
  authDomain: 'flagis-local-f62f4.firebaseapp.com',
  databaseURL: 'https://flagis-local-f62f4.firebaseio.com',
  projectId: 'flagis-local-f62f4',
  storageBucket: 'flagis-local-f62f4.appspot.com',
  messagingSenderId: '5299835482',
  appId: '1:5299835482:web:10f35f3ca45bf56a9cfe63',
}

const firebaseDevelopment = {
  apiKey: 'AIzaSyDFw-G0nAvPxD3Sw9wi2SnKIOxSTQGyVUY',
  authDomain: 'flagis-development.firebaseapp.com',
  databaseURL: 'https://flagis-development.firebaseio.com',
  projectId: 'flagis-development',
  storageBucket: 'flagis-development.appspot.com',
  messagingSenderId: '153227018743',
}

const firebaseStaging = {
  apiKey: 'AIzaSyAVGM-kd07mM8a8iEBDpUm_I5qQW_-Io_Y',
  authDomain: 'flagis-staging.firebaseapp.com',
  databaseURL: 'https://flagis-staging.firebaseio.com',
  projectId: 'flagis-staging',
  storageBucket: 'flagis-staging.appspot.com',
  messagingSenderId: '631732520892',
}

const firebaseProduction = {
  apiKey: 'AIzaSyBmGwTlxWhlBvYbO76kHyHYd3waP8uP6ZA',
  authDomain: 'flagis-production.firebaseapp.com',
  databaseURL: 'https://flagis-production.firebaseio.com',
  projectId: 'flagis-production',
  storageBucket: 'flagis-production.appspot.com',
  messagingSenderId: '393046658091',
}

const configs = {
  local: {
    isProduction: false,
    apiURL: 'http://localhost:3001',
    firebase: firebaseLocal,
    analyticsId: 'UA-182109266-1',
  },
  development: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
    webURL: 'https://app.flagis-web-development.herokuapp.com/',
    landingURL: 'https://flagis-web-development.herokuapp.com/sign-in',
    firebase: firebaseDevelopment,
    analyticsId: 'UA-182109266-1',
  },
  test: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
    webURL: 'https://app.flagis-web-development.herokuapp.com/',
    landingURL: 'sign-in',
    firebase: firebaseDevelopment,
    analyticsId: 'UA-182109266-1',
  },
  staging: {
    isProduction: false,
    apiURL: 'https://flagis-api-staging.herokuapp.com',
    webURL: 'https://app.flagis-web-staging.herokuapp.com/',
    landingURL: 'https://flagis-web-staging.herokuapp.com/sign-in',
    firebase: firebaseStaging,
    analyticsId: 'UA-182109266-2',
  },
  production: {
    isProduction: true,
    apiURL: 'https://flagis-api-production.herokuapp.com',
    webURL: 'https://www.app.flagis.com',
    landingURL: 'https://www.flagis.com',
    firebase: firebaseProduction,
    analyticsId: 'UA-182109266-3',
  },
}

export default configs[compileEnv]
