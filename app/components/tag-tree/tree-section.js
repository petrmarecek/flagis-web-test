import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { ICONS } from "../icons/icon-constants"
import Icon from '../icons/icon'

import TreeItemList from './tree-item-list'

export default class TreeSection extends Component {

  static propTypes = {
    addControlParentId: PropTypes.string,
    onAddChild: PropTypes.func,
    onAddControlCancel: PropTypes.func,
    onCollapse: PropTypes.func,
    onSubitemCreated: PropTypes.func,
    onTreeItemEdit: PropTypes.func,
    onTreeItemSelected: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    section: PropTypes.object,
    selection: PropTypes.object,
    tagsRelations: PropTypes.object,
    archivedTasks: PropTypes.bool,
    maxWidth: PropTypes.number,
  }

  handleAddChildClicked = event => {
    event.stopPropagation()
    this.props.onAddChild(this.props.section.id)
  }

  // The event which occurs when the collapsing arrow was clicked
  handleCollapse = event => {
    event.stopPropagation()
    this.props.onCollapse(this.props.section)
  }

  handleEditIconClicked = event => {
    event.stopPropagation()
    this.props.onTreeItemEdit(this.props.section.toJS())
  }

  renderArrowIcon(children) {

    const arrowIconClass = classnames({
      'tree-section__icon': true,
      arrow: true,
      collapsed: this.props.section.collapsed
    })

    const title = this.props.section.collapsed ? 'Expand' : 'Collapse'
    return children.size > 0
      ? <span
          ref="arrow"
          title={title}>
          <Icon
            className={arrowIconClass}
            icon={ICONS.ARROW_DOUBLE}
            width={13}
            height={15}
            scale={1.07}
            color="#fff"
            onClick={this.handleCollapse}/>
        </span>

      : null
  }

  render() {

    const parents = [this.props.section.id]
    const treeItemClasses = classnames({
      'tree-section-wrapper': true,
      'active': this.props.section.active,
      'selected': this.props.section.selected,
      'folder': this.props.section.childItems.length > 0,
      'drop-section': true,
    })
    
    const currentItemClasses = classnames({
      'tree-section': !this.props.section.parentId,
      'tree-section--collapsed': this.props.section.collapsed,
      'prevent-detail-hide': !this.props.section.parentId,
      'drag-item': true,
    })

    const style = { maxWidth: this.props.maxWidth - 135 }
    
    // component
    return (
      <li ref="node" className={treeItemClasses} data-item-id={this.props.section.id} draggable>
        <a ref="elem"
          className={currentItemClasses}
          data-item-id={this.props.section.id}
          onClick={this.handleClicked}>
          <span className="tree-section__title" style={style}>{this.props.section.title}</span>
          <span className="tree-section__icons">
            {this.renderArrowIcon(this.props.section.childItems)}
            <span title="Edit">
              <Icon
                className="tree-section__icon edit"
                icon={ICONS.PENCIL}
                width={15}
                height={15}
                color="#fff"
                onClick={this.handleEditIconClicked}/>
            </span>
          </span>
        </a>
        <TreeItemList 
          addControlParentId={this.props.addControlParentId}
          tagsRelations={this.props.tagsRelations}
          onAddChild={this.props.onAddChild} 
          onAddControlCancel={this.props.onAddControlCancel}
          onCollapse={this.props.onCollapse}
          onDrop={this.props.onDrop}
          onSubitemCreated={this.props.onSubitemCreated}
          onSubmit={this.props.onSubitemCreated}
          onTreeItemEdit={this.props.onTreeItemEdit}
          onTreeItemSelected={this.props.onTreeItemSelected}
          selection={this.props.selection}
          parents={parents}
          parentTagRelations={null}
          treeItem={this.props.section}
          archivedTasks={this.props.archivedTasks}/>
        {!this.props.section.collapsed &&
        <span className="tree-section__icon add-subtag" title="Add filter" >
          <Icon
            icon={ICONS.PLUS}
            width={15}
            height={15}
            scale={0.52}
            color="#fff"
            title="Edit"
            onClick={this.handleAddChildClicked}/>
        </span>}
      </li>
    )
  }
}
