import styled, { css } from 'styled-components'
import {
  boxSizing,
  borderRadius,
  textOverflow,
  transform,
  transition,
} from '../styled-components-mixins'
import constants from 'utils/constants'

/* ---------------------------- Tag-Tree Container -------------------------------- */

const Wrapper = styled.div`
  ${boxSizing('border-box')}
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 26px 20px 0 30px;
`

const AddSection = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  background-color: #1c2124;
  bottom: 0;
  left: 0;
  flex-direction: row;
  cursor: pointer;
`

const AddSectionText = styled.div`
  flex: 3;
  border-top: 1px solid #43ffb1;
  color: #fff;
  margin: 0 0 23px 28px;
  padding: 8px 0 0 3px;
  font-size: 14px;
`

const AddSectionIcon = styled.div`
  flex: 1;
  margin: 0 28px 24px 0;
  padding: 8px 13px 0 0;
  border-top: 1px solid #43ffb1;
  text-align: right;
`

/* ---------------------------- Tag-Tree Section -------------------------------- */

const SectionWrapper = styled.div`
  padding: 0;
  font-weight: normal;
  position: relative;
  display: block;
  margin-bottom: ${props => (props.collapsed ? '40px' : '0')};
  opacity: ${props => (props.dragging ? '0' : '1')};
  overflow: hidden;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  height: 29px;
  line-height: 29px;
  background-color: #1c2124;
  font-weight: 500;
  font-size: 20px;
  border-bottom: 1px solid #44ffb1;
  cursor: pointer;
  padding: 0 13px 0 3px;
`

const SectionHeaderTitle = styled.div`
  ${textOverflow('ellipsis')}
  white-space: nowrap;
  float: left;
  max-width: 165px;
  overflow: hidden;
`

const SectionHeaderIcons = styled.div`
  display: flex;
  align-items: center;
`

const SectionHeaderIcon = styled.span`
  width: ${props => (props.addSubtag ? '100%' : 'auto')};
  margin-top: ${props => (props.addSubtag ? '14px' : '0')};
  margin-left: ${props => (props.arrow ? '16px' : '0')};
  ${transition(props => (props.arrow ? 'all 0.1s ease-out' : 'none'))}
  ${transform(props => (props.collapsed ? 'rotate(90deg)' : 'rotate(0deg)'))}
`

const SectionContent = styled.span`
  display: block;
`

const SectionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`

/* ---------------------------- Tag-Tree Items -------------------------------- */

const ItemsList = styled.ul`
  padding: ${props => (props.root ? '21px 0 0 0' : '0 0 0 26px')};
  display: ${props => (props.collapsed ? 'none' : 'block')};
`

/* ---------------------------- Tag-Tree Item -------------------------------- */

const dragOverBorder = css`
  content: '';
  position: absolute;
  height: 0;
  left: 0;
  right: 0;
  border-top: 2px dotted #44ffb1;
`

const dragOver = css`
  overflow: visible;
  position: relative;
  z-index: 50;

  ${borderRadius('13px')}
  border: 2px dotted #44ffb1;
`
const dragOverTop = css`
  overflow: visible;
  position: relative;
  z-index: 50;
  outline: none;

  :after {
    ${dragOverBorder}
    top: -1px;
  }
`
const dragOverBottom = css`
  overflow: visible;
  position: relative;
  z-index: 50;
  outline: none;

  :after {
    ${dragOverBorder}
    bottom: -1px;
  }
`

const ItemWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-weight: normal;
  position: relative;
  opacity: ${props => (props.dragging ? '0' : '1')};
  overflow: hidden;
`

const itemSelected = css`
  ${borderRadius('13px')}
  font-weight: bold;
  color: #fff;
  background-color: #4d5457;
`

const Item = styled.div`
  position: relative;
  list-style-type: none;
  display: block;
  height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  line-height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  padding: 0 65px 0 34px;
  margin-bottom: 5px;
  background-color: ${props => (props.active ? '#F5F5F5' : '#1C2124')};
  ${props => (props.dragOver ? dragOver : null)}
  ${props => (props.dragOverTop ? dragOverTop : null)}
  ${props => (props.dragOverBottom ? dragOverBottom : null)}
  ${props => (props.selected ? itemSelected : null)}

  :hover {
    ${borderRadius('13px')}
    background-color: #4d5457;
  }
`

const ItemTagIcon = styled.div`
  position: absolute;
  left: 7px;
  top: -3px;
`

const ItemTitle = styled.div`
  ${textOverflow('ellipsis')}
  display: inline-block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  max-width: calc(100% - 15px);
`

const ItemRelations = styled.div`
  color: #fff;
  position: absolute;
  right: 15px;
  top: 0;
  text-align: left;
  width: auto;
  height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
`

const ItemIcons = styled.div`
  position: absolute;
  top: 0;
  right: 8px;
`

const ItemIcon = styled.div`
  float: right;
  margin: ${props => props.iconMargin};
  ${transition(props => (props.arrow ? 'all 0.1s ease-out' : 'none'))}
  ${transform(props =>
    props.collapsed ? 'rotate(90deg)' : 'rotate(0deg)'
  )}
  display: block;
`

const ItemChildren = styled.span`
  display: ${props => (props.collapsed ? 'none' : 'block')};
`

export {
  // Tag-Tree Container
  Wrapper,
  AddSection,
  AddSectionText,
  AddSectionIcon,
  // Tag-Tree Section
  SectionWrapper,
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderIcons,
  SectionHeaderIcon,
  SectionContent,
  SectionFooter,
  // Tag-Tree Items
  ItemsList,
  // Tag-Tree Item
  ItemWrapper,
  Item,
  ItemTagIcon,
  ItemTitle,
  ItemRelations,
  ItemIcons,
  ItemIcon,
  ItemChildren,
}
