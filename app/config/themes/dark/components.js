import _ from 'lodash'

import colors from '../common/colors'
import components from '../common/components'

export default _.merge({}, components, {
  // center page
  centerPageTitle: colors.white,

  primaryText: colors.astrocopusGrey,

  navigationSecondaryWrapper: colors.aztec,
  navigationSecondaryButtonActive: colors.darkJungleGreen,
  navigationSecondaryShadow: 'transparent',
  navigationSecondaryButtonColor: colors.waiting,
  navigationSettingsButtonColor: colors.lostAtSea,
  navigationSettingsButtonActiveColor: colors.white,
  navigationSettingsButtonBorder: colors.aztec,
  navigationSettingsButtonActiveBorder: colors.hanumanGreen,

  taskItem: {
    subjectTextColor: colors.waiting,
    subjectCompletedTextColor: colors.coverOfNight,
    wrapperBgColor: colors.aztec,
    wrapperAcceptedBgColor: colors.washedBlack,
    wrapperArchivedBgColor: colors.aztec,
    wrapperCompletedBgColor: colors.lacquerGreen,
    wrapperSelectedBgColor: colors.darkJungleGreen,
  },

  // Tasks
  tasks: {
    scrollBoxShadow: 'rgba(20, 20, 20, 1)',
    wrapperBgColor: colors.darkJungleGreen,
  },

  otherPages: {
    wrapperBgColor: colors.darkJungleGreen,
  },

  // Add task form
  addTaskForm: {
    boxShadowColor: colors.mineShaft,
    textColor: colors.americanSilver,
    wrapperBgColor: colors.mineShaft,
  },

  detailInnerBg: colors.darkJungleGreen,

  taskDetail: {
    subjectTextColor: colors.astrocopusGrey,
    subjectCompletedTextColor: colors.snowShadow,
    wrapperBgColor: colors.darkJungleGreen,
    wrapperAcceptedBgColor: colors.aztec,
    wrapperArchivedBgColor: colors.aztec,
  },

  addTagForm: {
    subjectBgColor: colors.mineShaft,
    textColor: colors.americanSilver,
    wrapperBgColor: colors.mineShaft,
    wrapperShadowColor: colors.mineShaft,
  },

  tagItem: {
    subjectTextColor: colors.waiting,
    wrapperBgColor: colors.aztec,
  },

  addContactForm: {
    subjectBgColor: colors.mineShaft,
    textColor: colors.americanSilver,
    wrapperBgColor: colors.mineShaft,
    wrapperShadowColor: colors.mineShaft,
  },

  contactItem: {
    subjectTextColor: colors.waiting,
    wrapperBgColor: colors.aztec,
  },

  // image-picker
  imagePickerButtonHover: colors.white,

  form: {
    errorText: colors.pompelmo,
    text: colors.astrocopusGrey,
  },

  colorTheme: {
    title: colors.astrocopusGrey,
    itemText: colors.astrocopusGrey,
  },

  markdownEditor: {
    wrapperBgColor: colors.darkJungleGreen,
    wrapperTextColor: colors.astrocopusGrey,
  },
})
