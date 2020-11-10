import ReactGA from 'react-ga'
import { entities } from 'redux/utils/enums'

// actions
import { AUTH } from 'redux/store/auth/auth.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'

const events = {
  [AUTH.VERIFY_USER]: {
    category: entities.AUTH,
    action: 'verify user',
  },
  [TASKS.CREATE]: {
    category: entities.TASKS,
    action: 'create task',
  },
  [TASKS.SEND]: {
    category: entities.TASKS,
    action: 'send task',
  },
}

const trackEvent = event => ReactGA.event(event)

export { events, trackEvent }
