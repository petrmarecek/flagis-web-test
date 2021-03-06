import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateTaskSearch } from 'redux/store/tasks/tasks.actions'
import { getTasksSearch } from 'redux/store/tasks/tasks.selectors'
import {
  getMultiSelectVisibility,
  getArchivedTasksVisibility,
} from 'redux/store/app-state/app-state.selectors'

// components
import MainSearch from 'components/common/main-search'
import SearchBox from 'components/common/search-box'
import NavigationSecondary from 'components/navigation/navigation-secondary'
import TasksMenuContainer from 'components/tasks-menu'
import AddTaskForm from 'components/common/add-task-form'
import TaskListContainer from '../task-list'
import TasksProgressBar from 'components/common/tasks-progress-bar'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopPrimaryLeft,
  CenterPageTitle,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const TasksContent = ({
  search,
  isMultiSelect,
  isVisibleArchive,
  onHandleSearchChange,
}) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder>
        <CenterPanelTopPrimaryLeft flexStart>
          <CenterPageTitle>My Tasks</CenterPageTitle>
          <MainSearch />
        </CenterPanelTopPrimaryLeft>
        <SearchBox value={search} onChange={onHandleSearchChange} />
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary smallOffsetPadding>
        {!isMultiSelect && !isVisibleArchive && <NavigationSecondary />}
        <TasksMenuContainer />
      </CenterPanelTopSecondary>
      <AddTaskForm />
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={166} offsetBottom={30}>
      <TaskListContainer />
    </CenterPanelScroll>
    <TasksProgressBar />
  </div>
)

TasksContent.propTypes = {
  search: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  isVisibleArchive: PropTypes.bool,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = state => ({
  search: getTasksSearch(state),
  isMultiSelect: getMultiSelectVisibility(state),
  isVisibleArchive: getArchivedTasksVisibility(state),
})

const mapDispatchToProps = { updateTaskSearch }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSearchChange: props => search => props.updateTaskSearch(search),
  })
)(TasksContent)
