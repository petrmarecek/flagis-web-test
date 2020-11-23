import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { getColorTheme } from '../../redux/store/auth/auth.selectors'
import { getTheme } from '../../config/themes'

const MyThemeProvider = ({ children, colorTheme }) => {
  // Get themes by color themes
  const theme = getTheme(colorTheme)

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

MyThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
  colorTheme: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  colorTheme: getColorTheme(state),
})

export default connect(mapStateToProps)(MyThemeProvider)
