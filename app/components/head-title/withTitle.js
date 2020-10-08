import React from 'react'
import HeadTitle from './index'

// withTitle function
const withTitle = ({ component: Component, title }) => {
  return class Title extends React.Component {
    render() {
      return (
        <React.Fragment>
          <HeadTitle title={title} />
          <Component {...this.props} />
        </React.Fragment>
      )
    }
  }
}

export { withTitle }
