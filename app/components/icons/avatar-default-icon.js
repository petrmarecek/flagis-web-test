import * as React from 'react'
import PropTypes from 'prop-types'

const AvatarDefaultIcon = ({ color, colorCircle }) => {
  return (
    <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i)">
        <circle cx="15" cy="15" r="15" fill={colorCircle} />
      </g>
      <mask
        id="a"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <circle cx="15" cy="15" r="15" fill={colorCircle} />
      </mask>
      <g mask="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 12c0 3.301-2.699 6-6 6s-6-2.699-6-6 2.699-6 6-6 6 2.699 6 6zm-3.935 7.509c1.129-.394 2.414-.841 3.645-.145 3.443 1.911 5.262 5.647 5.29 10.752V31H4v-.884c0-5.105 1.82-8.812 5.206-10.752 1.259-.697 2.545-.249 3.674.145l.077.027c.7.256 1.371.484 2.015.484.644 0 1.316-.228 2.015-.484l.078-.027z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="30"
          height="31"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.7897 0 0 0 0 0.7897 0 0 0 0 0.7897 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  )
}

AvatarDefaultIcon.defaultProps = {
  color: '#CCC',
  colorCircle: '#fff',
}

AvatarDefaultIcon.propTypes = {
  color: PropTypes.string,
  colorCircle: PropTypes.string,
}

export default AvatarDefaultIcon
