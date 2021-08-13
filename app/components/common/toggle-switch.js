import React from 'react'
import PropTypes from 'prop-types'

// styles
import styled from 'styled-components'
import {
  borderRadius,
  transition,
  transform,
} from 'components/styled-components-mixins'

const Switch = styled.div`
  position: relative;
  width: 30px;
  height: 16px;
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.isChecked ? '#00CD78' : '#e1e4e5')};
  ${borderRadius('13px')}
  ${transition('200ms')}

  :before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    ${borderRadius('50%')}
    ${transition('200ms')}
    ${transform(props =>
      props.isChecked ? 'translateX(14px)' : 'translateX(0)'
    )}
  }
`

const ToggleSwitch = ({ className, isChecked }) => (
  <div className={className}>
    <Switch>
      <Slider isChecked={isChecked} />
    </Switch>
  </div>
)

ToggleSwitch.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
}

export default ToggleSwitch
