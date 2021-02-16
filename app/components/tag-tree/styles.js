import styled, { css } from 'styled-components'
import {
  boxSizing,
  borderRadius,
  textOverflow,
  transform,
  transition,
} from '../styled-components-mixins'
import colors from 'components/styled-components-mixins/colors'
import constants from 'utils/constants'

/* ---------------------------- Tag-Tree Container -------------------------------- */

const Wrapper = styled.div`
  ${boxSizing('border-box')}
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0 20px 0 24px;
`

const AddSection = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 47px;
  background-color: transparent;
  bottom: 0;
  left: 0;
  flex-direction: row;
  color: ${props => colors[props.colorTheme].tagTreeAddNewGroup};
  cursor: pointer;
  font-size: 12px;

  :hover {
    color: ${props => colors[props.colorTheme].tagTreeAddNewGroupHover};
  }
`

const AddSectionText = styled.div`
  margin-left: 28px;
`

/* ---------------------------- Tag-Tree Section -------------------------------- */

const SectionWrapper = styled.div`
  padding: 0;
  font-weight: normal;
  position: relative;
  display: block;
  margin-bottom: ${props => (props.collapsed ? '30px' : '20px')};
  opacity: ${props => (props.dragging ? '0' : '1')};
  overflow: hidden;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 24px;
  background-color: transparent;
  font-weight: 500;
  font-size: 20px;
  padding: 0 5px;
  border-bottom: 1px solid
    ${props => colors[props.colorTheme].tagTreeSectionBorder};
  cursor: pointer;
  margin: 0 14px 0 7px;

  svg {
    ${transition('opacity 100ms ease-out')}
    opacity: 0;
  }

  input {
    :focus {
      color: ${props => colors[props.colorTheme].tagTreeSectionInputFocus};
    }
  }

  :hover {
    border-bottom: 1px solid ${colors.tagTreeSectionBorderHover};

    svg {
      opacity: 1;
    }

    input {
      color: ${props => colors[props.colorTheme].tagTreeSectionInputFocus};
    }
  }
`
const SectionHeaderTitle = styled.input`
  padding: 5px 0 0 0;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  border: none;
  color: ${colors.tagTreeSectionInput};
  background-color: transparent;
  ${textOverflow('ellipsis')}
`

const SectionHeaderIcon = styled.span`
  width: ${props => (props.addSubtag ? '100%' : 'auto')};
  margin-top: ${props => (props.addSubtag ? '14px' : '0')};
  margin-left: ${props => (props.leftOffset ? '10px' : '0')};
  ${transition(props => (props.animation ? 'all 0.1s ease-out' : 'none'))}
  ${transform(props => (props.collapsed ? 'rotate(90deg)' : 'rotate(0deg)'))}
`

const SectionContent = styled.span`
  display: block;
`

const SectionFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  color: ${props => colors[props.colorTheme].tagTreeAddFilterText};
  cursor: pointer;

  :hover {
    color: ${props => colors[props.colorTheme].tagTreeAddFilterHover};

    svg {
      path {
        fill: ${props => colors[props.colorTheme].tagTreeAddFilterHover};
      }
    }
  }
`

const AddFilterIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  background-color: ${props =>
    colors[props.colorTheme].tagTreeAddFilterIconBackground};
  margin: 0 10px 0 4px;
  ${borderRadius('50%')}
`

const AddFilterText = styled.span`
  font-size: 14px;
`

/* ---------------------------- Tag-Tree Items -------------------------------- */

const ItemsList = styled.ul`
  padding: ${props => props.padding};
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
    ${dragOverBorder};
    top: -1px;
  }
`
const dragOverBottom = css`
  overflow: visible;
  position: relative;
  z-index: 50;
  outline: none;

  :after {
    ${dragOverBorder};
    bottom: -1px;
  }
`

const ItemWithChildrenWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-weight: normal;
  opacity: ${props => (props.dragging ? '0' : '1')};
  overflow: hidden;
`

