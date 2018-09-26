const compileEnv = process.env.COMPILE_ENV || 'development'

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
  development: {
    isProduction: false,
    apiURL: 'https://flagis-test.herokuapp.com', //'https://flagis-api-development.herokuapp.com'
    firebase: firebaseDevelopment,
  },
  test: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
    firebase: firebaseDevelopment,
  },
  staging: {
    isProduction: false,
    apiURL: 'https://flagis-api-staging.herokuapp.com',
    firebase: firebaseStaging,
  },
  production: {
    isProduction: true,
    apiURL: 'https://flagis-api-production.herokuapp.com',
    firebase: firebaseProduction,
  }
}

export default configs[compileEnv]
