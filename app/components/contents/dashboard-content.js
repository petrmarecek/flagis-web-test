import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateTaskSearch } from 'redux/store/tasks/tasks.actions'

// components
import Dashboard from 'components/dashboard'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelScroll,
} from '../panels/styles'

const DashboardContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary>
        <CenterPageTitle>Dashboard</CenterPageTitle>
      </CenterPanelTopPrimary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={60} offsetBottom={-30}>
      <Dashboard />
    </CenterPanelScroll>
  </div>
)

DashboardContent.propTypes = {}

const mapStateToProps = () => ({
})

const mapDispatchToProps = { updateTaskSearch }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardContent)
