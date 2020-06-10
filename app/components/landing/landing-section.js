import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

// assets
import TaksInOneGif from 'assets/img/landing-page/animations/task-in-one-gif.gif'
import ColaborationGif from 'assets/img/landing-page/animations/colaboration-gif.gif'
import TagTreeGif from 'assets/img/landing-page/animations/tag-tree-gif.gif'

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
  SectionImg,
  SectionBottom,
} from './styles'

const SectionImgWrapper = ({ type }) => {
  switch (type) {
    case 'taskInOne':
      return <SectionImg src={TaksInOneGif} />

    case 'colaboration':
      return <SectionImg src={ColaborationGif} />

    case 'tagTree':
      return <SectionImg src={TagTreeGif} />
    default:
      return null
  }
}

SectionImgWrapper.propTypes = {
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
  const { innerHeight, innerWidth } = window

  return (
    <SectionWrapper height={innerHeight}>
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
            <SectionImgWrapper type={type} />
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
}

export default withStateHandlers(() => ({ isCollapse: true }), {
  toggleCollapse: ({ isCollapse }) => () => ({ isCollapse: !isCollapse }),
})(LandingSection)
