import React from 'react'
import PropTypes from 'prop-types'
import TaskListItem from 'components/task-list/task-list-item'
import { TaskListItems } from './styles'

const TaskList = props => {
  const {
    // data
    userId,
    tasks,
    listType,
    selectedTasks,
    selectedTags,
    sort,
    leftPanelWidth,
    windowWidth,

    // handlers
    onCompleteClick,
    onTaskSelect,
    onToggleImportant,
    moveTask,
    dropTask,
    onTagClick,
    setArchiveTasks,
    cancelArchiveTasks,
    acceptTask,
    rejectTask,
  } = props

  const getTaskItems = (taskItems) => {
    if (!listType) {
      return null
    }

    return taskItems.map((task, i) => (
      <TaskListItem
        key={task.id}
        userId={userId}
        task={task}
        index={i}
        order={task.order}
        listType={listType}
        isSelected={selectedTasks.has(task.id)}
        selectedTags={selectedTags}
        onCompleteClick={onCompleteClick}
        onClick={onTaskSelect}
        onToggleImportant={onToggleImportant}
        moveTask={moveTask}
        dropTask={dropTask}
        onTagClick={onTagClick}
        sort={sort}
        setArchiveTasks={setArchiveTasks}
        cancelArchiveTasks={cancelArchiveTasks}
        acceptTask={acceptTask}
        rejectTask={rejectTask}
        leftPanelWidth={leftPanelWidth}
        windowWidth={windowWidth}
      />
    ))
  }

  // children items
  const taskItems = getTaskItems(tasks)
  return (
    <div className="task-list-items">
      <TaskListItems>{taskItems}</TaskListItems>
    </div>
  )
}

TaskList.propTypes = {
  // Data
  userId: PropTypes.string,
  tasks: PropTypes.array,
  listType: PropTypes.string,
  selectedTasks: PropTypes.object,
  selectedTags: PropTypes.object,
  sort: PropTypes.object,
  leftPanelWidth: PropTypes.number,
  windowWidth: PropTypes.number,

  // Handlers
  onCompleteClick: PropTypes.func,
  onTaskSelect: PropTypes.func,
  onToggleImportant: PropTypes.func,
  moveTask: PropTypes.func,
  dropTask: PropTypes.func,
  onTagClick: PropTypes.func,
  setArchiveTasks: PropTypes.func,
  cancelArchiveTasks: PropTypes.func,
  acceptTask: PropTypes.func,
  rejectTask: PropTypes.func,
}

export default TaskList
