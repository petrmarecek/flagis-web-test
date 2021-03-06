import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import debounce from 'lodash/debounce'
import {
  compose,
  branch,
  renderComponent,
  withStateHandlers,
  pure,
} from 'recompose'
import constants from 'utils/constants'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { setDetail } from 'redux/store/app-state/app-state.actions'
import {
  getLeftPanel,
  getPrimaryHiddenNavigationVisibility,
} from 'redux/store/app-state/app-state.selectors'
import { getColorTheme } from 'redux/store/auth/auth.selectors'
import { deselectTasks } from 'redux/store/tasks/tasks.actions'
import { selectTag } from 'redux/store/tags/tags.actions'
import { getTasksMenuFiltersItem } from 'redux/store/tasks-menu/tasks-menu.selectors'
import {
  updateTreeItemTitle,
  showTreeItemAddControl,
  hideTreeItemAddControl,
  createTreeItem,
  selectPath,
  collapse,
  dropTreeItem,
  moveSection,
  dropSection,
  deleteTreeItem,
  clearTagTreeSelection,
} from 'redux/store/tree/tree.actions'
import {
  getTree,
  getTreeItemsIsFetching,
  getSelectionTree,
  getAddControlParentId,
  getSections,
  getTreeItemEntitiesByParents,
} from 'redux/store/tree/tree.selectors'
import { computeTreeSectionOrder } from 'redux/utils/redux-helper'

// components
import TagTree from 'components/tag-tree/tag-tree'
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import AddTagTreeItemSectionForm from 'components/common/add-tag-tree-item-section-form'

// styles
import { CollabsibleContent, EmptyList } from '../styled-components-mixins'
import colors from 'components/styled-components-mixins/colors'
import { Wrapper } from './styles'
import { getContactsRelations } from 'redux/store/contacts/contacts.selectors'
import { getTreeRelations } from 'redux/utils/component-helper'

const TagTreeContainer = props => {
  const {
    // Data
    addControlParentId,
    addControlParentType,
    selection,
    tagsRelations,
    tree,
    colorTheme,
    leftPanel,
    treeItemEntitiesByParent,

    // state
    showAddControl,

    // handlers
    onInvokeMove,
    onHandleDropSection,
    onHandleAddTreeItem,
    onHandleTreeItemsSelected,
    onHandleSubItemCreated,
    onHandleAddSectionCancel,
    onHandleAddSectionSubmit,
    onHandleUpdateSectionTitle,
    onHandleAddItemCancel,
    onHandleEditTreeItem,
    onHandleDeleteTreeItem,
    onHandleCollapse,
    onHandleDrop,
  } = props

  const debouncedMoveSection = debounce(onInvokeMove, 10)
  const onMoveSection = useCallback(move => debouncedMoveSection(move), [])
  const scrollStyle = {
    height: `calc(100vh - 260px)`,
    shadowHeight: 30,
    boxShadowTop: `inset 0 30px 30px -15px ${colors[colorTheme].tagTreeShadowScrollbar}`,
    boxShadowBottom: `inset 0 -30px 30px -15px ${colors[colorTheme].tagTreeShadowScrollbar}`,
    overflow: 'hidden',
    padding: '20px 0 0 0',
  }
  const verticalStyle = {
    backgroundColor: colors[colorTheme].tagTreeScrollbar,
    borderRadius: 3,
  }

  return (
    <div>
      <ShadowScrollbar
        style={scrollStyle}
        verticalStyle={verticalStyle}
        scrollSpaceHeight={constants.list.tagTrees.SCROLL_SPACE_HEIGHT}
        scrollStep={constants.list.tagTrees.SCROLL_STEP}
        isDraggable
      >
        <Wrapper colorTheme={colorTheme}>
          <CollabsibleContent>
            {tree.size === 0 && !showAddControl && (
              <EmptyList>No sections found</EmptyList>
            )}
            {tree.size > 0 && (
              <TagTree
                treeItems={tree}
                selection={selection}
                addControlParentId={addControlParentId}
                addControlParentType={addControlParentType}
                tagsRelations={tagsRelations}
                onMoveSection={onMoveSection}
                onTreeItemSelected={onHandleTreeItemsSelected}
                onSubItemCreated={onHandleSubItemCreated}
                onTreeItemEdit={onHandleEditTreeItem}
                onTreeItemDelete={onHandleDeleteTreeItem}
                onAddChild={onHandleAddTreeItem}
                onAddControlCancel={onHandleAddItemCancel}
                onUpdateSectionTitle={onHandleUpdateSectionTitle}
                onCollapse={onHandleCollapse}
                onDrop={onHandleDrop}
                onDropSection={onHandleDropSection}
                maxWidth={leftPanel.width}
                colorTheme={colorTheme}
                treeItemEntitiesByParent={treeItemEntitiesByParent}
              />
            )}
            {showAddControl && (
              <AddTagTreeItemSectionForm
                parentId={null}
                onSubmit={onHandleAddSectionSubmit}
                onCancel={onHandleAddSectionCancel}
              />
            )}
          </CollabsibleContent>
        </Wrapper>
      </ShadowScrollbar>
    </div>
  )
}

