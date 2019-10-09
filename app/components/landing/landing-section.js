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

// components
import ScrollAnimation from 'react-animate-on-scroll'

// styles
import {
  SectionWrapper,
  SectionTop,
  SectionLeft,
  SectionLeftTop,
  SectionTitle,
  SectionLeftMiddle,
  SectionDescription,
  SectionLeftBottom,
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
    onHandleScroll,
  } = props
  const { innerHeight } = window

  return (
    <SectionWrapper height={innerHeight} onScroll={onHandleScroll}>
      <SectionTop>
        <SectionLeft>
          <SectionLeftTop>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <SectionTitle>{title}</SectionTitle>
            </ScrollAnimation>
          </SectionLeftTop>
          <SectionLeftMiddle>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <SectionDescription>{description}</SectionDescription>
            </ScrollAnimation>
          </SectionLeftMiddle>
          <SectionLeftBottom>
            <SectionButton>
              <ScrollAnimation animateIn="fadeInUp" animateOnce>
                <span onClick={toggleCollapse}>learn more</span>
              </ScrollAnimation>
            </SectionButton>
          </SectionLeftBottom>
        </SectionLeft>
        <SectionRight>
          <ScrollAnimation animateIn="fadeInUp" animateOnce>
            <SectionImg type={type} />
          </ScrollAnimation>
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
  onHandleScroll: PropTypes.func,
}

export default withStateHandlers(() => ({ isCollapse: true }), {
  toggleCollapse: ({ isCollapse }) => () => ({ isCollapse: !isCollapse }),
  onHandleScroll: () => () => console.log('scroll'),
})(LandingSection)
