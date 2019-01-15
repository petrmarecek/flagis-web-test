import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  compose,
  branch,
  renderComponent,
  withStateHandlers,
  pure,
} from 'recompose'

import AddTagTreeItemForm from 'components/common/add-tag-tree-item-form'
import TagTree from 'components/tag-tree/tag-tree'
import Loader from 'components/common/loader'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

import {
  showDialog,
  setDetail,
  changeLocation,
} from 'redux/store/app-state/app-state.actions'
import { getLeftPanel } from 'redux/store/app-state/app-state.selectors'
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
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'
import { infoMessages } from 'utils/messages'
import constants from 'utils/constants'

import { CollabsibleContent } from '../styled-components-mixins'
import { Wrapper, AddSection, AddSectionText, AddSectionIcon } from './styles'

const TagTreeContainer = props => {
  const {
    // Data
    addControlParentId,
    selection,
    tagsRelations,
    tree,
    leftPanel,

    // state
    showAddControl,

    // handlers
    onInvokeMove,
    onHandleDropSection,
    onHandleAddTreeItem,
    onHandleAddButtonClicked,
    onHandleTreeItemsSelected,
    onHandleSubitemCreated,
    onHandleAddSectionSubmit,
    onHandleAddSectionCancel,
    onHandleAddItemCancel,
    onHandleEditTreeItem,
    onHandleDeleteTreeItem,
    onHandleCollapse,
    onHandleDrop,
  } = props

  const debouncedMoveSection = debounce(onInvokeMove, 10)
  const onMoveSection = move => debouncedMoveSection(move)
  const scrollStyle = {
    height: 'calc(100vh - 120px)',
    shadowHeight: 30,
    boxShadowTop: 'inset 0 30px 30px -15px rgba(41, 48, 52, 1)',
    boxShadowBottom: 'inset 0 -30px 30px -15px  rgba(41, 48, 52, 1)',
    overflow: 'hidden',
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
              maxWidth={leftPanel.width}
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
            {showAddControl && (
              <AddTagTreeItemForm
                parentId={null}
                onSubmit={onHandleAddSectionSubmit}
                onCancel={onHandleAddSectionCancel}
              />
            )}
          </CollabsibleContent>
        </Wrapper>
      </ShadowScrollbar>
      <AddSection onClick={onHandleAddButtonClicked}>
        <AddSectionText>Add new filter group</AddSectionText>
        <AddSectionIcon>
          <Icon
            icon={ICONS.PLUS}
            width={15}
            height={15}
            scale={0.52}
            color={['#fff']}
          />
        </AddSectionIcon>
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
  leftPanel: PropTypes.object,

  // state
  showAddControl: PropTypes.bool,

  // handlers
  onInvokeMove: PropTypes.func,
  onHandleDropSection: PropTypes.func,
  onHandleAddTreeItem: PropTypes.func,
  onHandleAddButtonClicked: PropTypes.func,
  onHandleTreeItemsSelected: PropTypes.func,
  onHandleSubitemCreated: PropTypes.func,
  onHandleAddSectionSubmit: PropTypes.func,
  onHandleAddSectionCancel: PropTypes.func,
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
  leftPanel: getLeftPanel(state),
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
  changeLocation,
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
  withStateHandlers(
    () => ({
      showAddControl: false,
      order: null,
      top: 0,
    }),
    {
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
      onHandleAddButtonClicked: () => () => ({ showAddControl: true }),
      onHandleTreeItemsSelected: (state, props) => selectedTreeItems => {
        props.selectPath(selectedTreeItems)
        return {}
      },
      onHandleSubitemCreated: (state, props) => treeItemInfo => {
        props.createTreeItem(treeItemInfo)
        return {}
      },
      onHandleAddSectionSubmit: (state, props) => treeItemInfo => {
        props.createTreeItem({
          title: treeItemInfo.title,
          parentId: null,
          order: Date.now(),
        })

        // hide add control
        return { showAddControl: false }
      },
      onHandleAddSectionCancel: () => () => ({ showAddControl: false }),
      onHandleAddItemCancel: (state, props) => () => {
        props.hideTreeItemAddControl()
        return {}
      },
      onHandleEditTreeItem: (state, props) => treeItem => {
        if (treeItem.parentId) {
          // Redirect to tag content
          props.deselectTasks()
          props.changeLocation('/user/tags')

          // Show tag detail
          props.selectTag(treeItem.tag.id)
          props.setDetail('tag')
          toast.info(infoMessages.treeItems.edit, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: constants.NOTIFICATION_INFO_DURATION,
          })
          return {}
        }

        props.showDialog('tree-item-update', { treeItem })
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
    }
  ),
  pure
)(TagTreeContainer)
