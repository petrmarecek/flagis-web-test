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
  font-size: 14px;
  padding-left: 28px;

  :hover {
    color: ${props => colors[props.colorTheme].tagTreeAddNewGroupHover};

    svg {
      path {
        fill: ${props => colors[props.colorTheme].tagTreeAddNewGroupHover};
      }
    }
  }
`

const AddSectionText = styled.div`
  margin-left: 5px;
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
  align-items: top;
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
  padding: ${props => (props.root ? '15px 0 0 0' : '0 0 0 26px')};
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
  color: ${props => colors[props.colorTheme].tagTreeItemHover};
  background-color: ${props =>
    colors[props.colorTheme].tagTreeItemBackgroundHover};
`

const Item = styled.div`
  position: relative;
  list-style-type: none;
  display: block;
  height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  line-height: ${constants.TAG_TREE_ITEM_HEIGHT}px;
  cursor: pointer;
  font-size: 14px;
  padding: ${props => (props.isChildItems ? `0 80px 0 34px` : `0 65px 0 34px`)};
  margin-bottom: 5px;
  color: ${props =>
    props.selected
      ? colors[props.colorTheme].tagTreeItemHover
      : colors.tagTreeItem};
  background-color: transparent;
  ${props => (props.dragOver ? dragOver : null)}
  ${props => (props.dragOverTop ? dragOverTop : null)}
  ${props => (props.dragOverBottom ? dragOverBottom : null)}
  ${props => (props.selected ? itemSelected : null)}

  .tag-tree-item--relations {
    visibility: visible;
  }

  .tag-tree-item--icons {
    visibility: hidden;
  }

  :hover {
    ${borderRadius('13px')}
    background-color: ${props =>
      colors[props.colorTheme].tagTreeItemBackgroundHover};
    color: ${props => colors[props.colorTheme].tagTreeItemHover};

    .tag-tree-item--relations {
      visibility: hidden;
    }

    .tag-tree-item--icons {
      visibility: visible;
    }
  }
`

const ItemTagIcon = styled.div`
  position: absolute;
  left: 7px;
  top: -1px;
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
  color: ${props =>
    props.selected
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
  position: absolute;
  top: 0;
  right: 8px;
`

const ItemIcon = styled.div`
  float: right;
  margin: ${props => props.iconMargin};
  ${transition(props => (props.animation ? 'all 0.1s ease-out' : 'none'))}
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
  ItemWrapper,
  Item,
  ItemTagIcon,
  ItemTitle,
  ItemRelations,
  ItemIcons,
  ItemIcon,
  ItemChildren,
}
