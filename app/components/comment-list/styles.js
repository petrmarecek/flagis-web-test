import styled from 'styled-components'
import { fontMain } from 'components/styled-components-mixins'
import { link } from '../styled-components-mixins/'

/*--------------------------------- Comment List ----------------------------*/

const ListWrapper = styled.div`
  padding: 3px 20px 3px 3px;
`

/*--------------------------------- Comment Item ----------------------------*/

const ItemWrapper = styled.li`
  ${fontMain}
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

const UserPhoto = styled.span`
  position: absolute;
  display: block;
  top: 0;
  left: 0;

  img {
    object-fit: cover;
  }
`

const Author = styled.div`
  display: inline-block;
  margin-left: 37px;
  color: #b1b5b8;
`

const Date = styled.div`
  display: inline-block;
  font-size: 13px;
  margin: 2px 0 0 0;
  color: #b1b5b8;
  float: right;
`

const Content = styled.div`
  display: block;
  line-height: 18px;
  margin: 4px 0 0 37px;
  word-wrap: break-word;
  color: ${(props) => (props.isAssigneeComment ? '#1c2124' : '#b1b5b8')};
  ${link}
`

export { ListWrapper, ItemWrapper, UserPhoto, Author, Date, Content }
