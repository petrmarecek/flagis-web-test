import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'
import { infoMessages } from 'utils/messages'
import constants from 'utils/constants'
import {
  compose,
  branch,
  renderComponent,
  withStateHandlers,
  pure,
} from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { showDialog, setDetail } from 'redux/store/app-state/app-state.actions'
import { getPrimaryHiddenNavigationVisibility } from 'redux/store/app-state/app-state.selectors'
import { getNewRefreshToken } from 'redux/store/auth/auth.selectors'
import { deselectTasks } from 'redux/store/tasks/tasks.actions'
import { selectTag } from 'redux/store/tags/tags.actions'
import { getTagsRelations } from 'redux/store/tags/tags.selectors'
import {
  showTreeItemAddControl,
  hideTreeItemAddControl,
  createTreeItem,
  selectPath,
  collapse,
  dropTreeItem,
  moveSection,
  dropSection,
} from 'redux/store/tree/tree.actions'
import {
  getTree,
  getTreeItemsIsFetching,
  getSelectionTree,
  getAddControlParentId,
  getSections,
} from 'redux/store/tree/tree.selectors'
import { computeTreeSectionOrder } from 'redux/utils/redux-helper'

// components
import TagTree from 'components/tag-tree/tag-tree'
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import { CollabsibleContent } from '../styled-components-mixins'
import { Wrapper, AddSection, AddSectionText, AddSectionIcon } from './styles'

const TagTreeContainer = props => {
  const {
    // Data
    addControlParentId,
    selection,
    tagsRelations,
    tree,
    isVisibleMoreNavigation,

    // handlers
    onInvokeMove,
    onHandleDropSection,
    onHandleAddTreeItem,
    onHandleTreeItemsSelected,
    onHandleSubitemCreated,
    onHandleAddSection,
    onHandleAddItemCancel,
    onHandleEditTreeItem,
    onHandleDeleteTreeItem,
    onHandleCollapse,
    onHandleDrop,
  } = props

  const debouncedMoveSection = debounce(onInvokeMove, 10)
  const onMoveSection = move => debouncedMoveSection(move)
  const offset = isVisibleMoreNavigation ? 326 : 250
  const scrollStyle = {
    height: `calc(100vh - ${offset}px)`,
    shadowHeight: 30,
    boxShadowTop: 'inset 0 30px 30px -15px rgba(28, 33, 36, 1)',
    boxShadowBottom: 'inset 0 -30px 30px -15px  rgba(28, 33, 36, 1)',
    overflow: 'hidden',
    top: '10px',
  }
  const verticalStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 3,
  }

  return (
    <div>
      <ShadowScrollbar style={scrollStyle} verticalStyle={verticalStyle}>
        <Wrapper>
          <CollabsibleContent>
            <TagTree
              treeItems={tree}
              selection={selection}
              addControlParentId={addControlParentId}
              tagsRelations={tagsRelations}
              onMoveSection={onMoveSection}
              onTreeItemSelected={onHandleTreeItemsSelected}
              onSubitemCreated={onHandleSubitemCreated}
              onTreeItemEdit={onHandleEditTreeItem}
              onTreeItemDelete={onHandleDeleteTreeItem}
              onAddChild={onHandleAddTreeItem}
              onAddControlCancel={onHandleAddItemCancel}
              onCollapse={onHandleCollapse}
              onDrop={onHandleDrop}
              onDropSection={onHandleDropSection}
            />
          </CollabsibleContent>
        </Wrapper>
      </ShadowScrollbar>
      <AddSection onClick={onHandleAddSection}>
        <AddSectionIcon>
          <Icon
            icon={ICONS.PLUS}
            width={15}
            height={15}
            scale={0.52}
            color={['#676D71']}
          />
        </AddSectionIcon>
        <AddSectionText>Add separator</AddSectionText>
      </AddSection>
    </div>
  )
}

