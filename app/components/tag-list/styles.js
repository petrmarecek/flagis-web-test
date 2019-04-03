import styled, { keyframes } from 'styled-components'
import { borderRadius, textOverflow } from 'components/styled-components-mixins'
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
  background-color: ${props => (props.selected ? '#ecfff7' : '#fff')};
  animation: 400ms ${fadeUp};
`

const ItemIcon = styled.div`
  flex: 0 0 35px;
  margin-left: 10px;
`

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  margin: 0 10px 0 10px;
  ${textOverflow('ellipsis')}
  white-space: nowrap;
  overflow: hidden;
  height: 19px;
`

const ItemTagRelations = styled(Counter)`
  font-size: 12px;
  background-color: #e1e4e5;
  margin-right: 20px;
  min-width: 26px;
  height: 16px;
  ${borderRadius('14px')}
`

export { Item, ItemIcon, ItemTitle, ItemTagRelations }
