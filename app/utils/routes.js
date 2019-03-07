export const routes = {
  landing: '/',
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
