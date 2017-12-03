import React from 'react'
import PropTypes from 'prop-types'

const MainContainer = props => (
  <div>
    {props.children}
  </div>
)

MainContainer.propTypes = {
  children: PropTypes.object
}

export default MainContainer
