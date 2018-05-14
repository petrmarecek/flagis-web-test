import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

import { hideDialog } from 'redux/store/app-state/app-state.actions'
import { getCurrentDialog } from 'redux/store/app-state/app-state.selectors'
import {
  updateTreeItemTitle,
  deleteTreeItem,
} from 'redux/store/tree/tree.actions'
import {
  addRemoveTaskTags,
  deleteTask,
  deselectTasks,
} from 'redux/store/tasks/tasks.actions'
import {
  getSelectTasks,
  getSelectTasksTags,
  getTasksItems,
  getCompletedTasksItems,
  getArchivedTasksItems,
} from 'redux/store/tasks/tasks.selectors'
import {
  deleteTag,
  setActiveTags,
  deselectTags,
} from 'redux/store/tags/tags.actions'
import { getTagsReferences } from 'redux/store/tree/tree.selectors'
import {
  getTags,
  getTagsRelations,
  getActiveTagsIds,
} from 'redux/store/tags/tags.selectors'
import { getEntitiesTasks } from 'redux/store/entities/entities.selectors'
import {
  addToList,
  deleteFromList,
  clearLists,
} from 'redux/store/multi-select/multi-select.actions'
import {
  getMultiSelectAddTags,
  getMultiSelectRemoveTags,
  getMultiSelectAddTagsIds,
  getMultiSelectRemoveTagsIds,
  getMultiSelectActiveTags,
  getMultiSelectInactiveTags,
  getMultiSelectOtherTags,
} from 'redux/store/multi-select/multi-select.selectors'

import ConfirmTaskDeleteDialog from './confirm-task-delete-dialog'
import ConfirmTagDeleteDialog from './confirm-tag-delete-dialog'
import UpdateTreeItemDialog from './update-tree-item-dialog'
import ConfirmTreeItemTagDeleteDialog from './confirm-tree-item-tag-delete-dialog'
import AddRemoveTagsDialog from './add-remove-tags-dialog'

class Dialogs extends Component {

  static propTypes = {
    currentDialog: PropTypes.object,
    tasks: PropTypes.object,
    entitiesTasks: PropTypes.object,
    completedTasks: PropTypes.object,
    archivedTasks: PropTypes.object,
    tagsReferences: PropTypes.object,
    tagsRelations: PropTypes.object,
    activeTags: PropTypes.object,
    hideDialog: PropTypes.func.isRequired,
    updateTreeItemTitle: PropTypes.func.isRequired,
    deleteTreeItem: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    setActiveTags: PropTypes.func.isRequired,
    tags: PropTypes.object,
    tagsLists: PropTypes.object,
    deselectTasks: PropTypes.func,
    deselectTags: PropTypes.func,
    addToList: PropTypes.func,
    deleteFromList: PropTypes.func,
    clearLists: PropTypes.func,
    multiSelectActiveTags: PropTypes.object,
    multiSelectInactiveTags: PropTypes.object,
    multiSelectOtherTags: PropTypes.object,
    multiSelectAddTags: PropTypes.object,
    multiSelectRemoveTags: PropTypes.object,
    addRemoveTaskTags: PropTypes.func,
    selectTasks: PropTypes.array,
    multiSelectAddEntitiesTags: PropTypes.object,
    multiSelectRemoveEntitiesTags: PropTypes.object,
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = event => {
    if (!this.props.currentDialog) {
      return
    }

    if (event.which !== 27) {
      return
    }

    this.handleHideDialog()
  }

  // Hide dialog
  handleHideDialog = () => {
    this.props.hideDialog()
  }

  // update-tree-item-dialog
  // update-tree-item-tag-dialog
  handleTreeItemUpdate = (treeItem, title) => {
    this.props.updateTreeItemTitle(treeItem, title)
    this.props.hideDialog()
  }

  handleTreeItemDelete = treeItem => {
    this.props.deleteTreeItem(treeItem)
    this.props.hideDialog()
  }


  // confirm-task-delete-dialog
  handleTaskDelete = deleteTasks => {
    if (!deleteTasks) {
      return
    }

    let newTasksList = this.props.tasks
    let newTaskCompleteList = this.props.completedTasks
    let newArchivedTasks = this.props.archivedTasks
    let newTaskEntitiesList = this.props.entitiesTasks
    const originalData = {
      taskDeleteList: deleteTasks,
      taskList: newTasksList,
      taskCompleteList: newTaskCompleteList,
      taskArchiveList: newArchivedTasks,
      taskEntitiesList: newTaskEntitiesList,
    }

    for (const taskId of deleteTasks) {
      newTasksList = newTasksList.includes(taskId)
        ? newTasksList.delete(newTasksList.indexOf(taskId))
        : newTasksList

      newTaskCompleteList = newTaskCompleteList.includes(taskId)
        ? newTaskCompleteList.delete(newTaskCompleteList.indexOf(taskId))
        : newTaskCompleteList

      newArchivedTasks = newArchivedTasks.includes(taskId)
        ? newArchivedTasks.delete(newArchivedTasks.indexOf(taskId))
        : newArchivedTasks

      newTaskEntitiesList = newTaskEntitiesList.setIn([taskId, 'isTrashed'], true)
    }

    this.props.hideDialog()
    this.props.deselectTasks()
    this.props.deleteTask(
      deleteTasks,
      newTasksList,
      newTaskCompleteList,
      newArchivedTasks,
      newTaskEntitiesList,
      originalData
    )

  }

  // confirm-tag-delete-dialog
  handleTagDelete = tag => {
    const tagId = tag.id
    const tagsRelations = this.props.tagsRelations
    const tagsReferences = this.props.tagsReferences
    const isReferenced = tagsReferences.has(tagId)
    const isTagsRelations = tagsRelations.has(tagId)

    if (isReferenced) {
      toast.error(errorMessages.tags.referenceDeleteConflict, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })
      return
    }

    if (isTagsRelations) {
      if (tagsRelations.getIn([tagId]).size > 0) {
        toast.error(errorMessages.tags.relationDeleteConflict, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: constants.NOTIFICATION_ERROR_DURATION,
        })
       return
      }
    }

