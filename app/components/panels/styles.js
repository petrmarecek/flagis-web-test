import styled, { css } from 'styled-components'
import colors from 'components/styled-components-mixins/colors'
import { boxSizing } from '../styled-components-mixins'

/*------------------------------------------ Center Panel --------------------------------------*/

const CenterPanelWrapper = styled.div`
  margin: 0 auto 0 auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.left ? props.left : '290')}px;
  right: 0;
  z-index: 50;
  transition: 0.2s right ease-in;
  max-width: 1200px;
  ${props => props.style};

  @media screen and (max-width: 1550px) {
    margin: 0 10px;
  }
`

const CenterPanelTop = styled.div`
  position: relative;
  z-index: 10;
`

const centerPanelTopCss = css`
  display: flex;
  justify-content: ${props => {
    if (props.flexEnd) {
      return 'flex-end'
    }

    return props.flexStart ? 'flex-start' : 'space-between'
  }};
  align-items: center;
  width: 100%;
  ${boxSizing('border-box')}
`

const CenterPanelTopPrimary = styled.div`
  ${centerPanelTopCss};
  height: 60px;
  padding: 0 20px 0 17px;
  border-bottom: ${props =>
          props.bottomBorder ? '1px solid rgba(151, 151, 151, 0.2)' : 'none'};
`

const CenterPanelTopPrimaryLeft = styled.div`
  ${centerPanelTopCss};
  flex: 1 1 auto;
`

const CenterPanelTopPrimaryRight = styled.div`
  ${centerPanelTopCss};
  margin: 0 0 0 40px;
  flex: 1 1 80px;
`

const CenterPanelTopSecondary = styled.div`
  ${centerPanelTopCss};
  height: 38px;
  padding: 0 10px 0 0;
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

const CenterPageTitle = styled.div`
  margin-left: ${props => (props.leftMargin ? '12px' : '0')};
  font-size: 24px;
  font-weight: bold;
  color: #1c2124;
`

/*------------------------------------------ Left Panel --------------------------------------*/

const LeftPanelWrapper = styled.div`
  ${boxSizing('border-box')};
  background-color: ${props => colors[props.colorTheme].leftPanelBackground};
  width: ${props => (props.width ? props.width : '290')}px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 50;

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
  CenterPanelTopPrimaryLeft,
  CenterPanelTopPrimaryRight,
  CenterPanelTopSecondary,
  CenterPanelScroll,
  CenterPageTitle,
  LeftPanelWrapper,
}
