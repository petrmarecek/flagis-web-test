const configs = {
  development: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
    firebase: {
        apiKey: "AIzaSyDFw-G0nAvPxD3Sw9wi2SnKIOxSTQGyVUY",
        authDomain: "flagis-development.firebaseapp.com",
        databaseURL: "https://flagis-development.firebaseio.com",
        projectId: "flagis-development",
        storageBucket: "flagis-development.appspot.com",
        messagingSenderId: "153227018743"
    },
  },
  test: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
  },
  staging: {
    isProduction: false,
    apiURL: 'https://flagis-api-staging.herokuapp.com',
  },
  production: {
    isProduction: true,
    apiURL: 'https://flagis-api-production.herokuapp.com',
    firebase: {
      apiKey: "AIzaSyBmGwTlxWhlBvYbO76kHyHYd3waP8uP6ZA",
      authDomain: "flagis-production.firebaseapp.com",
      databaseURL: "https://flagis-production.firebaseio.com",
      projectId: "flagis-production",
      storageBucket: "flagis-production.appspot.com",
      messagingSenderId: "393046658091"
    },
  }
}

export default configs[process.env.NODE_ENV || 'development']
