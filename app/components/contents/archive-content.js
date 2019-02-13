import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateTaskSearch } from 'redux/store/tasks/tasks.actions'
import { getTasksSearch } from 'redux/store/tasks/tasks.selectors'

// components
import MainSearch from 'components/common/main-search'
import SearchBox from 'components/common/search-box'
import TaskListContainer from '../task-list'
import TasksMenuContainer from '../tasks-menu/tasks-menu-container'

// styles
import styled from 'styled-components'
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelTopSecondary,
  CenterPanelScroll,
} from '../panels/styles'

const ArchivedTitle = styled.div`
  height: 14px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #293034;
  border-top: 2px solid #fff;
  padding: 9px 0 9px 10px;
`

const ArchiveContent = ({ search, onHandleSearchChange }) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder>
        <MainSearch />
        <SearchBox value={search} onChange={onHandleSearchChange} />
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary flexEnd>
        <TasksMenuContainer />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <ArchivedTitle>Archived Tasks</ArchivedTitle>
    <CenterPanelScroll offsetTop={152} offsetBottom={10}>
      <TaskListContainer />
    </CenterPanelScroll>
  </div>
)

ArchiveContent.propTypes = {
  search: PropTypes.string,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = state => ({
  search: getTasksSearch(state),
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
)(ArchiveContent)
