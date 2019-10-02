import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

// assets
import TaksInOneImg3 from 'assets/img/landing-page/task-in-one/task-in-one-3.png'
import TaksInOneImg2 from 'assets/img/landing-page/task-in-one/task-in-one-2.png'
import TaksInOneImg from 'assets/img/landing-page/task-in-one/task-in-one.png'
import ColaborationImg3 from 'assets/img/landing-page/colaboration/colaboration-3.png'
import ColaborationImg2 from 'assets/img/landing-page/colaboration/colaboration-2.png'
import ColaborationImg from 'assets/img/landing-page/colaboration/colaboration.png'
import TagTreeImg3 from 'assets/img/landing-page/tag-tree/tag-tree-3.png'
import TagTreeImg2 from 'assets/img/landing-page/tag-tree/tag-tree-2.png'
import TagTreeImg from 'assets/img/landing-page/tag-tree/tag-tree.png'

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

const SectionImg = ({ type }) => {
  switch (type) {
    case 'taskInOne':
      return (
        <img
          src={TaksInOneImg}
          srcSet={`${TaksInOneImg} 226w, ${TaksInOneImg2} 452w, ${TaksInOneImg3} 678w`}
        />
      )

    case 'colaboration':
      return (
        <img
          src={ColaborationImg}
          srcSet={`${ColaborationImg} 226w, ${ColaborationImg2} 452w, ${ColaborationImg3} 678w`}
        />
      )

    case 'tagTree':
      return (
        <img
          src={TagTreeImg}
          srcSet={`${TagTreeImg} 197w, ${TagTreeImg2} 394w, ${TagTreeImg3} 591w`}
        />
      )
    default:
      return null
  }
}

SectionImg.propTypes = {
  type: PropTypes.string,
}

const LandingSection = props => {
  const {
    type,
    children,
    title,
    description,
    isCollapse,
    toggleCollapse,
  } = props
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
          <SectionImg type={type} />
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
