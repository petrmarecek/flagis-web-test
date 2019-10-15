import React from 'react'

export const TaskInOneDescriptionChalenge = () => (
  <div>
    <p>
      It is common practise to use emails for sending tasks to others. But it is
      hard to manage emails as tasks since they were never designed to present
      tasks.
    </p>
    <p>
      When we use emails as a source of tasks and we use to-do lists as another
      source of tasks, we have a problem. We have at least two sources of tasks
      providing different ways of processing.
    </p>
    <p>Why complicate it? Why not have all in one?</p>
    <p>Putting all these worlds together makes your life much easier!</p>
  </div>
)

export const TaskInOneDescriptionSolution = () => (
  <div>
    <p>
      <span>
        Flagis provides one solution for managing your own tasks, and the tasks
        you sent to and received from others, in the same way as emails and with
        simplicity of to-do lists.
      </span>
    </p>
    <p>
      You can manage tasks and track their responsibility in a very simple and
      efficient way. As the result, you have one transparent list of everything
      important.
    </p>
    <p>
      <span>
        Just send tasks to others via Flagis - not via email {'('}they will
        receive an email anyway{')'} and ask others to send you tasks via Flagis
        - not via email if they want something from you {'('}so that you can
        manage the tasks the way you like{')'}.
      </span>
    </p>
  </div>
)

export const ColaborationDescriptionChalenge = () => (
  <div>
    <p>
      When we send a task via email we usually lose control of that task. The
      task 'disappears' in the SENT email folder and we do not keep control over
      the task and rely on the recipient responding in time.
    </p>
    <p>
      There is a typical assumption that receiving tasks via email means
      accepting them. But in fact, this is not the case!
    </p>
  </div>
)

export const ColaborationDescriptionSolution = () => (
  <div>
    <p>
      Flagis provides a simple undisputable solution for managing tasks you sent
      to and received from others.
    </p>
    <p>
      <span>
        Every single task sent via Flagis must be ACCEPTED or REJECTED as a
        clear statement from the recipient to the sender.
      </span>
    </p>
    <p>
      The sender and also the recipient can see the task in their list of tasks
      for the whole lifecycle. Both can see the acceptance of the task, write
      comments, add attachments into that task and also see the completion of
      the task.   
    </p>
    <p>
      <span>
        Thus, there is clear ownership and responsibility over each stage of the
        lifecycle of the task. The responsibility is clear.
      </span>
    </p>
  </div>
)

export const TagTreeDescriptionChalenge = () => (
  <div>
    <p>
      Usually, you need to keep your tasks in a certain structure to provide a
      logical order for them. Or you need to categorize them somehow. There are
      two different ways for this:
    </p>
    <p>
      a{')'} System of folders {'('}like folders on your hard drive{')'} - you
      can create single hierarchy of folders providing a logical structure where
      you can place one task exactly to just one folder.
    </p>
    <p>
      b{')'} System of TAGs {'('}like you use in your email{')'} - you can
      assign one or more tags to a task and display a list of required tasks by
      selecting assigned tags.
    </p>
  </div>
)

export const TagTreeOneDescriptionSolution = () => (
  <div>
    <p>
      Flagis provides a <span>TAG tree</span> navigation filtering tool which
      combines the advantages of both systems.
    </p>
    <p>
      <span>
        You can put more tags on each task and at the same time you can create a
        tree structure out of those tags.
      </span>
    </p>
    <p>
      This allows an alternative views on your tasks so you will always find
      your tasks where you expect them to be visible even, if they are placed in
      more than one location.
    </p>
    <p>
      <span>
        As a result, you have one transparent list of everything important
        supported by features for easy management.
      </span>
    </p>
  </div>
)

export const taskInOne = {
  title: 'Emails and Tasks in One',
  description:
    'Flagis provides one solution for managing your own tasks, and the tasks you sent to and received from others, in the same way as emails.',
}

export const colaboration = {
  title: 'Transparent cooperation',
  description:
    'Every single task sent via Flagis must be <span>ACCEPTED</span> or <span>REJECTED</span> as a clear statement from the recipient to the sender.',
}

export const tagTree = {
  title: 'Tag tree view',
  description:
    'You can put more tags on each task and at the same time you can create a tree structure out of those tags. So you can place one task into two or more places as they might belong in all of them.',
}
