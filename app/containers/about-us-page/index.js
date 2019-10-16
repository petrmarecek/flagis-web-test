import React from 'react'
import PropTypes from 'prop-types'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'

// styles
import styled from 'styled-components'
import { colors } from 'components/styled-components-mixins/colors'

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 80px;
`

const Line = styled.div`
  height: 2px;
  width: 50px;
  margin-bottom: 30px;
  border: 2px solid ${colors.darkJungleGreen};
`

const Content = styled.div`
  p {
    font-weight: 300;
    font-size: 20px;
    max-width: 768px;
    margin-bottom: 30px;
    text-align: justify;

    :first-child {
      font-weight: 500;
    }
  }
`

const ContactUsPage = ({ location }) => (
  <div>
    <NavigationLandingPrimary location={location} />
    <InnerWrapper>
      <Title>About Us</Title>
      <Content>
        <p>It's your personal assistant for the things that matter to you!</p>
        <Line />
        <p>
          Flagis is a simple universal solution for managing all the things that
          matter to you with the help of "getting things done" principles.
        </p>
        <p>
          Flagis provides one solution for managing your own tasks, and the
          tasks you sent to and received from the others, in the same way as
          emails.
        </p>
        <p>
          It allows you to manage a single source of task items that matter to
          you regardless of whether you created them manually or received from
          others. You can manage them and track responsibility in a very simple
          and efficient way.
        </p>
        <p>
          Instead of non-smart sending or just assigning a task to others, there
          is an action required from the recipient, so you know if the task was
          accepted or rejected and when that happened.
        </p>
        <p>
          This provides you with transparency in cooperation, undisputable
          responsibility and clear tracking in a single tool.
        </p>
        <p>
          Flagis also allows you to put tags on your tasks. At the same time,
          you can create a "folder tree structure" out of those tags for
          filtering tasks, so you will always find the tasks you need.
        </p>
        <p>
          As a result, you have one transparent list of everything important
          supported by features for easy management.
        </p>
      </Content>
    </InnerWrapper>
  </div>
)

ContactUsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ContactUsPage