TagTreeContainer.propTypes = {
  // data
  addControlParentId: PropTypes.string,
  isFetching: PropTypes.bool,
  isNewRefreshToken: PropTypes.bool,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  tree: PropTypes.object,
  sections: PropTypes.object,
  isVisibleMoreNavigation: PropTypes.bool,

  // state
  showAddControl: PropTypes.bool,

  // handlers
  onInvokeMove: PropTypes.func,
  onHandleDropSection: PropTypes.func,
  onHandleAddTreeItem: PropTypes.func,
  onHandleTreeItemsSelected: PropTypes.func,
  onHandleSubitemCreated: PropTypes.func,
  onHandleAddSection: PropTypes.func,
  onHandleAddItemCancel: PropTypes.func,
  onHandleEditTreeItem: PropTypes.func,
  onHandleDeleteTreeItem: PropTypes.func,
  onHandleCollapse: PropTypes.func,
  onHandleDrop: PropTypes.func,

  // actions
  collapse: PropTypes.func,
  dropTreeItem: PropTypes.func,
  createTreeItem: PropTypes.func,
  hideTreeItemAddControl: PropTypes.func,
  selectPath: PropTypes.func,
  showDialog: PropTypes.func,
  showTreeItemAddControl: PropTypes.func,
  moveSection: PropTypes.func,
  dropSection: PropTypes.func,
  selectTag: PropTypes.func,
  setDetail: PropTypes.func,
  changeLocation: PropTypes.func,
  deselectTasks: PropTypes.func,
}

const mapStateToProps = state => ({
  isFetching: getTreeItemsIsFetching(state),
  isNewRefreshToken: getNewRefreshToken(state),
  tree: getTree(state),
  sections: getSections(state),
  selection: getSelectionTree(state),
  addControlParentId: getAddControlParentId(state),
  tagsRelations: getTagsRelations(state),
  isVisibleMoreNavigation: getPrimaryHiddenNavigationVisibility(state),
})

const mapDispatchToProps = {
  showTreeItemAddControl,
  hideTreeItemAddControl,
  createTreeItem,
  selectPath,
  showDialog,
  collapse,
  dropTreeItem,
  moveSection,
  dropSection,
  selectTag,
  setDetail,
  changeNavigation,
  deselectTasks,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(
    props => props.isNewRefreshToken || props.isFetching,
    renderComponent(Loader)
  ),
  withStateHandlers(() => ({ order: null }), {
    onInvokeMove: (state, props) => move => {
      const { sourceSectionId } = move
      const { sections } = props
      const order = computeTreeSectionOrder(sections, move)

      if (order === null) {
        return {}
      }

      props.moveSection(sourceSectionId, order)
      return { order }
    },
    onHandleDropSection: ({ order }, props) => drop => {
      const { sourceSection } = drop
      props.dropSection(sourceSection, order)
      return {}
    },
    onHandleAddTreeItem: (state, props) => parentTreeItemId => {
      props.showTreeItemAddControl(parentTreeItemId)
      return {}
    },
    onHandleTreeItemsSelected: (state, props) => selectedTreeItems => {
      props.selectPath(selectedTreeItems)
      return {}
    },
    onHandleSubitemCreated: (state, props) => treeItemInfo => {
      props.createTreeItem(treeItemInfo)
      return {}
    },
    onHandleAddSection: (state, props) => () => {
      props.createTreeItem({
        title: 'Add title',
        parentId: null,
        order: Date.now(),
      })

      return {}
    },
    onHandleAddItemCancel: (state, props) => () => {
      props.hideTreeItemAddControl()
      return {}
    },
    onHandleEditTreeItem: (state, props) => treeItem => {
      if (treeItem.parentId) {
        // Redirect to tag content
        props.changeNavigation(routes.user.tags)

        // Show tag detail
        props.selectTag(treeItem.tag.id)
        props.setDetail('tag')
        toast.info(infoMessages.treeItems.edit, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_INFO_DURATION,
        })
        return {}
      }

      props.showDialog('tree-section-delete-confirm', { treeItem })
      return {}
    },
    onHandleDeleteTreeItem: (state, props) => treeItem => {
      props.showDialog('tree-item-tag-delete-confirm', { treeItem })
      return {}
    },
    onHandleCollapse: (state, props) => treeItem => {
      props.collapse(treeItem)
      return {}
    },
    onHandleDrop: (state, props) => dropResult => {
      props.dropTreeItem(dropResult)
      return {}
    },
  }),
  pure
)(TagTreeContainer)
