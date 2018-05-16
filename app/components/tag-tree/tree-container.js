import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddTreeItemForm from 'components/tag-tree/add-tree-item-form'
import Tree from 'components/tag-tree/tree'
import Loader from 'components/elements/loader'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import ShadowScrollbar from 'components/elements/shadow-scrollbar'

import {
  showDialog,
  setDetail,
  hideArchivedTasks,
  changeLocation
} from 'redux/store/app-state/app-state.actions'
import {
  getLeftPanel,
  getArchivedTasksVisibility,
} from 'redux/store/app-state/app-state.selectors'
import { getNewRefreshToken } from 'redux/store/auth/auth.selectors'
import { deselectTasks} from 'redux/store/tasks/tasks.actions'
import { selectTag } from 'redux/store/tags/tags.actions'
import { getTagsRelations } from 'redux/store/tags/tags.selectors'
import {
  toggleMenu,
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
  getFetchTree,
  getSelectionTree,
  getAddControlParentId,
  getSections,
} from 'redux/store/tree/tree.selectors'
import { computeTreeSectionOrder } from 'redux/utils/redux-helper'
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'
import { infoMessages } from 'utils/messages'
import constants from 'utils/constants'

class TreeContainer extends React.Component {

  static propTypes = {
    addControlParentId: PropTypes.string,
    collapse: PropTypes.func,
    dropTreeItem: PropTypes.func,
    createTreeItem: PropTypes.func,
    hideTreeItemAddControl: PropTypes.func,
    isFetching: PropTypes.bool,
    isNewRefreshToken: PropTypes.bool,
    selection: PropTypes.object,
    selectPath: PropTypes.func,
    showDialog: PropTypes.func,
    showTreeItemAddControl: PropTypes.func,
    tagsRelations: PropTypes.object,
    tree: PropTypes.object,
    sections: PropTypes.object,
    leftPanel: PropTypes.object,
    archivedTasks: PropTypes.bool,
    moveSection: PropTypes.func,
    dropSection: PropTypes.func,
    selectTag: PropTypes.func,
    setDetail: PropTypes.func,
    hideArchivedTasks: PropTypes.func,
    changeLocation: PropTypes.func,
    deselectTasks: PropTypes.func,
  }

  state = {
    showAddControl: false,
    order: null,
    top: 0,
  }

  constructor(props) {
    super(props)
    this.debouncedMoveSection = debounce(this.invokeMove, 10)
  }

  moveSection = move => this.debouncedMoveSection(move)

  invokeMove(move) {
    const { sourceSectionId } = move
    const sections = this.props.sections

    const order = computeTreeSectionOrder(sections, move)
    if (order === null) {
      return
    }

    this.setState({ order })
    this.props.moveSection(sourceSectionId, order)
  }

  handleDropSection = drop => {
    const { sourceSection } = drop
    const { order } = this.state

    this.props.dropSection(sourceSection, order)
  }

  handleAddTreeItem = parentTreeItemId => {
    this.props.showTreeItemAddControl(parentTreeItemId)
  }

  handleAddButtonClicked = () => {
    this.setState({ showAddControl: true })
  }

  handleTreeItemsSelected = selectedTreeItems => {
    this.props.selectPath(selectedTreeItems)
  }

  handleSubitemCreated = treeItemInfo => {
    // create tree item
    this.props.createTreeItem(treeItemInfo)
  }

  handleAddSectionSubmit = treeItemInfo => {

    // create section
    this.props.createTreeItem({
      title: treeItemInfo.title,
      parentId: null,
      order: Date.now(),
    })

    // hide add control
    this.setState({ showAddControl: false })
  }

  handleAddSectionCancel = () => {
    this.setState({ showAddControl: false })
  }

  handleAddItemSubmit = () => {
    console.log('handleAddItemSubmitted')
  }

  handleAddItemCancel = () => {
    this.props.hideTreeItemAddControl()
  }

