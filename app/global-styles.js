import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500,700,300,200,100,300italic,400italic,500italic,700italic&subset=latin,latin-ext);
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,300,200,100,300italic,400italic,600italic,700italic&subset=latin,latin-ext);

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
