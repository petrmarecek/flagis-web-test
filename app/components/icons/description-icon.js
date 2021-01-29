import * as React from 'react'
import PropTypes from 'prop-types'

const DescriptionIcon = ({ color, ...props }) => (
  <svg
    width={12}
    height={13}
    viewBox='0 0 12 13'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g fill={color} fillRule='evenodd'>
      <path
        d='M10.701 11.002h-.014a.872.872 0 01-.89.862H2.062a.872.872 0 01-.89-.862V1.998c0-.48.396-.862.89-.862h7.75c.495 0 .89.383.89.862v9.004zM9.798 0H2.06C.918 0 0 .89 0 1.998v9.004C0 12.097.918 13 2.061 13h7.75c1.13 0 2.062-.89 2.062-1.998V1.998C11.859.889 10.94 0 9.798 0z'
      />
      <path
        d='M8.358 3.202h-4.66a.588.588 0 00-.592.575c0 .315.268.575.593.575h4.659c.324 0 .593-.26.593-.575a.588.588 0 00-.593-.575M8.358 5.925h-4.66a.588.588 0 00-.592.575c0 .315.268.575.593.575h4.659c.324 0 .593-.26.593-.575a.588.588 0 00-.593-.575M8.358 8.648h-4.66a.588.588 0 00-.592.575c0 .315.268.575.593.575h4.659c.324 0 .593-.26.593-.575a.588.588 0 00-.593-.575'
      />
    </g>
  </svg>
)

DescriptionIcon.defaultProps = {
  color: '#676D71',
}

DescriptionIcon.propTypes = {
  color: PropTypes.string,
}

export default DescriptionIcon
