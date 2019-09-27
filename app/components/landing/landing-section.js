import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import TaksInOneImg from 'assets/img/landing-page/task-in-one.png'
import ColaborationImg from 'assets/img/landing-page/colaboration.png'
import TagTreeImg from 'assets/img/landing-page/tag-tree.png'

// styles
import {
  SectionWrapper,
  SectionTop,
  SectionLeft,
  SectionTitle,
  SectionDescription,
  SectionButton,
  SectionRight,
  SectionBottom,
} from './styles'

const LandingSection = props => {
  const {
    type,
    children,
    title,
    description,
    isCollapse,
    toggleCollapse,
  } = props
  const img =
    type === 'taskInOne'
      ? TaksInOneImg
      : type === 'tagTree'
      ? TagTreeImg
      : ColaborationImg
  const { innerHeight } = window

  return (
    <SectionWrapper height={innerHeight}>
      <SectionTop>
        <SectionLeft>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
          <SectionButton>
            <span onClick={toggleCollapse}>learn more</span>
          </SectionButton>
        </SectionLeft>
        <SectionRight>
          <img src={img} />
        </SectionRight>
      </SectionTop>
      <SectionBottom>{!isCollapse && children}</SectionBottom>
    </SectionWrapper>
  )
}

LandingSection.propTypes = {
  type: PropTypes.string,
  children: PropTypes.array,
  height: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  isCollapse: PropTypes.bool,
  toggleCollapse: PropTypes.func,
}

export default withStateHandlers(() => ({ isCollapse: true }), {
  toggleCollapse: ({ isCollapse }) => () => ({ isCollapse: !isCollapse }),
})(LandingSection)