    // Delete tag
    this.props.hideDialog()
    this.props.deselectTags()
    this.props.deleteTag(tag)

    // Delete tag from activeTags if the tag in activeTags
    const activeTags = this.props.activeTags
    const tagIds = activeTags.includes(tagId)
      ? activeTags.filter(id => id !== tagId)
      : activeTags
    this.props.setActiveTags(tagIds)
  }

  // add-remove-tags-dialog
  handleAddToList = (item, typeList) => {
    this.props.addToList(item, typeList)
  }

  handleDeleteFromList = (item, typeList) => {
    this.props.deleteFromList(item, typeList)
  }

  handleClearLists = () => {
    this.props.clearLists()
  }

  handleAddRemoveTagsSubmit = () => {
    const tasks = this.props.selectTasks

    for (const task of tasks) {
      let addTags = this.props.multiSelectAddEntitiesTags
      let removeTags = this.props.multiSelectRemoveEntitiesTags

      for (const tag of addTags) {
        if (task.tags.includes(tag)) {
          addTags = addTags.filter(addTag => addTag !== tag)
        }
      }

      for (const tag of removeTags) {
        if (!task.tags.includes(tag)) {
          removeTags = removeTags.filter(removeTag => removeTag !== tag)
        }
      }

      this.props.addRemoveTaskTags(task.id, addTags, removeTags)
    }

    this.props.clearLists()
    this.props.hideDialog()
  }

  // Get current dialog
  getDialog(currentDialog) {

    if (!currentDialog) {
      return null
    }

    switch (currentDialog.name) {

      case 'tree-item-update': {
        return (
          <UpdateTreeItemDialog
            data={currentDialog.data}
            onHide={this.props.hideDialog}
            onDelete={this.handleTreeItemDelete}
            onUpdate={this.handleTreeItemUpdate}
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth} />
        )
      }

      case 'tree-item-tag-delete-confirm': {
        return (
          <ConfirmTreeItemTagDeleteDialog
            data={currentDialog.data}
            onHide={this.props.hideDialog}
            onDelete={this.handleTreeItemDelete}
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth} />
        )
      }

      case 'task-delete-confirm': {
        return (
          <ConfirmTaskDeleteDialog
            data={currentDialog.data}
            onHide={this.props.hideDialog}
            onDelete={this.handleTaskDelete}
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth} />
        )
      }

      case 'tag-delete-confirm': {
        return (
          <ConfirmTagDeleteDialog
            data={currentDialog.data}
            onHide={this.props.hideDialog}
            onDelete={this.handleTagDelete}
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth} />
        )
      }

      case 'add-remove-tags': {
        return (
          <AddRemoveTagsDialog
            data={currentDialog.data}
            tags={this.props.tags}
            tagsLists={this.props.tagsLists}
            activeTags={this.props.multiSelectActiveTags}
            inactiveTags={this.props.multiSelectInactiveTags}
            otherTags={this.props.multiSelectOtherTags}
            addTags={this.props.multiSelectAddTags}
            removeTags={this.props.multiSelectRemoveTags}
            addToList={this.handleAddToList}
            deleteFromList={this.handleDeleteFromList}
            clearLists={this.handleClearLists}
            onHide={this.props.hideDialog}
            onSubmit={this.handleAddRemoveTagsSubmit}
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth} />
        )
      }

      default: return null
    }
  }

  render() {
    const dialog = this.getDialog(this.props.currentDialog)
    return (
      <div>
        {dialog}
        {Boolean(dialog) &&
        <div
          ref="overlay"
          className="dialog-overlay dialog-overlay--visible"
          onClick={this.handleHideDialog}/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDialog: getCurrentDialog(state),
  tasks: getTasksItems(state),
  completedTasks: getCompletedTasksItems(state),
  archivedTasks: getArchivedTasksItems(state),
  entitiesTasks: getEntitiesTasks(state),
  tagsReferences: getTagsReferences(state),
  tagsRelations: getTagsRelations(state),
  activeTags: getActiveTagsIds(state),
  tags: getTags(state),
  tagsLists: getSelectTasksTags(state),
  multiSelectActiveTags: getMultiSelectActiveTags(state),
  multiSelectInactiveTags: getMultiSelectInactiveTags(state),
  multiSelectOtherTags: getMultiSelectOtherTags(state),
  multiSelectAddTags: getMultiSelectAddTagsIds(state),
  multiSelectAddEntitiesTags: getMultiSelectAddTags(state),
  multiSelectRemoveTags: getMultiSelectRemoveTagsIds(state),
  multiSelectRemoveEntitiesTags: getMultiSelectRemoveTags(state),
  selectTasks: getSelectTasks(state),
})

const mapDispatchToProps = {
  updateTreeItemTitle,
  deleteTreeItem,
  hideDialog,
  deleteTask,
  deleteTag,
  setActiveTags,
  deselectTasks,
  deselectTags,
  addToList,
  deleteFromList,
  clearLists,
  addRemoveTaskTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)
