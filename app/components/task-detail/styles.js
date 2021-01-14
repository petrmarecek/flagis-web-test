import styled from 'styled-components'

import ShadowScrollbar from '../common/shadow-scrollbar'
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

const Divider = styled.div`
  width: 100%;

  border: 2px solid #EFEFEF;
`

const ScrollContent = styled(ShadowScrollbar).attrs({
  style: {
    height: 'calc(100vh - 126px)',
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
`

// ------ HEADER --------------------------------------------------------------
const Header = styled.div`
  display: flex;
  align-items: center;

  background-color: ${props => props.isCompleted ? 'rgb(246, 247, 248)' : '#FFFFFF'};
  border-radius: 4px 4px 0 0;
  padding: 20px 16px 15px;
`

// ------ CONTENT -------------------------------------------------------------
const Content = styled.div`
  display: flex;
  flex: 1;

  background-color: #ffffff;
  box-sizing: border-box;
  padding: 9px 16px 12px;
`

const ContentLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  margin: 0 16px 0 0;
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
`

// ------ CONTENT BOX ---------------------------------------------------------
const ContentBox = styled.div`
  background: #FFFFFF;
  border: 1px solid #F0F0F0;
  border-radius: 4px;
  margin: 7px 0 0;

  cursor: ${props => props.cursor || 'default'};

  &:hover {
    box-shadow: 1px 2px 9px rgba(214, 214, 214, 0.5);
  }
`

const ContentBoxHeader = styled.div`
  height: ${props => props.large ? 48 : 30}px;
  display: flex;
  flex: 1;
  align-items: center;

  padding: ${props => props.large ? '0 17' : '0 8'}px;
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
  font-size: ${props => props.large ? 14 : 12}px;
  font-weight: ${props => props.large ? 'bold' : 'normal'};
  line-height: ${props => props.large ? 16 : 14}px;
  color: ${props => props.large ? '#1C2124' : '#676D71'};
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
  color: ${props => props.isDisabled ? '#676D71' : '#1C2124'};
`

export {
  Divider,
  ScrollContent,
  Wrapper,

  // HEADER
  Header,

  // CONTENT
  Content,
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
