import styled, { css } from 'styled-components'
import { colors } from 'components/styled-components-mixins/colors'
// forms
import {
  Form,
  FormBody,
  FormBodyFields,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormRowButton,
  FormLink,
} from './forms'

// markdown
import { markdownStyles } from './markdown-styles'

// media queries
import { mediaQueries } from './media-queries'

// animations
import {
  animateLineFromMiddle,
  animateTwoLinesTogether,
} from './css-animations'

/* ----------------------------- Common -----------------------------------*/
const EmptyList = styled.div`
  color: #b1b5b8;
  text-align: center;
  font-style: italic;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
`

const CollabsibleContent = styled.div`
  overflow: hidden;
`

/* ----------------------------- Fonts -----------------------------------*/
const fontMain = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
`

const fontSub = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
`

const fontBold = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
`

const fontIconMdi = css`
  font: normal normal normal 24px/1 MaterialDesignIcons;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translate(0, 0);
`

/* ----------------------------- Mixins -----------------------------------*/
const boxSizing = value => css`
  -webkit-box-sizing: ${value};
  -moz-box-sizing: ${value};
  box-sizing: ${value};
`

const boxShadow = value => css`
  -webkit-box-shadow: ${value};
  -moz-box-shadow: ${value};
  box-shadow: ${value};
`

const borderRadius = value => css`
  -webkit-border-radius: ${value};
  -moz-border-radius: ${value};
  border-radius: ${value};
`

const transition = value => css`
  -webkit-transition: ${value};
  -moz-transition: ${value};
  -o-transition: ${value};
  -ms-transition: ${value};
  transition: ${value};
`

const transform = value => css`
  -webkit-transform: ${value};
  -moz-transform: ${value};
  -o-transform: ${value};
  -ms-transform: ${value};
  transform: ${value};
`

const transformOrigin = value => css`
  -webkit-transform-origin: ${value};
  -moz-transform-origin: ${value};
  -o-transform-origin: ${value};
  -ms-transform-origin: ${value};
  transform-origin: ${value};
`

const userSelect = value => css`
  -webkit-user-select: ${value};
  -moz-user-select: ${value};
  -ms-user-select: ${value};
  user-select: ${value};
`

const textOverflow = value => css`
  -ms-text-overflow: ${value};
  -o-text-overflow: ${value};
  text-overflow: ${value};
`

const placeholderColor = value => css`
  ::-webkit-input-placeholder {
    color: ${value};
  }

  ::-moz-placeholder {
    color: ${value};
  }

  :-moz-placeholder {
    color: ${value};
  }

  :-ms-input-placeholder {
    color: ${value};
  }
`

const input = css`
  ${fontSub}
  ${boxSizing('border-box')}
  ${borderRadius('0')}
  width: 100%;
  border: none;
  background: none;
`

const commonInput = css`
  ${input};
  margin: 0 0 12px;
  padding: 0 10px 0 10px;
  font-size: 24px;
  border-bottom: 1px solid #44ffb1;
`

const commonInputSmall = css`
  ${input};
  margin: 0 0 12px;
  padding: 0 10px 0 10px;
  font-size: 18px;
  border-bottom: 1px solid #44ffb1;
`

const commonCommentInputSmall = css`
  ${input};
  padding: 2px;
  font-size: 14px;
  border-bottom: 1px solid #e1e4e5;
`

const link = css`
  a {
    cursor: pointer;
    outline: none;
    text-decoration: none;
    color: #0799ea;
  }

  a:hover {
    color: #00599c;
  }
`

/* ----------------------------- Buttons -----------------------------------*/

const button = css`
  ${fontMain};
  outline: none;
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  font-size: 18px;
  padding: 8px 24px;
  text-decoration: none;
  border: none;

  ${borderRadius('23px')};

  color: ${colors.white};
  background-color: ${props =>
    props.disabled ? colors.lostAtSea : colors.aztec};

  :hover {
    background-color: ${props =>
      props.disabled ? colors.lostAtSea : colors.hanumanGreen};
  }
`

const ButtonDefault = styled.input`
  ${button};
  font-size: 18px;
`

const ButtonDefaultSmall = styled.input`
  ${button};
  font-size: 14px;
`

export {
  // Common
  EmptyList,
  CollabsibleContent,
  // Fonts
  fontMain,
  fontSub,
  fontBold,
  fontIconMdi,
  // Mixins
  boxSizing,
  boxShadow,
  borderRadius,
  transition,
  transform,
  transformOrigin,
  userSelect,
  textOverflow,
  placeholderColor,
  commonInput,
  commonInputSmall,
  commonCommentInputSmall,
  link,
  // Buttons
  ButtonDefault,
  ButtonDefaultSmall,
  // Forms
  Form,
  FormBody,
  FormBodyFields,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormRowButton,
  FormLink,
  // Markdown
  markdownStyles,
  // media queries
  mediaQueries,
  // animations
  animateLineFromMiddle,
  animateTwoLinesTogether,
}
