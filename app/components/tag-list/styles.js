import styled, { keyframes } from 'styled-components'
import {
  borderRadius,
  boxShadow,
  textOverflow,
} from 'components/styled-components-mixins'
import { fadeInUp } from 'react-animations'

// components
import Counter from 'components/common/counter'

const fadeUp = keyframes`${fadeInUp}`

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  list-style-type: none;
  font-size: 16px;
  height: 30px;
  margin: 0 0 4px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#ffffd7' : '#fff')};
  animation: 400ms ${fadeUp};
`

const ItemIcon = styled.div`
  flex: 0 0 35px;
  margin-left: 10px;
`

const ItemTitle = styled.div`
  flex: 1 1 auto;
  margin: 0 10px 0 10px;
  ${textOverflow('ellipsis')}
  white-space: nowrap;
  overflow: hidden;
`

const ItemTagRelations = styled(Counter)`
  font-size: 11px;
  background-color: #efefef;
  margin-right: 20px;
  ${borderRadius('10px')}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

export { Item, ItemIcon, ItemTitle, ItemTagRelations }
