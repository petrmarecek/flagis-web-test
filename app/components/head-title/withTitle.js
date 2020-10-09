import React, { Fragment } from 'react'
import { titles } from 'components/head-title/head-title-common'

// components
import HeadTitle from 'components/head-title'

const withTitle = (Component, title = titles.DEFAULT) => props => (
  <Fragment>
    <HeadTitle title={title} />
    <Component {...props} />
  </Fragment>
)

export { withTitle }
