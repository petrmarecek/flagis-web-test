import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { titles } from 'utils/titles-enums'

const HeadTitle = ({ title }) => {
  const defaultTitle = titles.DEFAULT

  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  )
}

HeadTitle.propTypes = {
  title: PropTypes.string,
}

export default HeadTitle
