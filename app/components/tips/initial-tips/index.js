import ProTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'

import icon from 'assets/img/tips/tips-icon.png'
import img1 from 'assets/img/tips/initial/tips-initial-1.png'
import img2 from 'assets/img/tips/initial/tips-initial-2.png'
import img3 from 'assets/img/tips/initial/tips-initial-3.png'
import img4 from 'assets/img/tips/initial/tips-initial-4.png'
import img5 from 'assets/img/tips/initial/tips-initial-5.png'

import {
  Box, Content, Description,
  Footer, FooterButton, FooterIcon, FooterLeft, FooterRight, FooterStatus,
  Image, Inner, Title, Wrapper,
} from './styles'

const InitialTips = ({ onClose }) => {
  const [step, setStep] = useState(1)

  const handleClose = useCallback(() => onClose('initial'), [onClose])

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
      title: 'Tasks - all in one',
    },
    2: {
      description: `
        You can add multiple Tags on a Task in order to specify all the categories
        the Task belongs to. By doing that, you can always find the Task under more Tags.
      `,
      img: img2,
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
      title: 'Favorite filter views',
    },
    4: {
      description: `
        Sending and receiving Tasks is like sending and receiving emails.
        If you send a Task to someone, you cannot modify its content unless you take it back.
        What is more, you can see the status of the send task - if the Task was accepted,
        rejected or the recipient has not responded yet.
        <br />The entire list of all Contacts are managed in "Contacts" list.
      `,
      img: img4,
      title: 'Collaboration with others',
    },
    5: {
      description: `
        Once you complete a Task, it's completed for all who can see the task.
        Once you archive a Task, it's archived in your list only. The other users manages their
        archiving independently.
        <br />The entire list of all archived Tasks are managed in "Contacts" list.
      `,
      img: img5,
      title: 'Completing and Archiving of Tasks',
    },
  }), [])

  return (
    <Wrapper>
      <Box>
        <Image src={data[step].img} />
        <Content>
          <Inner>
            <Title>{data[step].title}</Title>
            {data[step].description.split('<br />').map((item, i) =>
              <Description key={i}>{item}</Description>
            )}
          </Inner>
          <Footer>
            <FooterLeft>
              <FooterIcon src={icon} />
              <FooterStatus>{`Tips ${step}/5`}</FooterStatus>
            </FooterLeft>
            <FooterRight>
              <FooterButton onClick={handleClose}>Skip all</FooterButton>
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
