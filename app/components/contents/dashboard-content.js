import React from 'react'
import { compose } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateTaskSearch } from 'redux/store/tasks/tasks.actions'

// components
import Dashboard from 'components/dashboard'
import MainSearch from 'components/common/main-search'
import NavigationSecondary from 'components/navigation/navigation-secondary'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelScroll,
  CenterPanelTopPrimaryLeft,
  CenterPanelTopSecondary
} from '../panels/styles'

const DashboardContent = () => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder>
        <CenterPanelTopPrimaryLeft flexStart>
          <CenterPageTitle>My Tasks</CenterPageTitle>
          <MainSearch />
        </CenterPanelTopPrimaryLeft>
      </CenterPanelTopPrimary>
      <CenterPanelTopSecondary smallOffsetPadding>
        <NavigationSecondary />
      </CenterPanelTopSecondary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={100} offsetBottom={0}>
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
