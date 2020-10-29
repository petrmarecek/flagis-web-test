import ProTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'

import icon from 'assets/img/tips/tips-icon.png'
import img1 from 'assets/img/tips/initial/tips-initial-1.jpg'
import img1x2 from 'assets/img/tips/initial/tips-initial-1@2x.jpg'
import img1x3 from 'assets/img/tips/initial/tips-initial-1@3x.jpg'
import img2 from 'assets/img/tips/initial/tips-initial-2.jpg'
import img2x2 from 'assets/img/tips/initial/tips-initial-2@2x.jpg'
import img2x3 from 'assets/img/tips/initial/tips-initial-2@3x.jpg'
import img3 from 'assets/img/tips/initial/tips-initial-3.jpg'
import img3x2 from 'assets/img/tips/initial/tips-initial-3@2x.jpg'
import img3x3 from 'assets/img/tips/initial/tips-initial-3@3x.jpg'
import img4 from 'assets/img/tips/initial/tips-initial-4.jpg'
import img4x2 from 'assets/img/tips/initial/tips-initial-4@2x.jpg'
import img4x3 from 'assets/img/tips/initial/tips-initial-4@3x.jpg'
import img5 from 'assets/img/tips/initial/tips-initial-5.jpg'
import img5x2 from 'assets/img/tips/initial/tips-initial-5@2x.jpg'
import img5x3 from 'assets/img/tips/initial/tips-initial-5@3x.jpg'

import {
  Box, Content, Description,
  Footer, FooterButton, FooterIcon, FooterLeft, FooterRight, FooterStatus,
  Image, Inner, Title, Wrapper,
} from './styles'

const InitialTips = ({ onClose }) => {
  const [step, setStep] = useState(1)

  const handleBackStep = useCallback(event => {
    event.preventDefault()
    if (step < 2) {
      return
    }

    setStep(step - 1)
  }, [setStep, step])

  const handleClose = useCallback(event => {
    event.preventDefault()
    onClose('initial')
  }, [onClose])

  const handleNextStep = useCallback(
    event => {
      event.preventDefault()
      if (step >= 5) {
        return
      }

      setStep(step + 1)
    },
    [setStep, step],
  )

  const data = useMemo(() => ({
    1: {
      description: `
        In "My Tasks" list, you can create Tasks for you and also for anyone else.
        You can receive Tasks from the others here as well.
        All the Tasks are managed here at one place regardless of who created them.
      `,
      img: img1,
      img2x: img1x2,
      img3x: img1x3,
      title: 'Tasks - all in one',
    },
    2: {
      description: `
        You can add multiple Tags on a Task in order to specify all the categories
        the Task belongs to. By doing that, you can always find the Task under more Tags.
      `,
      img: img2,
      img2x: img2x2,
      img3x: img2x3,
      title: 'Categorization by Tags',
    },
    3: {
      description: `
        On the left-hand side under „My Filters” you can create and manage filtered views on your
        Tasks. What is more, you can even compose the hierarchies of the Tags which can represent
        mind structures of categories and sub-categories of your favorite filtered views
        you use most frequently.
        <br />The entire list of all created Tags are managed in "Tags" list.
      `,
      img: img3,
      img2x: img3x2,
      img3x: img3x3,
      title: 'Favorite filter views',
    },
    4: {
      description: `
        Sending and receiving Tasks is like sending and receiving emails.
        If you send a Task to someone, you cannot modify its content unless you take it back.
        What is more, you can see the status of the sent task - if the Task was accepted,
        rejected or the recipient has not responded yet.
        <br />The entire list of all Contacts are managed in "Contacts" list.
      `,
      img: img4,
      img2x: img4x2,
      img3x: img4x3,
      title: 'Collaboration with the others',
    },
    5: {
      description: `
        Once you complete a Task, it's completed for all who can see the task.
        Once you archive a Task, it's archived in your list only. The other users manages their
        archiving independently.
        <br />The entire list of all archived Tasks are managed in "Archive".
      `,
      img: img5,
      img2x: img5x2,
      img3x: img5x3,
      title: 'Completing and Archiving of Tasks',
    },
  }), [])

  return (
    <Wrapper>
      <Box>
        <Image
          src={data[step].img}
          srcSet={`${data[step].img} 768w, ${data[step].img2x} 1024w, ${data[step].img3x} 1280w`}
        />
        <Content>
          <Inner>
            <Title>{data[step].title}</Title>
            {data[step].description.split('<br />').map((item, i) =>
              <Description key={i}>{item}</Description>,
            )}
          </Inner>
          <Footer>
            <FooterLeft>
              <FooterIcon src={icon} />
              <FooterStatus>{`Tips ${step}/5`}</FooterStatus>
            </FooterLeft>
            <FooterRight>
              <FooterButton onClick={handleClose}>Skip all</FooterButton>
              {step > 1 && <FooterButton onClick={handleBackStep}>Back</FooterButton>}
              <FooterButton
                bold
                onClick={step === 5 ? handleClose : handleNextStep}
              >
                {`${step === 5 ? 'Finish' : 'Next'}`}
              </FooterButton>
            </FooterRight>
          </Footer>
        </Content>
      </Box>
    </Wrapper>
  )
}

InitialTips.propTypes = {
  onClose: ProTypes.func.isRequired,
}

export default InitialTips
