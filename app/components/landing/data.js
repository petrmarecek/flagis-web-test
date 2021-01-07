import React from 'react'

export const TaskInOneDescriptionChalenge = () => (
  <div>
    <p>
      It is a common practice to use emails for sending tasks to others. But it is hard to manage
      emails as tasks since they have never been designed to present tasks.
    </p>
    <p>
      When you use email clients as a source of tasks and then you use another tool as to-do list
      for keeping them, it might be an issue. You have at least two sources of tasks providing
      different ways of processing.
    </p>
    <p>Why so complicated? Why not have all in one?</p>
    <p>Bringing all these 'worlds' together would make your life much easier!</p>
  </div>
)

export const TaskInOneDescriptionSolution = () => (
  <div>
    <p>
      <span>
        Flagis provides one solution for managing your own tasks and the tasks you send and receive
        from others in the same way as emails and with the simplicity of to-do lists.
      </span>
    </p>
    <p>
      You can manage tasks and track related responsibilities in a very simple and efficient way.
    </p>
    <p>
      <span>
        Just send tasks to others via Flagis - not via email (they receive an email anyway) and
        if you want others to send a task to you, ask them to do it via Flagis - not via email
        (you receive an email as well).
      </span>
    </p>
    <p>
      Then you can manage all the tasks - your own ones, from the others & for the others - in the
      way you like.
    </p>
    <p>
      As a result you only have one transparent list of everything important in one tool!
    </p>
  </div>
)

export const ColaborationDescriptionChalenge = () => (
  <div>
    <p>
      When you send a task via email you can easily lose control of that task. The task 'disappears'
      in the SENT email folder and you do not keep the control over the task and rely on responding
      to the recipient in time.
    </p>
    <p>
      People often assume that receiving tasks via email means accepting them. But in fact, this is
      not true!
    </p>
  </div>
)

export const ColaborationDescriptionSolution = () => (
  <div>
    <p>
      Flagis provides a simple undisputable 'source of true' solution for managing tasks you send
      and receive from others.
    </p>
    <p>
      <span>
        Every single task sent via Flagis has to be ACCEPTED or REJECTED with a clear statement
        from the recipient to a sender.
      </span>
    </p>
    <p>
      The sender and the recipient can see the task in their list of tasks for its entire lifecycle.
      Both can see the acceptance of the task, write comments, add attachments into that task and
      also see the completion of the task.
    </p>
    <p>
      <span>
        Thus, there is clear ownership and responsibility for each stage of the task lifecycle.
        The responsibility is transparent and indisputable.
      </span>
    </p>
  </div>
)

export const TagTreeDescriptionChalenge = () => (
  <div>
    <p>
      Usually, you need to keep your tasks in a certain structure to provide a logical view of them
      or you just need to categorize them somehow. There are typically two different ways to do
      that:
    </p>
    <p>
      a) System of folders (like folders on your hard drive) - you can create a single hierarchy of
      folders providing a logical structure where you can put a task - just to one specific folder.
      But if you need to view the tasks from a different perspective (different hierarchy), it's not
      possible. The hierarchy is fixed.
    </p>
    <p>
      b) System of TAGs (like you use in your email) - you assign one or more tags to a task. Then
      you can view a list of tasks by selecting assigned tags. So you can see all the tasks relevant
      for all the selected tags since one task can belong to more tags.
    </p>
    <p>
      But if you need to view tasks in a hierarchical way, it's not possible as the tags do not
      allow creation of hierarchies.
    </p>
    <p>
      Ideally, you would like to have the benefits of both systems.
    </p>
  </div>
)

export const TagTreeOneDescriptionSolution = () => (
  <div>
    <p>
      Flagis provides a <span>Favorite Filters</span> navigation tool which combines the advantages
      of both systems.
    </p>
    <p>
      <span>
        You can put more tags on each task and at the same time you can create a combination out of
        those tags and save it to tree structure for your favorite view.
      </span>
    </p>
    <p>
      This allows for the making of alternative views on your tasks like a mind map for better
      orientation. So you will always find your tasks where you expect them to be visible.
    </p>
    <p>
      <span>
        As a result, you have one transparent list of everything important supported by features
        for easy and flexible management.
      </span>
    </p>
  </div>
)

export const taskInOne = {
  title: 'Send Task instead of Email\n... if you want to manage it',
  description:
    'Flagis provides one solution for managing your own tasks and the tasks you send and receive from others in the same way as emails.',
}

export const colaboration = {
  title: 'Transparent Cooperation',
  description:
    'Every single task sent via Flagis has to be <span>ACCEPTED</span> or <span>REJECTED</span> with a clear statement from a recipient to a sender.',
}

export const tagTree = {
  title: 'Favorite Filters View',
  description:
    'You can put one or more tags on each task and then filter tasks by those tags or even by combination of a few different tags. \n' +
    'You can also save your favorite combinations of tags to tree structure and view tags and combinations you use most.',
}
