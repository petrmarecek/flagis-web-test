import React from 'react'

// assets
import LandingImg from 'assets/img/landing-page/landing-img.png'
import LandingImg2 from 'assets/img/landing-page/landing-img-2.png'
import LandingImg3 from 'assets/img/landing-page/landing-img-3.png'

// components
import ScrollAnimation from 'react-animate-on-scroll'

// styles
import {
  SectionMainWrapper,
  SectionMainBackground,
  SectionMainLeft,
  SectionMainLeftTop,
  SectionMainTitle,
  SectionMainLeftBottom,
  SectionMainButtons,
  SectionMainRight,
} from './styles'

const LandingSectionMain = () => {
  const { innerHeight } = window
  const title = (
    <p>
      Manage all
      <br /> the things that
      <br /> <span>matter to you</span>
    </p>
  )

  return (
    <SectionMainWrapper height={innerHeight}>
      <SectionMainLeft>
        <SectionMainLeftTop>
          <ScrollAnimation animateIn="fadeInUp" animateOnce>
            <SectionMainTitle>{title}</SectionMainTitle>
          </ScrollAnimation>
        </SectionMainLeftTop>
        <SectionMainLeftBottom>
          <ScrollAnimation duration={1} animateIn="fadeInUp" animateOnce>
            <SectionMainButtons />
          </ScrollAnimation>
        </SectionMainLeftBottom>
      </SectionMainLeft>
      <SectionMainRight>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <img
            src={LandingImg}
            srcSet={`${LandingImg} 462w, ${LandingImg2} 924w, ${LandingImg3} 1386w`}
          />
        </ScrollAnimation>
      </SectionMainRight>
      <SectionMainBackground />
    </SectionMainWrapper>
  )
}

export default LandingSectionMain
