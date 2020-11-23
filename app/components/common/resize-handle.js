import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { userSelect } from '../styled-components-mixins'

const Resize = styled.div`
  ${userSelect('none')}
  position: absolute;
  top: 0;
  left: auto;
  right: -8px;
  bottom: 0;
  width: 8px;
  cursor: col-resize;
  z-index: 150;
  background-color: ${props => props.theme.tasks.wrapperBgColor};
  border-left: 1px solid ${props => props.theme.tagTreeSectionBorder};
`;

const withResizeHandle = WrappedComponent => {
  return class WithResizeHandle extends PureComponent {

    static propTypes = {
      onResize: PropTypes.func.isRequired,
    }

    handleMouseDown = event => {
      document.addEventListener('mouseup', this.mouseUpListener, {capture: true})
      document.addEventListener('mousemove', this.mouseMoveListener, {capture: true})
      event.preventDefault()
      event.stopPropagation()
    }

    mouseMoveListener = event => {
      event.preventDefault()
      this.props.onResize({
        x: event.clientX,
        y: event.clientY,
      })
    }

    mouseUpListener = event => {
      document.removeEventListener('mouseup', this.mouseUpListener, {capture: true})
      document.removeEventListener('mousemove', this.mouseMoveListener, {capture: true})
      event.preventDefault()
      event.stopPropagation()
    }

    render() {
      return <WrappedComponent onMouseDownCapture={this.handleMouseDown}/>
    }
  }
}

const ResizeHandle = ({ onMouseDownCapture }) => <Resize onMouseDownCapture={onMouseDownCapture} />

ResizeHandle.propTypes = {
  onMouseDownCapture: PropTypes.func
}

export default withResizeHandle(ResizeHandle)
