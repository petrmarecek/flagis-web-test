import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import AddTreeItemForm from 'components/tag-tree/add-tree-item-form'
import TreeItem from 'components/tag-tree/tree-item'

export default class TreeItemList extends PureComponent {

  static propTypes = {
    // Data
    treeItem: PropTypes.object.isRequired,
    parents: PropTypes.array.isRequired,
    addControlParentId: PropTypes.string,
    parentTagRelations: PropTypes.object,
    selection: PropTypes.object.isRequired,
    tagsRelations: PropTypes.object.isRequired,

    // Handlers
    onAddChild: PropTypes.func.isRequired,
    onAddControlCancel: PropTypes.func.isRequired,
    onCollapse: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onSubitemCreated: PropTypes.func.isRequired,
    onTreeItemEdit: PropTypes.func.isRequired,
    onTreeItemDelete: PropTypes.func.isRequired,
    onTreeItemSelected: PropTypes.func.isRequired,
  }

  render() {

    // CSS
    const subtreeClass = cx({
      'tag-subtree': true,
      'tag-subtree--root': this.props.treeItem.parentId === null,
      'collapsed': this.props.treeItem.collapsed,
    })

    return (
      <ul className={subtreeClass} ref="subtree">
        {this.props.treeItem.childItems.map(treeItem => (
          <TreeItem
            addControlParentId={this.props.addControlParentId}
            key={treeItem.id}
            onAddChild={this.props.onAddChild}
            onAddControlCancel={this.props.onAddControlCancel}
            onCollapse={this.props.onCollapse}
            onDrop={this.props.onDrop}
            onSubitemCreated={this.props.onSubitemCreated}
            onTreeItemEdit={this.props.onTreeItemEdit}
            onTreeItemDelete={this.props.onTreeItemDelete}
            onTreeItemSelected={this.props.onTreeItemSelected}
            parents={this.props.parents}
            parentTagRelations={this.props.parentTagRelations}
            selection={this.props.selection}
            tagsRelations={this.props.tagsRelations}
            treeItem={treeItem} />
        ))}
        {this.props.addControlParentId === this.props.treeItem.id && (
          <AddTreeItemForm
            parentId={this.props.treeItem.id}
            forbiddenTitles={[]}
            onSubmit={this.props.onSubitemCreated}
            onCancel={this.props.onAddControlCancel}/>
        )}
      </ul>
    )
  }

}
