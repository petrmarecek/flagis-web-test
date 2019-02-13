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
  color: #8c9da9;

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
  color: #3e484f;
`

const CommentItemDate = styled.div`
  display: inline-block;
  font-size: 12px;
  margin: 2px 0 0 0;
  float: right;
  color: #c1cad0;
`

const CommentItemContent = styled.div`
  display: block;
  margin: 4px 0 0 37px;
  word-wrap: break-word;
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
