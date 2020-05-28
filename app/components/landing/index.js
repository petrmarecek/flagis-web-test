import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  TaskInOneDescriptionChalenge,
  TaskInOneDescriptionSolution,
  taskInOne,
  ColaborationDescriptionChalenge,
  ColaborationDescriptionSolution,
  colaboration,
  TagTreeDescriptionChalenge,
  TagTreeOneDescriptionSolution,
  tagTree,
} from './data'

// redux
import { connect } from 'react-redux'
import { controlRedirectTasks } from 'redux/store/auth/auth.actions'

// components
import LandingMobileLedge from './landing-mobile-ledge'
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import LandingSectionMain from './landing-section-main'
import LandingSection from './landing-section'
import LandingSectionCollapse from './landing-section-collapse'

// styles
import { LandingWrapper } from './styles'
import LandingFooter from './landing-footer'

class Landing extends PureComponent {
  static propTypes = {
    controlRedirectTasks: PropTypes.func,
    location: PropTypes.object,
  }

  componentWillMount() {
    this.props.controlRedirectTasks()
  }

  render() {
    return (
      <LandingWrapper>
        <LandingMobileLedge />
        <NavigationLandingPrimary location={this.props.location} />
        <LandingSectionMain />
        <LandingSection
          type="taskInOne"
          title={taskInOne.title}
          description={taskInOne.description}
        >
          <LandingSectionCollapse title="Challenge">
            <TaskInOneDescriptionChalenge />
          </LandingSectionCollapse>
          <LandingSectionCollapse title="Solution">
            <TaskInOneDescriptionSolution />
          </LandingSectionCollapse>
        </LandingSection>
        <LandingSection
          type="colaboration"
          title={colaboration.title}
          description={colaboration.description}
        >
          <LandingSectionCollapse title="Challenge">
            <ColaborationDescriptionChalenge />
          </LandingSectionCollapse>
          <LandingSectionCollapse title="Solution">
            <ColaborationDescriptionSolution />
          </LandingSectionCollapse>
        </LandingSection>
        <LandingSection
          type="tagTree"
          title={tagTree.title}
          description={tagTree.description}
        >
          <LandingSectionCollapse title="Challenge">
            <TagTreeDescriptionChalenge />
          </LandingSectionCollapse>
          <LandingSectionCollapse title="Solution">
            <TagTreeOneDescriptionSolution />
          </LandingSectionCollapse>
        </LandingSection>
        <LandingFooter />
      </LandingWrapper>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { controlRedirectTasks }

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
