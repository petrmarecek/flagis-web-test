import Avatar from 'react-avatar'
import styled from 'styled-components'

import Icon from '../../icons/icon'
import { ICONS } from '../../icons/icon-constants'
import { placeholderColor } from '../../styled-components-mixins'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
  ContentBoxBody,
} from '../styles'

const Body = styled(ContentBoxBody)`
  flex-direction: column;
  align-items: flex-start;

  padding: 10px;
`

const Header = styled(ContentBoxHeader).attrs({
  large: true,
})``

const HeaderLeft = styled(ContentBoxHeaderLeft)`
  width: 35px;
`

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: '#1C2124',
  icon: ICONS.COMMENT,
  scale: 1.4,
  height: 20,
  width: 21,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle).attrs({
  large: true,
})``

const Wrapper = styled(ContentBox)`
  flex: 1;
`

// ------ ACTIVITY ------------------------------------------------------------
const Activity = styled.div`
  margin: 0 0 6px 42px;

  font-size: 11px;
  line-height: 14px;
  color: #676d71;

  &:first-child {
    margin-top: 10px;
  }
`

const ActivityText = styled.span``

const ActivityDate = styled.span`
  &:before {
    content: ' ';
  }
`

// ------ COMMENT -------------------------------------------------------------
const Comment = styled.div`
  width: 100%;
  display: flex;
  flex: 1;

  margin: 15px 0;
`

const CommentAvatar = styled.div`
  display: flex;
  width: 30px;
`

const CommentAvatarIcon = styled(Avatar).attrs({
  round: true,
  size: 30,
  textSizeRatio: 2,
})`
  width: 30px;
  height: 30px;
`

const CommentContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 0 0 0 11px;
`

const CommentHeader = styled.div``

const CommentAuthor = styled.span`
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  color: #1c2124;
`

const CommentDate = styled.span`
  font-size: 11px;
  line-height: 13px;
  color: #676d71;

  &:before {
    content: ' ';
  }
`

const CommentText = styled.p`
  padding: 4px 0 0;

  font-size: 14px;
  line-height: 16px;
  color: #1c2124;
`

const CommentDeleteBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  visibility: hidden;

  ${Comment}:hover & {
    visibility: visible;
  }
`

const CommentDelete = styled(Icon).attrs({
  color: ['#676D71'],
  icon: ICONS.CROSS_SIMPLE,
  width: 12,
  height: 12,
  scale: 0.7,
})``

// ------ ADD COMMENT ---------------------------------------------------------
const AddComment = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;

  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  padding: 12px 10px;
`

const AddCommentAvatar = styled(Avatar).attrs({
  round: true,
  size: 30,
  textSizeRatio: 2,
})`
  margin: 2px 12px 3px 0;
`

const AddCommentInput = styled.textarea.attrs({
  placeholder: 'Add a comment',
})`
  width: 100%;
  height: 36px;
  min-height: 36px;
  max-height: 100px;
  resize: vertical;
  overflow: hidden;
  cursor: text;

  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 9px 11px;

  font-size: 14px;
  line-height: 16px;
  color: #1c2124;

  ${placeholderColor('#676D71')};
`

export {
  Body,
  Header,
  HeaderLeft,
  HeaderIcon,
  HeaderTitle,
  Wrapper,
  // ACTIVITY
  Activity,
  ActivityText,
  ActivityDate,
  // COMMENT
  Comment,
  CommentAuthor,
  CommentAvatar,
  CommentAvatarIcon,
  CommentContent,
  CommentDate,
  CommentDelete,
  CommentDeleteBox,
  CommentHeader,
  CommentText,
  // ADD COMMENT
  AddComment,
  AddCommentAvatar,
  AddCommentInput,
}
