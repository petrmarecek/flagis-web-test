import styled from 'styled-components'
import { boxSizing } from '../styled-components-mixins'

const CenterPanelContainer = styled.div`
  margin: 0 10px 0 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.left ? props.left : '290')}px;
  right: 0;
  z-index: 50;
  transition: 0.2s right ease-in;
  ${props => props.style}
`

const CenterPanelTop = styled.div`
  position: relative;
  z-index: 10;
`

const CenterPanelTitle = styled.div`
  height: 14px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #282f34;
  border-top: 2px solid #fff;
  padding: 9px 0 9px 10px;
`

const CenterPanelScroll = styled.div`
  position: absolute;
  top: ${props => (props.largeOffsetTop ? '112px' : '84px')};
  bottom: ${props => (props.smallOffsetBottom ? '10px' : '30px')};
  left: 0;
  right: 0;
`

const LeftPanelContainer = styled.div`
  ${boxSizing('border-box')}
  background-color: ${props => (props.whiteBackground ? '#fff' : '#293034')};
  width: ${props => (props.width ? props.width : '290')}px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  .loader {
    margin: 0 auto;
    width: 30px;

    #canvasLoader {
      margin: 10px 0;
    }
  }
`

export {
  CenterPanelContainer,
  CenterPanelTop,
  CenterPanelTitle,
  CenterPanelScroll,
  LeftPanelContainer,
}
