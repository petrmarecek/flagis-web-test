import React from 'react'

// assets
import LandingImg from 'assets/img/landing-page/landing-img.png'
import LandingImg2 from 'assets/img/landing-page/landing-img-2.png'
import LandingImg3 from 'assets/img/landing-page/landing-img-3.png'

// styles
import {
  SectionMainWrapper,
  SectionMainBackground,
  SectionMainLeft,
  SectionMainTitle,
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
        <SectionMainTitle>{title}</SectionMainTitle>
        <SectionMainButtons />
      </SectionMainLeft>
      <SectionMainRight>
        <img
          src={LandingImg3}
          srcSet={`${LandingImg} 462w, ${LandingImg2} 924w, ${LandingImg3} 1386w`}
        />
      </SectionMainRight>
      <SectionMainBackground />
    </SectionMainWrapper>
  )
}

export default LandingSectionMain