const ItemWrapper = styled.div`
  display: flex;
  min-width: 0;
  width: 100%;
  position: relative;
`

const itemSelected = css`
  ${borderRadius('13px')}
  font-weight: bold;
  color: ${props => colors[props.colorTheme].tagTreeItemHover};
  background-color: ${props =>
    colors[props.colorTheme].tagTreeItemBackgroundHover};
`

const Item = styled.div`
  display: flex;
  position: relative;
  list-style-type: none;
  height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  line-height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 0 4px;
  min-width: 0;
  color: ${props =>
    props.selected
      ? colors[props.colorTheme].tagTreeItemHover
      : colors.tagTreeItem};
  background-color: transparent;
  ${props => (props.dragOver ? dragOver : null)}
  ${props => (props.dragOverTop ? dragOverTop : null)}
  ${props => (props.dragOverBottom ? dragOverBottom : null)}
  ${props => (props.isSelected ? itemSelected : null)}

  .tag-tree-item__relations-count {
    visibility: visible;
  }

  .tag-tree-item__icons {
    visibility: hidden;
  }

  :hover {
    ${borderRadius('13px')}
    background-color: ${props =>
      colors[props.colorTheme].tagTreeItemBackgroundHover};
    color: ${props => colors[props.colorTheme].tagTreeItemHover};

    .tag-tree-item__relations-count {
      visibility: hidden;
    }

    .tag-tree-item__icons {
      visibility: visible;
    }
  }
`

const ItemTagIcon = styled.div`
  margin-right: 5px;
`

const ItemTitle = styled.div`
  ${textOverflow('ellipsis')}
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`

const ItemRelations = styled.div`
  color: ${props =>
    props.isSelected
      ? colors[props.colorTheme].tagTreeItemHover
      : colors.tagTreeItem};
  position: absolute;
  right: 15px;
  top: 0;
  text-align: left;
  width: auto;
  height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
`

const ItemIcons = styled.div`
  display: flex;
  justify-content: end;
`

const ItemIcon = styled.div`
  margin: ${props => props.iconMargin};
  ${transition(props => (props.animation ? 'all 0.1s ease-out' : 'none'))}
  ${transform(props => (props.collapsed ? 'rotate(90deg)' : 'rotate(0deg)'))}
`

const ItemChildren = styled.span`
  display: ${props => (props.collapsed ? 'none' : 'block')};
  border-left: 1px solid
    ${props =>
      props.showBorder
        ? colors[props.colorTheme].tagTreeRelationSelected
        : 'transparent'};
`

const Relation = styled.div`
  height: 32px;
  width: 5px;
  margin-right: 2px;
  opacity: ${props => (props.showRelation ? '1' : '0')};
`

const RelationTop = styled.div`
  ${borderRadius('0 0 0 5px')}
  height: 15px;
  width: ${props => (props.smallWidth ? '1px' : '6px')};
  border-left: 1px solid
    ${props => colors[props.colorTheme].tagTreeRelationSelected};
  border-bottom: 1px solid
    ${props => colors[props.colorTheme].tagTreeRelationSelected};
`

const RelationBottom = styled.div`
  height: 17px;
  width: 5px;
  position: relative;
  opacity: ${props => (props.hideRelation ? '0' : '1')};
  border-left: 1px solid
    ${props => colors[props.colorTheme].tagTreeRelationSelected};
`

export {
  // Tag-Tree Container
  Wrapper,
  AddSection,
  AddSectionText,
  // Tag-Tree Section
  SectionWrapper,
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderIcon,
  SectionContent,
  SectionFooter,
  AddFilterIcon,
  AddFilterText,
  // Tag-Tree Items
  ItemsList,
  // Tag-Tree Item
  ItemWithChildrenWrapper,
  ItemWrapper,
  Item,
  ItemTagIcon,
  ItemTitle,
  ItemRelations,
  ItemIcons,
  ItemIcon,
  ItemChildren,
  Relation,
  RelationTop,
  RelationBottom,
}
