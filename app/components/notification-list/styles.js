import styled, { keyframes } from 'styled-components'
import {
  borderRadius,
  fontMain,
  textOverflow,
} from 'components/styled-components-mixins'
import { fadeInUp } from 'react-animations'

/*--------------------------------- Animations -----------------------------------*/
const fadeUp = keyframes`${fadeInUp}`

/*--------------------------------- Notification Item ----------------------------*/
const ItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: ${props => (props.isRead ? '#F9F9F9' : '#fff')};
  height: 70px;
  animation: 400ms ${fadeUp};
  padding: 6px 15px 6px 30px;
  font-size: 14px;
  ${fontMain}
`

const Indicator = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: '';
    height: 8px;
    width: 8px;
    background-color: #44ffb1;
    ${borderRadius('50%')}
  }
`

const UserNotificationEntityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`

const User = styled.div`
  color: #b1b5b8;
  font-size: 12px;
`

const TitleNotification = styled.div`
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  line-height: 16px;
  ${textOverflow('ellipsis')}
`

const TitleEntity = styled.div`
  color: #a2a2a2;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}

  span {
    font-weight: bold;
  }
`

const Date = styled.div`
  position: absolute;
  top: 6px;
  right: 15px;
  color: #b1b5b8;
  font-size: 12px;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  height: 58px;

  img {
    object-fit: cover;
  }

  svg {
    margin: 0 0 0 5px;
  }
`

export {
  ItemWrapper,
  Indicator,
  UserNotificationEntityWrapper,
  User,
  TitleNotification,
  TitleEntity,
  Date,
  Icons,
}
