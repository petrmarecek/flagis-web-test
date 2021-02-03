import * as React from 'react'
import PropTypes from 'prop-types'

const TagMultiEmptyIcon = props => {
  return (
    <svg width="15" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2.338"
        y=".574"
        width="11.959"
        height="6.853"
        rx="3.426"
        stroke={props.color}
        strokeWidth="1.147"
      />
      <rect
        x=".574"
        y="2.574"
        width="11.959"
        height="6.853"
        rx="3.426"
        fill="#fff"
        stroke={props.color}
        strokeWidth="1.147"
      />
    </svg>
  )
}

TagMultiEmptyIcon.defaultProps = {
  color: '#B1B5B8',
}

TagMultiEmptyIcon.propTypes = {
  color: PropTypes.string,
}

export default TagMultiEmptyIcon
