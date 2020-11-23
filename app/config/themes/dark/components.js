import _ from 'lodash'

import colors from '../common/colors'
import components from '../common/components'

export default _.merge({}, components, {
  // center page
  centerPageTitle: colors.white,

  navigationSecondaryWrapper: colors.aztec,
  navigationSecondaryButtonActive: colors.darkJungleGreen,
  navigationSecondaryShadow: 'transparent',
  navigationSecondaryButtonColor: colors.waiting,

  taskItem: {
    subjectTextColor: colors.waiting,
    subjectCompletedTextColor: colors.coverOfNight,
    wrapperBgColor: colors.aztec,
    wrapperAcceptedBgColor: colors.washedBlack,
    wrapperArchivedBgColor: colors.darkJungleGreen,
    wrapperCompletedBgColor: colors.lacquerGreen,
    wrapperSelectedBgColor: colors.darkJungleGreen,
  },

  // Tasks
  tasks: {
    scrollBoxShadow: 'rgba(20, 20, 20, 1)',
    wrapperBgColor: colors.darkJungleGreen,
  },

  // Add task form
  addTaskForm: {
    boxShadowColor: colors.mineShaft,
    textColor: colors.americanSilver,
    wrapperBgColor: colors.mineShaft,
  }
})
