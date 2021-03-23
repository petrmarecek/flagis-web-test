import styled from 'styled-components'

import ShadowScrollbar from '../common/shadow-scrollbar'
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

import {
  transform,
  transformOrigin,
  transition,
  borderRadius,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const Divider = styled.div`
  width: 100%;

  border: 1px solid #efefef;
  box-sizing: border-box;
`

const ScrollContent = styled(ShadowScrollbar).attrs({
  style: {
    height: 'calc(100vh - 142px)',
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px #fff',
    boxShadowBottom: 'inset 0 -10px 10px -5px #fff',
    overflow: 'hidden',
  },
})``

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  box-shadow: 0 0 5px rgba(192, 192, 192, 0.5);
  box-sizing: border-box;
`

const TaskDetailWrapper = styled.div`
  min-height: 100%;
  line-height: 0;
  vertical-align: bottom;
`

// ------ HEADER --------------------------------------------------------------
const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${props => props.backgroundColor};

  ${borderRadius('4px 4px 0 0')};
  padding: 20px 16px 15px;
  z-index: 1;

  :before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.lynxWhite};
    ${transform(props =>
      props.isCompleted && !props.isArchived ? 'scaleX(1)' : 'scaleX(0)'
    )}
    ${transformOrigin('0 50%')}
    ${transition(props =>
      props.animation ? 'transform 500ms ease-out' : 'none'
    )}
  }
`

// ------ CONTENT -------------------------------------------------------------
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100%;

  background-color: #ffffff;
  box-sizing: border-box;
`

const ContentCenter = styled.div`
  display: flex;
  flex: 1;
`

const ContentLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 350px;

  box-shadow: 3px 0 5px 0 rgba(231, 231, 231, 0.5);
  padding: 9px 0 12px;
`

const ContentLeftTop = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentLeftBottom = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px 0 0;
`

const ContentRight = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;

  padding: 9px 0 12px;
`

// ------ CONTENT BOX ---------------------------------------------------------
const ContentBox = styled.div`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin: 7px 16px 0;

  cursor: ${props => props.cursor || 'default'};
`

const ContentBoxHeader = styled.div`
  height: ${props => (props.large ? 48 : 30)}px;
  display: flex;
  flex: 1;
  align-items: center;

  padding: ${props => (props.large ? '0 17' : '0 8')}px;
`

const ContentBoxHeaderLeft = styled.div`
  width: 25px;
  display: flex;
  justify-content: flex-start;
`

const ContentBoxHeaderIcon = styled(Icon).attrs({
  color: ['#B1B5B8'],
})``

const ContentBoxHeaderTitle = styled.span`
  font-size: ${props => (props.large ? 14 : 12)}px;
  font-weight: ${props => (props.large ? 'bold' : 'normal')};
  line-height: ${props => (props.large ? 16 : 14)}px;
  color: ${props => (props.large ? '#1C2124' : '#676D71')};
`

const ContentBoxHeaderLock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

const ContentBoxHeaderLockIcon = styled(Icon).attrs({
  color: ['#B1B5B8'],
  height: 12,
  icon: ICONS.LOCK,
  scale: 0.5,
  width: 9,
})`
  margin-left: 8px;
`

const ContentBoxBody = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

const ContentBoxBodyText = styled.span`
  font-size: 13px;
  line-height: 15px;
  color: ${props => (props.isDisabled ? '#676D71' : '#1C2124')};
`

export {
  Divider,
  ScrollContent,
  Wrapper,
  TaskDetailWrapper,
  // HEADER
  Header,
  // CONTENT
  Content,
  ContentCenter,
  ContentLeft,
  ContentLeftBottom,
  ContentLeftTop,
  ContentRight,
  // CONTENT BOX
  ContentBox,
  ContentBoxBody,
  ContentBoxBodyText,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderLock,
  ContentBoxHeaderLockIcon,
  ContentBoxHeaderTitle,
}
