import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from 'styled-components'

const PageOverflowFix = ({ children }) => {
  const theme = useTheme()

  return (
    <div className="page-overflow-fix" style={{ backgroundColor: theme.tasks.wrapperBgColor }}>
      {children}
    </div>
  )
}

PageOverflowFix.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PageOverflowFix
