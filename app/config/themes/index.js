import constants from '../../utils/constants'

import colors from './common/colors'
import dark from './dark'
import light from './light'
import standard from './standard'

const getTheme = (name = constants.DEFAULT_COLOR_THEME) => {
  let colorTheme
  switch (name) {
    case 'dark':
      colorTheme = dark
      break
    case 'light':
      colorTheme = light
      break
    default:
      colorTheme = standard
  }

  return {
    COLORS: colors,
    ...colorTheme.components,
  }
}

export { getTheme }
