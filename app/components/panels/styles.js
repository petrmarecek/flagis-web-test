import styled, { css } from 'styled-components'
import { boxSizing } from '../styled-components-mixins'

/*------------------------------------------ Center Panel --------------------------------------*/

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
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`

const CenterPanelTopSecondary = styled.div`
  ${centerPanelTopCss};
  height: 48px;
  padding: 0 10px 0 17px;
`

const CenterPanelScroll = styled.div`
  position: absolute;
  top: ${props => {
    if (props.largeOffsetTop) {
      return '172px'
    }

    if (props.smallOffsetTop) {
      return '10px'
    }

    return props.middleOffsetTop ? '152px' : '104px'
  }};
  bottom: ${props => (props.smallOffsetBottom ? '10px' : '30px')};
  left: 0;
  right: 0;
`
/*------------------------------------------ Left Panel --------------------------------------*/

const LeftPanelWrapper = styled.div`
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
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
  LeftPanelWrapper,
}