  handleEditTreeItem = treeItem => {

    if (treeItem.parentId) {
      // Redirect to tag content
      this.props.hideArchivedTasks()
      this.props.deselectTasks()
      this.props.changeLocation('/user/tags')

      // Show tag detail
      this.props.selectTag(treeItem.tag.id)
      this.props.setDetail('tag')
      toast.info(infoMessages.treeItems.edit, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_INFO_DURATION,
      })
      return
    }

    this.props.showDialog('tree-item-update', { treeItem })
  }

  handleDeleteTreeItem = treeItem => {
    this.props.showDialog('tree-item-tag-delete-confirm', { treeItem })
  }

  handleCollapse = treeItem => {
    this.props.collapse(treeItem)
  }

  handleDrop = dropResult => {
    this.props.dropTreeItem(dropResult)
  }

  getForbiddenTitles() {
    // const rootItemSet = this.state.treeItems.filter((treeItem) => treeItem.parentId === null)
    // const rootTreeItems = rootItemSet.length === 1 ? rootItemSet[0].items : []
    // const titles = rootTreeItems.map(treeItem => treeItem.title)
    // return titles
    return []
  }

  render() {
    const leftPanel = this.props.leftPanel
    const style = { width: leftPanel.width }
    const scrollStyle = {
      height: 'calc(100vh - 120px)',
      shadowHeight: 30,
      boxShadowTop: 'inset 0 30px 30px -15px rgba(41, 48, 52, 1)',
      boxShadowBottom: 'inset 0 -30px 30px -15px  rgba(41, 48, 52, 1)',
      overflow: 'hidden'
    }
    const verticalStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 3,
    }

    return (
      <div>
        <ShadowScrollbar
          style={scrollStyle}
          verticalStyle={verticalStyle} >
          <div
            className="tag-tree-container collapsible-container">
            <div ref="collapseContentTree" className="collapsible-content">
              {(this.props.isNewRefreshToken || this.props.isFetching) && <Loader />}
              {!this.props.isFetching && (
                <Tree
                  treeItems={this.props.tree}
                  selection={this.props.selection}
                  addControlParentId={this.props.addControlParentId}
                  onTreeItemSelected={this.handleTreeItemsSelected}
                  onSubitemCreated={this.handleSubitemCreated}
                  onTreeItemEdit={this.handleEditTreeItem}
                  onTreeItemDelete={this.handleDeleteTreeItem}
                  onAddChild={this.handleAddTreeItem}
                  onAddControlSubmit={this.handleAddItemSubmit}
                  onAddControlCancel={this.handleAddItemCancel}
                  onCollapse={this.handleCollapse}
                  onDrop={this.handleDrop}
                  tagsRelations={this.props.tagsRelations}
                  archivedTasks={this.props.archivedTasks}
                  maxWidth={leftPanel.width}
                  onMoveSection={this.moveSection}
                  onDropSection={this.handleDropSection} />
              )}
              {this.state.showAddControl &&
              <AddTreeItemForm
                parentId={null}
                forbiddenTitles={this.getForbiddenTitles()}
                onSubmit={this.handleAddSectionSubmit}
                onCancel={this.handleAddSectionCancel} />
              }
            </div>
          </div>
        </ShadowScrollbar>
        <div className="add-section" style={style} onClick={this.handleAddButtonClicked}>
          <div className="add-section__text">Add new filter group</div>
          <div className="add-section__icon-plus">
            <Icon
              icon={ICONS.PLUS}
              width={15}
              height={15}
              scale={0.52}
              color="#fff"/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: getFetchTree(state),
  isNewRefreshToken: getNewRefreshToken(state),
  tree: getTree(state),
  sections: getSections(state),
  selection: getSelectionTree(state),
  addControlParentId: getAddControlParentId(state),
  tagsRelations: getTagsRelations(state),
  leftPanel: getLeftPanel(state),
  archivedTasks: getArchivedTasksVisibility(state),
})

const mapDispatchToProps = {
  toggleMenu,
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
  hideArchivedTasks,
  changeLocation,
  deselectTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeContainer)
