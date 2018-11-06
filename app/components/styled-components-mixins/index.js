import { css } from 'styled-components'
import { markdownStyles } from './markdown-styles'
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
  FormLink,
} from './forms'

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

// mixins
const boxSizing = value => css`
  -webkit-box-sizing: ${value};
  -moz-box-sizing: ${value};
  box-sizing: ${value};
`;

const boxShadow = value => css`
  -webkit-box-shadow: ${value};
  -moz-box-shadow: ${value};
  box-shadow: ${value};
`;

const borderRadius = value => css`
  -webkit-border-radius: ${value};
  -moz-border-radius: ${value};
  border-radius: ${value};
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

const transformOrigin = value => css`
  -webkit-transform-origin: ${value};
  -moz-transform-origin: ${value};
  -o-transform-origin: ${value};
  -ms-transform-origin: ${value};
  transform-origin: ${value};
`;

const userSelect = value => css`
  -webkit-user-select: ${value};
  -moz-user-select: ${value};
  -ms-user-select: ${value};
  user-select: ${value};
`;

const textOverflow = value => css`
  -ms-text-overflow: ${value};
  -o-text-overflow: ${value};
  text-overflow: ${value};
`;

const placeholderColor = value => css`
  &::-webkit-input-placeholder {
    color: ${value};
  }
  &:-moz-placeholder { /!* Firefox 18- *!/
    color: ${value};
  }
  
  &::-moz-placeholder { /!* Firefox 19+ *!/
    color: ${value};
  }
  
  &:-ms-input-placeholder {
    color: ${value};
  }
`;

const commonInputSmall = css`
  ${fontSub}
  ${boxSizing('border-box')}
  width: 100%;
  padding: 2px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #D7E3EC;
  background-color: transparent;
}
`;

export {
  // fonts
  fontMain,
  fontSub,
  fontBold,
  fontIconMdi,

  // mixins
  boxSizing,
  boxShadow,
  borderRadius,
  transition,
  transform,
  transformOrigin,
  userSelect,
  textOverflow,
  placeholderColor,
  commonInputSmall,

  // markdown
  markdownStyles,

  // forms
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
  FormLink,
}
