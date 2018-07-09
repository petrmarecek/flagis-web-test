import { css } from 'styled-components'
import {
  Form,
  FormBody,
  FormBodyFields,
  FormLoader,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
} from './forms'

const boxSizing = value => css`
  -webkit-box-sizing: ${value};
  -moz-box-sizing: ${value};
  box-sizing: ${value};
`;

const transition = value => css`
  -webkit-transition: ${value};
  -moz-transition: ${value};
  -o-transition: ${value};
  -ms-transition: ${value};
  transition: ${value};
`;

const transform = value => css`
  -webkit-transform: ${value};
  -moz-transform: ${value};
  -o-transform: ${value};
  -ms-transform: ${value};
  transform: ${value};
`;

const userSelect = value => css`
  -webkit-user-select: ${value};
  -moz-user-select: ${value};
  -ms-user-select: ${value};
  user-select: ${value};
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

// fonts
const fontMain = css`
  font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
  font-weight: 400;
`;

const fontSub = css`
  font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
  font-weight: 300;
`;


const fontBold = css`
  font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
  font-weight: 600;
`;

const fontIconMdi = css`
  font: normal normal normal 24px/1 MaterialDesignIcons;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translate(0, 0);
`;

export {
  boxSizing,
  transition,
  transform,
  userSelect,
  placeholder,

  // fonts
  fontMain,
  fontSub,
  fontBold,
  fontIconMdi,

  //forms
  Form,
  FormBody,
  FormBodyFields,
  FormLoader,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
}
