import React from 'react'
import PropTypes from 'prop-types'

// styles
import {
  SectionCollapseWrapper,
  SectionCollapseTitle,
  SectionCollapseDescription,
} from './styles'

const LandingSectionCollapse = ({ title, children }) => (
  <SectionCollapseWrapper>
    <SectionCollapseTitle>{title}</SectionCollapseTitle>
    <SectionCollapseDescription>{children}</SectionCollapseDescription>
  </SectionCollapseWrapper>
)

LandingSectionCollapse.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
}

export default LandingSectionCollapse
