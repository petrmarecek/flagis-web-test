import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TreeSection from 'components/tag-tree/tree-section'

export default class Tree extends Component {

  static propTypes = {
    treeItems: PropTypes.object,
    onTreeItemSelected: PropTypes.func,
    onSubitemCreated: PropTypes.func,
    onAddChild: PropTypes.func,
    addControlParentId: PropTypes.string,
    onAddControlCancel: PropTypes.func,
    onTreeItemEdit: PropTypes.func,
    onCollapse: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    selection: PropTypes.object,
    tagsRelations: PropTypes.object,
    archivedTasks: PropTypes.bool,
    maxWidth: PropTypes.number,
    onMoveSection: PropTypes.func,
    onDropSection: PropTypes.func,
  }

  render() {
    let index = 0
    return (
      <ul className="tag-tree" ref="tree">
        {this.props.treeItems.map(treeItem => (
          <TreeSection
            key={treeItem.id}
            index={index++}
            section={treeItem}
            selection={this.props.selection}
            addControlParentId={this.props.addControlParentId}
            onSubitemCreated={this.props.onSubitemCreated}
            onTreeItemSelected={this.props.onTreeItemSelected}
            onTreeItemEdit={this.props.onTreeItemEdit}
            onAddChild={this.props.onAddChild}
            onAddControlCancel={this.props.onAddControlCancel}
            onCollapse={this.props.onCollapse}
            onDrop={this.props.onDrop}
            tagsRelations={this.props.tagsRelations}
            archivedTasks={this.props.archivedTasks}
            maxWidth={this.props.maxWidth}
            onMoveSection={this.props.onMoveSection}
            onDropSection={this.props.onDropSection} />
        ))}
      </ul>
    )
  }
}
