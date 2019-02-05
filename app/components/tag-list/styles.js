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
  padding: 0 20px 0 10px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#ffffd7' : '#fff')};
  animation: 400ms ${fadeUp};
`

const ItemIcon = styled.div`
  flex: 0 0 35px;
`

const TitleRelationsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 auto;
`

const ItemTitle = styled.div`
  flex: 1 1 auto;
  margin-left: 10px;
  ${textOverflow('ellipsis')}
  white-space: nowrap;
  overflow: hidden;
`

const ItemTagRelations = styled(Counter)`
  flex: 0 0 auto;
  font-size: 11px;
  background-color: #efefef;
  ${borderRadius('10px')}
  ${boxShadow('0 2px 4px 0 rgba(0, 0, 0, 0.5)')}
`

export { Item, ItemIcon, TitleRelationsWrapper, ItemTitle, ItemTagRelations }
