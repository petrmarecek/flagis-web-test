import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import { InitialTips } from 'components/tips'
import { readTip } from 'redux/store/auth/auth.actions'
import { getAuth, getUserSettings } from 'redux/store/auth/auth.selectors'

const TipsContainer = props => {
  const handleRead = useCallback(name => props.readTip(name), [props.readTip])

  return (
    <div>
      {Boolean(props.isAuthenticated && !props.data.initial) && (
        <InitialTips onClose={handleRead} />
      )}
    </div>
  )
}

TipsContainer.propTypes = {
  data: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  readTip: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  data: getUserSettings(state).tips || {},
  isAuthenticated: getAuth(state).isAuthenticated,
})

const mapDispatchToProps = { readTip }

export default connect(mapStateToProps, mapDispatchToProps)(TipsContainer)
