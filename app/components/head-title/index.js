import React from 'react'
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

export default HeadTitle
