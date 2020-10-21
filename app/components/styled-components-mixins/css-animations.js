import { css } from 'styled-components'
import {
  fontMain,
  userSelect,
  transform,
  transformOrigin,
  transition,
} from './index'

const animateLineFromMiddle = (position, borderSize, color) => css`
  :after {
    ${transform('scaleX(0)')}
    ${transition('transform 250ms ease-in-out')}
    display: block;
    content: '';
    margin-top: ${position}px;
    border-bottom: ${borderSize}px solid ${color};
  }

  :hover {
    color: ${color};

    :after {
      ${transform('scaleX(1)')}
    }
  }
`

const animateTwoLinesTogether = (fontSize, position, borderSize, color) => css`
  ${fontMain}
  ${userSelect('none')};
  display: inline-block;
  font-size: ${fontSize}px;
  color: ${color};
  cursor: pointer;

  :after {
    ${transform('scaleX(1)')}
    ${transformOrigin('100% 0%')}
    ${transition('250ms ease-in-out')}
    display: block;
    content: '';
    margin-top: ${position}px;
    border-bottom: ${borderSize}px solid ${color};
  }

  :before {
    ${transform('scaleX(0)')}
    ${transformOrigin('0% 100%')}
    ${transition('250ms ease-in-out 150ms')}
    display: block;
    content: '';
    position: absolute;
    bottom: -${position}px;
    left: 0;
    right: 0;
    margin-bottom: ${position}px;
    border-bottom: ${borderSize}px solid ${color};
  }

  :hover {
    :after {
      ${transform('scaleX(0)')}
    }

    :before {
      ${transform('scaleX(1)')}
    }
  }
`

export { animateLineFromMiddle, animateTwoLinesTogether }
