import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import {
  hideDialog,
  setLoader,
  deselectLoader,
} from 'redux/store/app-state/app-state.actions'
import { getCurrentDialog } from 'redux/store/app-state/app-state.selectors'
import {
  addRemoveTaskTags,
  deselectTasks,
} from 'redux/store/tasks/tasks.actions'
import {
  getSelectTasks,
  getSelectTasksTags,
} from 'redux/store/tasks/tasks.selectors'
import { getTags } from 'redux/store/tags/tags.selectors'
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
import { loaderTypes } from 'redux/store/app-state/app-state.common'

// dialogs
import AddRemoveTagsDialog from './add-remove-tags-dialog'

class Dialogs extends PureComponent {
  static propTypes = {
    currentDialog: PropTypes.object,
    hideDialog: PropTypes.func.isRequired,
    setLoader: PropTypes.func.isRequired,
    deselectLoader: PropTypes.func.isRequired,
    deselectTasks: PropTypes.func.isRequired,
    tags: PropTypes.object,
    tagsLists: PropTypes.object,
    addToList: PropTypes.func,
    deleteFromList: PropTypes.func,
    clearLists: PropTypes.func,
    addRemoveTaskTags: PropTypes.func,
    selectTasks: PropTypes.array,
    multiSelectActiveTags: PropTypes.object,
    multiSelectInactiveTags: PropTypes.object,
    multiSelectOtherTags: PropTypes.object,
    multiSelectAddTags: PropTypes.object,
    multiSelectRemoveTags: PropTypes.object,
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
    this.props.setLoader(loaderTypes.GLOBAL)

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
    this.props.deselectTasks()
    this.props.hideDialog()
    this.props.deselectLoader('global')
  }

  // Get current dialog
  getDialog(currentDialog) {
    if (!currentDialog) {
      return null
    }

    switch (currentDialog.name) {
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
            windowWidth={window.innerWidth}
          />
        )
      }

      default:
        return null
    }
  }

  render() {
    const dialog = this.getDialog(this.props.currentDialog)
    return (
      <div>
        {dialog}
        {Boolean(dialog) && (
          <div
            ref="overlay"
            className="dialog-overlay dialog-overlay--visible"
            onClick={this.handleHideDialog}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDialog: getCurrentDialog(state),
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
  hideDialog,
  setLoader,
  deselectLoader,
  addToList,
  deleteFromList,
  clearLists,
  addRemoveTaskTags,
  deselectTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)
