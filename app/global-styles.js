import { createGlobalStyle } from 'styled-components'

/* eslint no-unused-expressions: 0 */
createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.5em;
  }
`
