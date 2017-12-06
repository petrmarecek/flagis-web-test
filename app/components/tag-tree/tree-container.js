import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddTreeItemForm from 'components/tag-tree/add-tree-item-form'
import Tree from 'components/tag-tree/tree'
import Loader from 'components/elements/loader'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import ShadowScrollbar from 'components/elements/shadow-scrollbar'

import { getTree } from 'redux/store/tree/tree.selectors'
import { showDialog } from 'redux/store/app-state/app-state.actions'
import {
  toggleMenu,
  showTreeItemAddControl,
  hideTreeItemAddControl,
  createTreeItem,
  selectPath,
  collapse,
  dropTreeItem,
} from 'redux/store/tree/tree.actions'

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
    leftPanel: PropTypes.object,
    archivedTasks: PropTypes.bool,
  }

  state = {
    showAddControl: false,
    top: 0,
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
      parentId: null,
      title: treeItemInfo.title,
      isSection: true,
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
    let dialog = 'tree-item-update'

    if (treeItem.parentId) {
      dialog = 'tree-item-tag-update'
    }

    this.props.showDialog(dialog, { treeItem })
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
                onAddChild={this.handleAddTreeItem}
                onAddControlSubmit={this.handleAddItemSubmit}
                onAddControlCancel={this.handleAddItemCancel}
                onCollapse={this.handleCollapse}
                onDrop={this.handleDrop}
                tagsRelations={this.props.tagsRelations}
                archivedTasks={this.props.archivedTasks}
                maxWidth={leftPanel.width} />
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
  isFetching: state.tree.isFetching,
  isNewRefreshToken: state.auth.newRefreshToken,
  tree: getTree(state),
  selection: state.tree.selection,
  addControlParentId: state.tree.addControlParentId,
  tagsRelations: state.tags.relations,
  leftPanel: state.appState.leftPanel,
  archivedTasks: state.appState.archivedTasks.isVisible
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
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeContainer)
