import React from 'react'

// styles
import {
  AboutWrapper,
  AboutInner,
  AboutLine,
  AboutTitle,
  AboutContent,
} from './styles'

const AboutContainer = () => (
  <AboutWrapper height={window.innerHeight}>
    <AboutInner>
      <AboutTitle>About</AboutTitle>
      <AboutContent>
        <h4>It's your personal assistant for the things that matter to you!</h4>
        <AboutLine />
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
      </AboutContent>
    </AboutInner>
  </AboutWrapper>
)

export default AboutContainer
