import styled from 'styled-components'
import { boxSizing } from '../styled-components-mixins'

const LeftPanelContainer = styled.div`
  ${boxSizing('border-box')}
  background-color: ${props => props.whiteBackground ? '#fff' : '#293034'};
  width: ${props => props.width ? props.width : '290px'}px;
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
`;

export {
  LeftPanelContainer,
}
