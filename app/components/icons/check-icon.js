import PropTypes from 'prop-types'
import React from 'react'

const CheckIcon = ({ color, ...props }) => (
  <svg
    width={14}
    height={10}
    viewBox='0 0 14 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.087.646l-5.91 5.896-2.505-2.5a1.204 1.204 0 00-1.699.007C.482 4.54.485 5.304.946 5.764l2.506 2.5.872.87c.471.47 1.236.469 1.705 0l.873-.87 5.91-5.896A1.2 1.2 0 0012.81.67c-.491-.49-1.256-.489-1.722-.024z'
        fill={color}
      />
    </g>
  </svg>

)

CheckIcon.defaultProps = {
  color: '#B1B5B8',
}

CheckIcon.propTypes = {
  color: PropTypes.string,
}

export default CheckIcon
