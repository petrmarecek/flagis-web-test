import React, { Fragment } from 'react'
import HeadTitle from './index'

const withTitle = ({ Component, title }) => props => (
  <Fragment>
    <HeadTitle title={title} />
    <Component {...props} />
  </Fragment>
)

export { withTitle }
