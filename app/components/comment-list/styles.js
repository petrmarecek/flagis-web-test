import styled from 'styled-components'
import { link } from '../styled-components-mixins/'
import Icon from '../icons/icon'

const CommentListContainer = styled.div`
  padding: 3px 20px 3px 3px;
`

const CommentItemContainer = styled.li`
  display: block;
  list-style-type: none;
  font-size: 14px;
  margin: 20px 0;
  position: relative;

  :first-of-type {
    margin-top: 0;
  }

  :last-of-type {
    margin-bottom: 0;
  }
`

const CommentItemIcon = styled(Icon)`
  position: absolute;
  display: block;
  top: 3px;
  left: 6px;
`

const CommentItemAuthor = styled.div`
  display: inline-block;
  margin-left: 37px;
  color: #b1b5b8;
`

const CommentItemDate = styled.div`
  display: inline-block;
  font-size: 12px;
  margin: 2px 0 0 0;
  color: #b1b5b8;
  float: right;
`

const CommentItemContent = styled.div`
  display: block;
  margin: 4px 0 0 37px;
  word-wrap: break-word;
  color: ${props => (props.isAssigneeComment ? '#1c2124' : '#b1b5b8')};
  ${link}
`

export {
  CommentListContainer,
  CommentItemContainer,
  CommentItemIcon,
  CommentItemAuthor,
  CommentItemDate,
  CommentItemContent,
}
