import styled from 'styled-components'

import Button from '../../common/button'
import Icon from '../../icons/icon'
import { ICONS } from '../../icons/icon-constants'
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderLock,
  ContentBoxHeaderLockIcon,
  ContentBoxHeaderTitle,
  ContentBoxBody,
} from '../styles'
import Autocomplete from 'components/autocomplete'

const Body = styled(ContentBoxBody)`
  ${props => props.flexEnd ? 'justify-content: flex-end' : null};

  padding: 0 7px 9px 47px;
`

const BodyStatus = styled.span`
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  color: #676D71;
`

const BodyButton =styled(Button)`
  background-color: ${props => {
    if (props.green) {
      return '#37E59C'
    }

    if (props.red) {
      return '#FF6A6A'
    }

    return '#BABABA'
  }};
  margin: 0 0 0 10px;
  padding: 5px 20px;
  border-radius: 4px;

  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #FFFFFF;
`

const Header = styled(ContentBoxHeader)`
  height: 46px;
`

const HeaderLeft = styled(ContentBoxHeaderLeft)`
  width: auto;
  min-width: 40px;
`

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: ['#FFF', '#CCCCCC'],
  icon: ICONS.CONTACT_EXIST,
  scale: 1.4,
  height: 30,
  width: 30,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  ${props => props.withContact ? 'color: #1C2124 !important' : null};
`

const HeaderAutocomplete = styled(Autocomplete)``

const HeaderTitleName = styled.span`
  font-weight: 500;
`

const HeaderLock = styled(ContentBoxHeaderLock)``

const HeaderLockIcon = styled(ContentBoxHeaderLockIcon)``

const HeaderDelete = styled(Button)`
  width: 15px;
  height: 15px;

  border: 1px solid #676D71;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 1px 0 0 3px;
`

const HeaderDeleteIcon = styled(Icon).attrs({
  color: ['#676D71'],
  icon: ICONS.CROSS_SIMPLE,
  scale: 0.5,
  width: 10,
  height: 10,
})``

const Wrapper = styled(ContentBox)``

export {
  Body,
  BodyButton,
  BodyStatus,
  Header,
  HeaderAutocomplete,
  HeaderLeft,
  HeaderIcon,
  HeaderTitle,
  HeaderLock,
  HeaderLockIcon,
  HeaderDelete,
  HeaderDeleteIcon,
  HeaderTitleName,
  Wrapper,
}
