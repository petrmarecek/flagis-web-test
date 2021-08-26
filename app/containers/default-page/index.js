import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

// components
import Loader from 'components/common/loader'

// redux
import { controlDefaultRedirect } from 'redux/store/auth/auth.actions'

const DefaultPage = () => <Loader global />

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  controlDefaultRedirect,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.controlDefaultRedirect()
    },
  })
)(DefaultPage)
