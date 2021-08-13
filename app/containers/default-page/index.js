import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

// components
import Loader from 'components/common/loader'

import { controlDefaultRedirect } from 'redux/store/auth/auth.actions'

const DefaultPage = () => <Loader global />

DefaultPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapDispatchToProps = {
  controlDefaultRedirect,
}

export default compose(
  connect({}, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.controlDefaultRedirect()
    },
  })
)(DefaultPage)
