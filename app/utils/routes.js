export const routes = {
  landing: '/',
  legal: {
    default: '/legal',
    termsConditions: '/legal/terms-conditions',
    privacyPolicy: '/legal/privacy-policy',
    cookiesPolicy: '/legal/cookies-policy',
    eula: '/legal/eula',
    disclaimer: '/legal/disclaimer',
  },
  about: '/about',
  contactUs: '/contact-us',
  signIn: '/sign-in',
  signUp: '/sign-up',
  emailResetPassword: '/email-reset-password',
  resetPassword: '/reset-password',

  user: {
    tasks: '/user/tasks',
    tags: '/user/tags',
    inbox: '/user/inbox',
    archive: '/user/archive',
    contacts: '/user/contacts',
    dashboard: '/user/dashboard',
    notifications: '/user/notifications',

    account: {
      settings: {
        editProfile: '/user/account/settings/edit-profile',
        changePassword: '/user/account/settings/change-password',
        colorTheme: '/user/account/settings/color-theme',
      },
    },
  },
}
