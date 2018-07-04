import { css } from 'styled-components'

const boxSizing = css`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const transition = value => css`
  -webkit-transition: ${value};
  -moz-transition: ${value};
  -o-transition: ${value};
  -ms-transition: ${value};
  transition: ${value};
`;

const placeholder = css`
  &::-webkit-input-placeholder {
    color: ${props => props.placeholderColor ? props.placeholderColor : '#8c9da9'};
  }
  &:-moz-placeholder { /!* Firefox 18- *!/
    color: ${props => props.placeholderColor ? props.placeholderColor : '#8c9da9'};
  }
  
  &::-moz-placeholder { /!* Firefox 19+ *!/
    color: #${props => props.placeholderColor ? props.placeholderColor : '#8c9da9'};
  }
  
  &:-ms-input-placeholder {
    color: ${props => props.placeholderColor ? props.placeholderColor : '#8c9da9'};
  }
`;

export {
  boxSizing,
  transition,
  placeholder,
}