TagTreeContainer.propTypes = {
  // data
  addControlParentId: PropTypes.string,
  isFetching: PropTypes.bool,
  selection: PropTypes.object,
  tagsRelations: PropTypes.object,
  tree: PropTypes.object,
  colorTheme: PropTypes.string,
  sections: PropTypes.object,
  isVisibleMoreNavigation: PropTypes.bool,
  leftPanel: PropTypes.object,
  treeItemEntitiesByParent: PropTypes.object,
  userIdsSelection: PropTypes.object,

  // state
  showAddControl: PropTypes.bool,

  // handlers
  onInvokeMove: PropTypes.func,
  onHandleDropSection: PropTypes.func,
  onHandleAddTreeItem: PropTypes.func,
  onHandleTreeItemsSelected: PropTypes.func,
  onHandleSubItemCreated: PropTypes.func,
  onHandleAddButtonClicked: PropTypes.func,
  onHandleAddSectionCancel: PropTypes.func,
  onHandleAddSectionSubmit: PropTypes.func,
  onHandleUpdateSectionTitle: PropTypes.func,
  onHandleAddSection: PropTypes.func,
  onHandleAddItemCancel: PropTypes.func,
  onHandleEditTreeItem: PropTypes.func,
  onHandleDeleteTreeItem: PropTypes.func,
  onHandleCollapse: PropTypes.func,
  onHandleDrop: PropTypes.func,

  // actions
  updateTreeItemTitle: PropTypes.func,
  collapse: PropTypes.func,
  dropTreeItem: PropTypes.func,
  createTreeItem: PropTypes.func,
  hideTreeItemAddControl: PropTypes.func,
  selectPath: PropTypes.func,
  showTreeItemAddControl: PropTypes.func,
  moveSection: PropTypes.func,
  dropSection: PropTypes.func,
  selectTag: PropTypes.func,
  setDetail: PropTypes.func,
  changeLocation: PropTypes.func,
  deselectTasks: PropTypes.func,
  clearTagTreeSelection: PropTypes.func,
}

const mapStateToProps = state => ({
  isFetching: getTreeItemsIsFetching(state),
  treeItemEntitiesByParent: getTreeItemEntitiesByParents(state),
  tree: getTree(state),
  colorTheme: getColorTheme(state),
  sections: getSections(state),
  selection: getSelectionTree(state),
  addControlParentId: getAddControlParentId(state),
  addControlParentType: state.getIn(['tree', 'addControlParentType']),
  tagsRelations: getTreeRelations(state),
  isVisibleMoreNavigation: getPrimaryHiddenNavigationVisibility(state),
  leftPanel: getLeftPanel(state),
  userIdsSelection: getTasksMenuFiltersItem(state, 'userIds'),
})

const mapDispatchToProps = {
  updateTreeItemTitle,
  showTreeItemAddControl,
  hideTreeItemAddControl,
  createTreeItem,
  selectPath,
  collapse,
  dropTreeItem,
  moveSection,
  dropSection,
  selectTag,
  setDetail,
  changeNavigation,
  deselectTasks,
  deleteTreeItem,
  clearTagTreeSelection,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    props => props.isFetching,
    renderComponent(() => <Loader light />)
  ),
  withStateHandlers(() => ({ showAddControl: false, order: null }), {
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
    onHandleAddTreeItem: (state, props) => (
      parentTreeItemId,
      type = 'tags'
    ) => {
      props.showTreeItemAddControl(parentTreeItemId, type)
      return {}
    },
    onHandleTreeItemsSelected: (state, props) => (
      selectedTreeItems,
      selectedTreeItem
    ) => {
      // clear tag-tree selection, when user click on the last item in tree again (it is already in selection)
      const selectionBackUp = _.cloneDeep(props.selection)
      const clickedOnLastSelectedTreeItem =
        (props.userIdsSelection.includes(selectedTreeItem.fromUserId) &&
          props.selection.size === 0) ||
        selectionBackUp.first() === selectedTreeItem.id

      if (clickedOnLastSelectedTreeItem) {
        props.clearTagTreeSelection()
        return {}
      }

      props.selectPath(selectedTreeItems)
      return {}
    },
    onHandleSubItemCreated: (state, props) => treeItemInfo => {
      props.createTreeItem(treeItemInfo)
      return {}
    },
    onHandleAddButtonClicked: () => () => ({ showAddControl: true }),
    onHandleAddSectionCancel: () => () => ({ showAddControl: false }),
    onHandleAddSectionSubmit: (state, props) => title => {
      props.createTreeItem({
        title,
        parentId: null,
        order: Date.now(),
      })

      return { showAddControl: false }
    },
    onHandleUpdateSectionTitle: (state, props) => (section, title) => {
      props.updateTreeItemTitle(section, title)
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
        toast.info(toastCommon.infoMessages.treeItems.edit, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.INFO_DURATION,
        })
        return {}
      }

      if (props.tree.size === 1) {
        toast.error(toastCommon.errorMessages.treeSections.notAllowedDelete, {
          position: toastCommon.position.DEFAULT,
          autoClose: toastCommon.duration.ERROR_DURATION,
        })

        return {}
      }

      props.deleteTreeItem(treeItem)
      return {}
    },
    onHandleDeleteTreeItem: (state, props) => treeItem => {
      props.deleteTreeItem(treeItem)
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
