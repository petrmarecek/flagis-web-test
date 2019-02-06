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
import TasksMenuContainer from 'components/tasks-menu/tasks-menu-container'
import Dashboard from 'components/dashboard'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const DashboardContent = ({
  search,
  isMultiSelect,
  isVisibleArchive,
  onHandleSearchChange,
}) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder>
        <MainSearch />
        <SearchBox value={search} onChange={onHandleSearchChange} />
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary smallOffsetPadding>
        {!isMultiSelect && !isVisibleArchive && <NavigationSecondary />}
        <TasksMenuContainer />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={108} offsetBottom={0}>
      <Dashboard />
    </CenterPanelScroll>
  </div>
)

DashboardContent.propTypes = {
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleSearchChange: props => search => props.updateTaskSearch(search),
  })
)(DashboardContent)
