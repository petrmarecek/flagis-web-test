const configs = {
  development: {
    isProduction: false,
    apiURL: 'https://flagis-api-development.herokuapp.com',
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
  }
}

export default configs[process.env.NODE_ENV || 'development']
