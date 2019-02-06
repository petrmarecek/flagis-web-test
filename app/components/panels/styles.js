import styled, { css } from 'styled-components'
import { boxSizing } from '../styled-components-mixins'

/*------------------------------------------ Center Panel --------------------------------------*/

const CenterPanelWrapper = styled.div`
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

const centerPanelTopCss = css`
  display: flex;
  justify-content: ${props => (props.flexEnd ? 'flex-end' : 'space-between')};
  align-items: center;
  width: 100%;
`

const CenterPanelTopPrimary = styled.div`
  ${centerPanelTopCss}
  height: 60px;
  padding: 0 20px 0 17px;
  border-bottom: ${props =>
    props.bottomBorder ? '1px solid rgba(151, 151, 151, 0.2)' : 'none'};
`

const CenterPanelTopSecondary = styled.div`
  ${centerPanelTopCss};
  height: 48px;
  padding: 0 10px 0 17px;
  border-bottom: ${props =>
    props.bottomBorder ? '1px solid rgba(151, 151, 151, 0.2)' : 'none'};
`

const CenterPanelScroll = styled.div`
  position: absolute;
  top: ${props => props.offsetTop}px;
  bottom: ${props => props.offsetBottom}px;
  left: 0;
  right: 0;
`
/*------------------------------------------ Left Panel --------------------------------------*/

const LeftPanelWrapper = styled.div`
  ${boxSizing('border-box')}
  background-color: ${props => (props.whiteBackground ? '#fff' : '#1C2124')};
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
  CenterPanelWrapper,
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
  LeftPanelWrapper,
}
