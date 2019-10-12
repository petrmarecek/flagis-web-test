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

// assets
import CheckImg from 'assets/img/landing-page/check-img.png'
import CheckImg2 from 'assets/img/landing-page/check-img-2.png'
import CheckImg3 from 'assets/img/landing-page/check-img-3.png'

// components
import ScrollAnimation from 'react-animate-on-scroll'

// styles
import {
  SectionWrapper,
  SectionTop,
  SectionLeft,
  SectionLeftTop,
  SectionIcon,
  SectionTitle,
  SectionLeftMiddle,
  SectionDescription,
  SectionLeftBottom,
  SectionButtonParent,
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
  const { innerHeight, innerWidth } = window

  return (
    <SectionWrapper height={innerHeight} onScroll={onHandleScroll}>
      <SectionTop>
        <SectionLeft>
          <SectionLeftTop>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              {innerWidth > 768 && (
                <SectionIcon>
                  <img
                    src={CheckImg}
                    srcSet={`${CheckImg} 768w, ${CheckImg2} 1024w, ${CheckImg3} 1280w`}
                  />
                </SectionIcon>
              )}
              <SectionTitle>{title}</SectionTitle>
            </ScrollAnimation>
          </SectionLeftTop>
          <SectionLeftMiddle>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <SectionDescription
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </ScrollAnimation>
          </SectionLeftMiddle>
          <SectionLeftBottom>
            <SectionButtonParent>
              <SectionButton>
                <ScrollAnimation animateIn="fadeInUp" animateOnce>
                  <span onClick={toggleCollapse}>learn more</span>
                </ScrollAnimation>
              </SectionButton>
            </SectionButtonParent>
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
