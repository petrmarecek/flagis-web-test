import React, { Fragment } from 'react'
import HeadTitle from 'components/head-title'

export const withTitle = ({ component: Component, title }) => props => (
  <Fragment>
    <HeadTitle title={title} />
    <Component {...props} />
  </Fragment>
)
