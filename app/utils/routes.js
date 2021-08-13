const routes = {
  default: '/',
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
  verificationEmail: '/verification/email',

  user: {
    tasks: '/user/tasks',
    tags: '/user/tags',
    archive: '/user/archive',
    contacts: '/user/contacts',
    dashboard: '/user/charts',
    notifications: '/user/notifications',

    account: {
      settings: {
        editProfile: '/user/account/settings/edit-profile',
        changePassword: '/user/account/settings/change-password',
        notifications: '/user/account/settings/notifications',
        colorTheme: '/user/account/settings/color-theme',
        contactUs: '/user/account/settings/contact-us',
      },
    },
  },
}

export { routes }
