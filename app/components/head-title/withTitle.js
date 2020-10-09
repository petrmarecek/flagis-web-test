import React, { Fragment } from 'react'

// components
import HeadTitle from 'components/head-title'

const withTitle = (Component, title) => props => (
  <Fragment>
    <HeadTitle title={title} />
    <Component {...props} />
  </Fragment>
)

export { withTitle }
